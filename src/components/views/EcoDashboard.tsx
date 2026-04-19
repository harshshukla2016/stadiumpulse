"use client";

import { useEventEngine } from "@/context/EventContext";

export default function EcoDashboard() {
  const { state } = useEventEngine();
  const transitStatus = state.aisleStatus === "LOCKED" ? "Controlled" : "Low";
  const ecoPoints = state.eventType === "CONCERT" ? 92 : state.eventType === "COMEDY" ? 68 : 80;

  return (
    <div className="flex-1 space-y-6 overflow-y-auto">
      <div className="flex flex-col">
        <span className="text-secondary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
          Sustainability Hub
        </span>
        <h2 className="text-3xl font-black tracking-tighter leading-none text-on-surface sm:text-4xl">Eco-Dash</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
      {/* Gamification Ring */}
      <div className="glass-card relative flex flex-col items-center overflow-hidden rounded-lg border border-secondary/20 p-6 shadow-[0_0_30px_rgba(74,225,118,0.1)]">
        <div className="relative mb-4 flex h-32 w-32 items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-container-highest" />
            <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="351.85" strokeDashoffset="70" className="text-secondary" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-secondary">{ecoPoints}<span className="text-sm">pts</span></span>
            <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface-variant">Level 3 Fan</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center">
            <span className="text-xl font-bold">14.2<span className="text-[10px]">kg</span></span>
            <p className="text-[8px] uppercase tracking-widest text-on-surface/50 font-bold mt-1">CO₂ Prevented</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">2<span className="text-[10px]"></span></span>
            <p className="text-[8px] uppercase tracking-widest text-on-surface/50 font-bold mt-1">Digital Tix Active</p>
          </div>
        </div>
      </div>

      {/* Smart Egress & Carpooling translated from ExitStrategy */}
      <div className="flex flex-col space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant mt-2 border-b border-white/5 pb-2">Smart Transit Flow</h3>
        
        <div className="glass-card group relative overflow-hidden rounded-lg p-6">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <span className="text-[8px] font-black text-secondary uppercase tracking-[0.3em] block mb-1">Fleet Tracker</span>
              <h3 className="text-xl font-bold">Zero-Emission Queue: <span className="text-secondary">{transitStatus}</span></h3>
            </div>
            <span className="material-symbols-outlined text-secondary/30 text-3xl">electric_car</span>
          </div>
          
          <button className="w-full rounded-lg bg-secondary py-4 text-xs font-black uppercase tracking-widest text-background shadow-lg shadow-secondary/20 transition-all active:scale-95">
            Book EV Rideshare
          </button>
        </div>

        <div className="glass-card relative flex h-40 flex-col justify-center overflow-hidden rounded-lg border border-white/5 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>nature_people</span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-secondary">Carpool Community</span>
            </div>
            <h4 className="text-lg font-black leading-tight mb-2">Match & Save</h4>
            <p className="text-[10px] text-on-surface/50 max-w-[180px] leading-tight">Match with 1,240 fans to exit faster and earn 50 Eco-Points.</p>
          </div>
          <button className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10 text-secondary">
             <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>
      </div>
      </div>

    </div>
  );
}
