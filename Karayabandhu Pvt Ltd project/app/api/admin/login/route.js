import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateSessionToken } from "@/app/lib/auth";

// Basic in-memory rate limiter to prevent brute-force attacks
const rateLimitMap = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown-ip";
    
    // Check rate limit for this IP
    const attemptInfo = rateLimitMap.get(ip);
    if (attemptInfo) {
      if (attemptInfo.count >= MAX_FAILED_ATTEMPTS) {
        const timeElapsed = Date.now() - attemptInfo.lastAttempt;
        if (timeElapsed < LOCKOUT_TIME_MS) {
          const remainingMinutes = Math.ceil((LOCKOUT_TIME_MS - timeElapsed) / 60000);
          return NextResponse.json(
            { error: `Too many failed attempts. Try again in ${remainingMinutes} minutes.` },
            { status: 429 }
          );
        } else {
          // Lockout expired, reset
          rateLimitMap.delete(ip);
        }
      }
    }

    const { username, password } = await req.json();
    
    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }
    
    const expectedUser = process.env.ADMIN_USERNAME ? process.env.ADMIN_USERNAME.trim().toLowerCase() : null;
    const expectedPass = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : null;
    
    if (!expectedUser || !expectedPass) {
      console.error("Admin credentials not configured in environment variables.");
      return NextResponse.json({ error: "Internal server error: Misconfiguration" }, { status: 500 });
    }
    
    if (username.trim().toLowerCase() === expectedUser && password.trim() === expectedPass) {
      // Successful login - clear failed attempts
      rateLimitMap.delete(ip);
      
      const token = generateSessionToken(expectedUser, expectedPass);
      const cookieStore = await cookies();
      
      // Set the session cookie securely
      cookieStore.set("kb_admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      return NextResponse.json({ success: true });
    } else {
      // Record failed attempt
      const currentAttempts = rateLimitMap.get(ip)?.count || 0;
      rateLimitMap.set(ip, {
        count: currentAttempts + 1,
        lastAttempt: Date.now()
      });
      
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
