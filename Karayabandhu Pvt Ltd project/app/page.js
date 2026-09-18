"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Brands from "./components/Brands";
import Academy from "./components/Academy";
import Careers from "./components/Careers";
import Footer from "./components/Footer";

export default function Home() {
  // Theme state: light or dark
  const [theme, setTheme] = useState("dark");

  // Load theme preference on mount and match system prefers-color-scheme
  useEffect(() => {
    const savedTheme = localStorage.getItem("kb-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  // Sync theme with document.documentElement for global styling
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("kb-theme", nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white relative transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}>

      {/* Modular Navigation Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Spacer to push content below fixed header */}
      <div className="h-20" />

      {/* Dynamic Hero & Node Telemetry */}
      <Hero isDark={isDark} />

      {/* Company Vision & Values */}
      <About isDark={isDark} />

      {/* Incubated Startup Grid */}
      <Brands isDark={isDark} />

      {/* Cinematic Training Dashboard (LMS) */}
      <Academy isDark={isDark} />

      {/* Strategic Talent Board */}
      <Careers isDark={isDark} />

      {/* Premium Bottom Footer */}
      <Footer />

    </div>
  );
}
