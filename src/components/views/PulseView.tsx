"use client";

import { useEventEngine } from "@/context/EventContext";
import { useId, useState } from "react";

export default function PulseView() {
  const { state } = useEventEngine();
  const [arMode, setArMode] = useState(false);
  const heatGradientId = useId();

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col">
        <div className="flex justify-between items-end mb-1">
          <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em]">
            Crowd Density Live
          </span>
          <button 
            onClick={() => setArMode(!arMode)}
            className={`flex items-center gap-1 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all ${arMode ? 'bg-secondary text-background border-secondary shadow-[0_0_15px_rgba(74,225,118,0.4)]' : 'bg-surface-container-high text-on-surface/50 border-white/5 hover:border-white/20'}`}
          >
            <span className="material-symbols-outlined text-[14px]">{arMode ? 'view_in_ar' : 'map'}</span>
            {arMode ? 'AR Active' : 'WebXR'}
          </button>
        </div>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{state.eventType} Arena Map</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-surface-container-low shadow-2xl transition-all duration-700 lg:min-h-[560px]">
        
        {/* AR Mode Overlay */}
        <div className={`absolute inset-0 z-20 transition-opacity duration-500 ${arMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Simulated Camera View (Blurred background to simulate passthrough) */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
          
          {/* AR Wayfinding HUD */}
          <div className="absolute inset-0 flex flex-col items-center justify-center perspective-[1000px]">
            {/* Floating Chevron */}
            <div className="animate-bounce mb-8 filter drop-shadow-[0_0_10px_var(--secondary)]">
               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M6 9l6-6 6 6"/>
                 <path d="M6 16l6-6 6 6" opacity="0.5"/>
               </svg>
            </div>
            {/* Spatial Target Box */}
            <div className="rounded-lg border border-secondary/50 bg-secondary/10 px-4 py-3 shadow-[0_0_20px_rgba(74,225,118,0.2)] backdrop-blur-sm [transform:rotateX(10deg)]">
               <div className="flex items-center gap-2 mb-1">
                 <span className="material-symbols-outlined text-secondary text-sm">local_dining</span>
                 <span className="text-[10px] font-black text-secondary tracking-widest uppercase">Target Focus</span>
               </div>
               <p className="text-xl font-bold text-on-surface">Vendor 4 <span className="text-secondary">30m</span></p>
               <p className="text-[8px] text-on-surface/60 font-bold uppercase tracking-widest mt-1 text-center">Follow Chevrons</p>
            </div>
          </div>

          {/* AR Border/Frame */}
          <div className="pointer-events-none absolute inset-4 rounded-lg border-2 border-dashed border-white/10" />
          <div className="absolute top-8 right-8 text-[8px] font-black tracking-[0.3em] uppercase text-secondary">Spatial Tracking On</div>
        </div>

        {/* Regular SVG Map */}
        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${arMode ? 'scale-75 opacity-10 blur-sm' : 'scale-100 opacity-100'}`}>
          <svg className="h-[80%] w-[80%] opacity-80 stadium-svg" viewBox="0 0 100 100" role="img" aria-label="Live arena density map">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-primary/30" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
            
            {/* Heatmap blobs */}
            <circle cx="25" cy="40" r="15" fill={`url(#${heatGradientId})`} className="opacity-60" />
            <circle cx="75" cy="55" r="10" fill={`url(#${heatGradientId})`} className="opacity-40" />
            
            <defs>
              <radialGradient id={heatGradientId}>
                <stop offset="0%" stopColor="var(--secondary)" />
                <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* User Location */}
            <circle cx="50" cy="50" r="3" className="fill-primary animate-pulse" />
            <circle cx="50" cy="50" r="1" className="fill-background" />
          </svg>
        </div>

        <div className={`absolute top-6 left-6 p-3 glass-card rounded-lg z-30 transition-all ${arMode ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'}`}>
          <p className="text-[8px] uppercase tracking-widest text-on-surface/50 font-bold mb-1">Zone Density</p>
          <p className="text-lg font-black">{state.density}%</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div className="glass-card rounded-lg p-5">
          <span className="text-[8px] uppercase font-bold text-on-surface/40">Noise</span>
          <p className="text-3xl font-black">{state.noiseLevel} dB</p>
        </div>
        <div className="glass-card rounded-lg p-5">
          <span className="text-[8px] uppercase font-bold text-on-surface/40">Temp</span>
          <p className="text-3xl font-black">74°F</p>
        </div>
        <div className="glass-card rounded-lg p-5 sm:col-span-2 lg:col-span-1">
          <span className="text-[8px] uppercase font-bold text-on-surface/40">Scoreboard</span>
          <p className="text-3xl font-black">{state.scoreInfo}</p>
          <p className="mt-2 text-xs text-on-surface/50">Aisle controls update automatically from the event clock.</p>
        </div>
      </div>
      </div>
    </div>
  );
}
