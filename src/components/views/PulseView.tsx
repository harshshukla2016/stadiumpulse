"use client";

import { useEventEngine } from "@/context/EventContext";
import { useId, useState, useEffect } from "react";

export default function PulseView() {
  const { state } = useEventEngine();
  const [arMode, setArMode] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({});
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [arDirection, setArDirection] = useState(0);
  const heatGradientId = useId();
  const { location, weather } = state.venueIntel;
  const [selectedZone, setSelectedZone] = useState<typeof zones[0] | null>(null);

  useEffect(() => {
    if (arMode) {
      const interval = setInterval(() => {
        setArDirection(prev => (prev + 5) % 360);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [arMode]);

  const toggleNotify = (id: string) => {
    setNotifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const zones = [
    { id: 1, name: "North Stand", cx: 25, cy: 40, r: 12, density: 85 },
    { id: 2, name: "South Bowl", cx: 75, cy: 55, r: 10, density: 62 },
    { id: 3, name: "East Concourse", cx: 60, cy: 25, r: 8, density: 45 },
    { id: 4, name: "West VIP", cx: 35, cy: 70, r: 6, density: 28 },
  ];

  const getDensityColor = (d: number) => {
    if (d > 70) return "var(--error)";
    if (d > 45) return "var(--tertiary)";
    return "var(--secondary)";
  };

  return (
    <div className="flex-1 space-y-6 overflow-y-auto pb-32">
      <div className="flex flex-col">
        <div className="flex justify-between items-end mb-1">
          <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em]">
            Crowd Density Live
          </span>
          <button 
            onClick={() => setArMode(!arMode)}
            className={`flex items-center gap-1 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${arMode ? 'bg-secondary text-background border-secondary shadow-[0_0_15px_rgba(74,225,118,0.4)]' : 'bg-surface-container-high text-on-surface/50 border-white/5 hover:border-white/20'}`}
          >
            <span className="material-symbols-outlined text-[14px]">{arMode ? 'view_in_ar' : 'map'}</span>
            {arMode ? 'AR Active' : 'WebXR'}
          </button>
        </div>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{state.eventType} Arena Map</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-surface-container-low shadow-2xl transition-all duration-700 lg:min-h-[560px]">
          
          <div className={`absolute inset-0 z-20 transition-opacity duration-500 ${arMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative mb-8">
                <div className="animate-bounce filter drop-shadow-[0_0_15px_var(--secondary)]">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6-6 6 6"/>
                    <path d="M6 16l6-6 6 6" opacity="0.5"/>
                    <path d="M6 23l6-6 6 6" opacity="0.25"/>
                  </svg>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary animate-ping" />
              </div>
              
              <div className="rounded-xl border border-secondary/50 bg-secondary/10 px-6 py-4 shadow-[0_0_30px_rgba(74,225,118,0.3)] backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_dining</span>
                  <span className="text-[10px] font-black text-secondary tracking-widest uppercase">Vendor 4</span>
                </div>
                <p className="text-2xl font-black text-on-surface">30m <span className="text-secondary text-sm font-bold">away</span></p>
                <p className="text-[9px] text-on-surface/60 font-bold uppercase tracking-widest mt-1 text-center">Follow AR Chevrons</p>
              </div>

              <div className="absolute top-8 left-8 right-8">
                <div className="flex justify-between items-center">
                  {['A', 'B', 'C', 'D'].map((letter, i) => (
                    <div key={letter} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black border ${activeZone === i + 1 ? 'bg-secondary text-background border-secondary' : 'bg-surface-container-high text-on-surface/50 border-white/10'}`}>
                        {letter}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <svg 
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-32"
                style={{ transform: `rotate(${arDirection}deg)`, transition: 'transform 0.1s linear' }}
              >
                <circle cx="64" cy="64" r="60" fill="none" stroke="var(--secondary)" strokeWidth="2" strokeDasharray="10 5" opacity="0.3" />
                <path d="M64 10 L64 30" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="pointer-events-none absolute inset-4 rounded-xl border-2 border-dashed border-secondary/20" />
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[8px] font-black tracking-[0.3em] uppercase text-secondary">Spatial Tracking On</span>
            </div>
          </div>

          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${arMode ? 'scale-50 opacity-20 blur-sm' : 'scale-100 opacity-100'}`}>
            <svg className="h-[90%] w-[90%] stadium-svg" viewBox="0 0 100 100" role="img" aria-label="Live arena density map">
              <defs>
                <radialGradient id={heatGradientId}>
                  <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="var(--tertiary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--error)" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-primary/20" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-primary/15" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/10" />

              <ellipse cx="50" cy="15" rx="20" ry="8" fill="none" stroke="var(--primary)" strokeWidth="1" className="text-primary/30" />
              <ellipse cx="50" cy="85" rx="20" ry="8" fill="none" stroke="var(--primary)" strokeWidth="1" className="text-primary/30" />
              <ellipse cx="15" cy="50" rx="8" ry="20" fill="none" stroke="var(--primary)" strokeWidth="1" className="text-primary/30" />
              <ellipse cx="85" cy="50" rx="8" ry="20" fill="none" stroke="var(--primary)" strokeWidth="1" className="text-primary/30" />

              {zones.map((zone) => (
                <g 
                  key={zone.id}
                  className="cursor-pointer transition-all duration-500"
                  onClick={() => {
                    setActiveZone(zone.id);
                    setSelectedZone(zone);
                  }}
                  onMouseEnter={() => setActiveZone(zone.id)}
                  onMouseLeave={() => setActiveZone(null)}
                >
                  <circle 
                    cx={zone.cx} 
                    cy={zone.cy} 
                    r={zone.r} 
                    fill={`url(#${heatGradientId})`}
                    opacity={activeZone === zone.id ? 0.9 : 0.6}
                    filter="url(#glow)"
                    className="transition-all duration-700"
                  />
                  {/* Shimmer Effect */}
                  <circle 
                    cx={zone.cx} 
                    cy={zone.cy} 
                    r={zone.r} 
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeDasharray="1 5"
                    className="animate-spin opacity-20"
                    style={{ animationDuration: '10s' }}
                  />
                  <circle 
                    cx={zone.cx} 
                    cy={zone.cy} 
                    r={zone.r + 3} 
                    fill="none" 
                    stroke={getDensityColor(zone.density)}
                    strokeWidth="0.5"
                    strokeDasharray="3 3"
                    className="animate-pulse"
                  />
                </g>
              ))}

              <g className="animate-pulse">
                <circle cx="50" cy="50" r="4" className="fill-primary" />
                <circle cx="50" cy="50" r="2" className="fill-background" />
              </g>

              {activeZone && (
                <g>
                  <text x="50" y="5" textAnchor="middle" className="fill-primary text-[3px] font-bold uppercase tracking-widest">
                    {zones.find(z => z.id === activeZone)?.name}
                  </text>
                  <text x="50" y="8" textAnchor="middle" className="fill-secondary text-[2px] font-black">
                    {zones.find(z => z.id === activeZone)?.density}% DENSITY
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className={`absolute top-6 left-6 p-3 glass-card rounded-lg z-30 transition-all duration-300 ${arMode ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'}`}>
            <p className="text-[8px] uppercase tracking-widest text-on-surface/50 font-bold mb-1">Zone Density</p>
            <p className="text-lg font-black">{state.density}%</p>
            <div className="mt-2 h-1.5 w-24 rounded-full bg-surface-container-highest overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-secondary via-tertiary to-error"
                style={{ width: `${state.density}%` }}
              />
            </div>
          </div>

          <div className={`absolute top-6 right-6 p-3 glass-card rounded-lg z-30 transition-all duration-300 ${arMode ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${state.aisleStatus === "OPEN" ? "bg-secondary" : "bg-error"} animate-pulse`} />
              <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface/50">Aisle</span>
            </div>
            </p>
          </div>

          {/* AI Zone Intelligence Overlay */}
          {selectedZone && (
            <div className="absolute inset-x-6 bottom-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass-panel border-secondary/30 p-5 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">smart_toy</span>
                    <h4 className="text-xs font-black uppercase tracking-widest text-secondary">AI Zone Analysis: {selectedZone.name}</h4>
                  </div>
                  <button onClick={() => setSelectedZone(null)} className="text-on-surface/40 hover:text-on-surface">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <p className="text-xs leading-relaxed text-on-surface-variant font-medium">
                      Pulse Agent detects <span className="text-on-surface font-bold">{selectedZone.density}% density</span>. 
                      {selectedZone.density > 70 ? " Critical bottleneck forming. Suggesting immediate diversion to West Exit." : " Flow remains optimal. No action required."}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-secondary/20 flex items-center justify-center shrink-0">
                    <span className="text-lg font-black text-secondary">{selectedZone.density}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="glass-card rounded-lg p-5 transition-all duration-300 hover:scale-[1.02] cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] uppercase font-bold text-on-surface/40">Noise</span>
              <span className="material-symbols-outlined text-primary/50 text-sm">graphic_eq</span>
            </div>
            <p className="text-3xl font-black">{state.noiseLevel} dB</p>
            <div className="mt-3 flex gap-1 h-8">
              {[65, 80, 45, 90, 55, 70, 85, 40, 75, 60].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 rounded-sm transition-all duration-300 hover:opacity-100"
                  style={{ 
                    height: `${h}%`, 
                    backgroundColor: h > 75 ? 'var(--error)' : h > 50 ? 'var(--tertiary)' : 'var(--primary)',
                    opacity: 0.3 + (h / 100) * 0.7,
                    animationDelay: `${i * 0.05}s`
                  }} 
                />
              ))}
            </div>
          </div>
          <div className="glass-card rounded-lg p-5 transition-all duration-300 hover:scale-[1.02] cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] uppercase font-bold text-on-surface/40">Temp</span>
              <span className="material-symbols-outlined text-tertiary/50 text-sm">thermostat</span>
            </div>
            <p className="text-3xl font-black">{weather.temperatureC.toFixed(1)}°C</p>
            <p className="mt-2 text-xs text-on-surface/50">{weather.humidity}% humidity · {weather.source}</p>
          </div>
          <div className="glass-card rounded-lg p-5 sm:col-span-2 lg:col-span-1 border-primary/20 bg-primary/5 transition-all duration-300 hover:scale-[1.02] cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] uppercase font-bold text-on-primary">Scoreboard</span>
              <span className="material-symbols-outlined text-primary/50 text-sm">sports_cricket</span>
            </div>
            <p className="text-3xl font-black text-on-surface">{state.scoreInfo}</p>
            <p className="mt-2 text-xs text-on-surface/50">{state.gameClock}</p>
          </div>
          <div className="glass-card rounded-lg p-5 sm:col-span-2 lg:col-span-1 transition-all duration-300 hover:scale-[1.02] cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] uppercase font-bold text-on-surface/40">Venue Signal</span>
              <span className="material-symbols-outlined text-secondary/50 text-sm">cell_tower</span>
            </div>
            <p className="text-3xl font-black">{location.city}</p>
            <p className="mt-2 text-xs text-on-surface/50">{location.country} · {location.source}</p>
          </div>
          <div className="glass-card rounded-lg p-5 sm:col-span-2 lg:col-span-1 transition-all duration-300 hover:scale-[1.02] cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] uppercase font-bold text-on-surface/40">Weather Risk</span>
              <span className="material-symbols-outlined text-blue-400/50 text-sm">water_drop</span>
            </div>
            <p className={`text-3xl font-black ${weather.precipitationMm > 0 ? "text-error" : "text-secondary"}`}>
              {weather.precipitationMm > 0 ? "Wet" : "Clear"}
            </p>
            <p className="mt-2 text-xs text-on-surface/50">{weather.precipitationMm.toFixed(1)} mm rain · {weather.windKph.toFixed(1)} km/h wind</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col mb-4">
          <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
            Smart Wait Optimization
          </span>
          <h3 className="text-2xl font-black tracking-tight text-on-surface">Queue Sniper</h3>
        </div>
        
        <div className="space-y-4">
          {state.queues?.map((q, i) => {
            const isOptimal = q.waitTime <= 5;
            const isHigh = q.waitTime > 15;
            const isNotified = notifications[q.id];

            return (
              <div 
                key={q.id} 
                className={`glass-card rounded-lg p-5 border transition-all duration-300 hover:scale-[1.01] ${isOptimal ? 'border-secondary/40 shadow-[0_0_20px_rgba(74,225,118,0.15)] bg-secondary/5' : isHigh ? 'border-error/20 bg-error/5' : 'border-white/5 hover:border-primary/20'}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isOptimal ? 'bg-secondary/20' : isHigh ? 'bg-error/20' : 'bg-primary/10'}`}>
                      <span className={`material-symbols-outlined ${isOptimal ? 'text-secondary' : isHigh ? 'text-error' : 'text-primary'}`}>
                        {q.category === 'restroom' ? 'wc' : 'local_dining'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface">{q.name}</h3>
                      <span className="text-[9px] uppercase tracking-widest font-black text-on-surface-variant">Live Pipeline</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-2xl font-black ${isOptimal ? 'text-secondary' : isHigh ? 'text-error' : 'text-primary'}`}>
                      {q.waitTime}<span className="text-sm">m</span>
                    </span>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <span className={`material-symbols-outlined text-[10px] ${q.trend === 'rising' ? 'text-error' : q.trend === 'falling' ? 'text-secondary' : 'text-on-surface/50'}`}>
                        {q.trend === 'rising' ? 'trending_up' : q.trend === 'falling' ? 'trending_down' : 'trending_flat'}
                      </span>
                      <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface/50">{q.trend}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isOptimal ? 'bg-secondary' : isHigh ? 'bg-error' : 'bg-primary'}`}
                    style={{ width: `${Math.min(100, (q.waitTime / 30) * 100)}%` }}
                  />
                </div>

                {isOptimal ? (
                  <div className="w-full rounded-lg bg-secondary py-3 text-center text-xs font-black uppercase tracking-widest text-background shadow-lg shadow-secondary/20 animate-pulse">
                    GO NOW - NO QUEUE
                  </div>
                ) : (
                  <button 
                    onClick={() => toggleNotify(q.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                      isNotified 
                        ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' 
                        : 'border-white/10 text-on-surface hover:bg-white/5 hover:border-primary/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isNotified ? "'FILL' 1" : "" }}>
                      {isNotified ? 'notifications_active' : 'notifications'}
                    </span>
                    {isNotified ? 'Waiting for Drop' : 'Notify when < 5m'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}