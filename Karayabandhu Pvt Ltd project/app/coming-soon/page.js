"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Launch Date: June 19, 2026 at 12:35 PM (UTC+5:30)
const LAUNCH_DATE = new Date("2026-06-19T12:35:00+05:30").getTime();

export default function ComingSoon() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    // Calculate time left immediately on mount
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = LAUNCH_DATE - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        // Auto-redirect to home once the launch time is reached
        window.location.href = "/";
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden font-sans px-4 sm:px-6">
      
      {/* Aesthetic glowing background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/15 blur-[120px] -z-10" />

      {/* Main Content Card */}
      <div className="max-w-2xl w-full text-center relative z-10 space-y-8 animate-fade-in">
        
        {/* Logo and Branding Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative group">
            <img
              src="/logo-removebg-preview.png"
              alt="Karaya Bandhu Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter brightness-0 invert transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-tight text-white uppercase sm:text-3xl">
              Karaya Bandhu
            </span>
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">
              Pvt. Ltd. · Onboarding Platform
            </span>
          </div>
        </div>

        {/* Informational Message */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800">
            System Launch Countdown
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight pt-2">
            Our Digital Ecosystem is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              Launching Soon.
            </span>
          </h1>
          <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            We are preparing the gateway to India's gig economy ecosystem. Our portfolio brands and partner platforms will go live automatically at the countdown.
          </p>
        </div>

        {/* Countdown Timer Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto pt-4">
          
          {/* Days Card */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center backdrop-blur-xl shadow-xl">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {timeLeft.days.toString().padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
              Days
            </span>
          </div>

          {/* Hours Card */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center backdrop-blur-xl shadow-xl">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
              Hours
            </span>
          </div>

          {/* Minutes Card */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center backdrop-blur-xl shadow-xl">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
              Minutes
            </span>
          </div>

          {/* Seconds Card */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center backdrop-blur-xl shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-500 font-mono tracking-tight">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-blue-400 mt-1">
              Seconds
            </span>
          </div>

        </div>

        {/* Footer/System Status */}
        <div className="pt-6 flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 bg-slate-900/40 px-3.5 py-1.5 rounded-lg border border-slate-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Online: Waiting for Launch Schedule</span>
          </div>
          <span className="text-[10px] font-mono text-slate-650">
            Launch Date Timezone: UTC+5:30 (India Standard Time)
          </span>
        </div>

      </div>

    </div>
  );
}
