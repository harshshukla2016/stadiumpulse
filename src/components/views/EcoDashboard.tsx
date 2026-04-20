"use client";

import { useEventEngine } from "@/context/EventContext";
import { useState, useEffect } from "react";

export default function EcoDashboard() {
  const { state } = useEventEngine();
  const [ecoPoints, setEcoPoints] = useState(80);
  const [carbonSaved] = useState(14.2);
  const [carpoolMatches, setCarpoolMatches] = useState(1240);
  const [isCarpoolMatched, setIsCarpoolMatched] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [achievements, setAchievements] = useState<string[]>(["early_adopter"]);

  const transitStatus = state.aisleStatus === "LOCKED" ? "Controlled" : "Low";
  const { carbon, location, weather } = state.venueIntel;
  const navigation = state.navigation;

  const level = Math.floor(ecoPoints / 50) + 1;
  const nextLevelPoints = level * 50;
  const progressPercent = ((ecoPoints % 50) / 50) * 100;

  const userBadges = [
    { id: "eco_warrior", icon: "eco", label: "Eco Warrior", earned: carbonSaved > 20 },
    { id: "early_adopter", icon: "rocket_launch", label: "Early Bird", earned: true },
    { id: "carpool_champion", icon: "groups", label: "Carpool King", earned: isCarpoolMatched },
    { id: "exit_master", icon: "exit_to_app", label: "Exit Pro", earned: ecoPoints > 150 },
  ];

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => setIsNavigating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  const handleCarpoolJoin = () => {
    setIsCarpoolMatched(true);
    setEcoPoints(prev => prev + 25);
    setCarpoolMatches(prev => prev + Math.floor(Math.random() * 50 + 10));
    if (!achievements.includes("carpool_champion")) {
      setAchievements(prev => [...prev, "carpool_champion"]);
    }
  };

  return (
    <div className="flex-1 space-y-6 overflow-y-auto pb-32 p-6 pt-2">
      <div className="flex flex-col">
        <span className="text-secondary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
          Dynamic Egress & Sustainability
        </span>
        <h2 className="text-4xl font-black tracking-tighter leading-none text-on-surface">Escape Flow</h2>
        <p className="text-xs text-on-surface-variant mt-2 max-w-sm">
          Traffic gridlock happens when everyone uses the main gate. Follow your personalized detour to leave the venue in under 5 minutes and earn Eco-Points.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,1fr)]">
        
        <div className="glass-card relative overflow-hidden rounded-lg border border-secondary/40 bg-secondary/5 p-6 shadow-[0_0_30px_rgba(74,225,118,0.15)] lg:col-span-2">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-secondary" aria-hidden="true">door_open</span>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface">Active Detour</h3>
              <p className="text-xs text-on-surface-variant/80 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                Main Gate is bottlenecked (Wait: 45m)
              </p>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center bg-background/50 p-4 rounded-lg border border-white/5 transition-all duration-300 hover:bg-background/70">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/50 mb-1">Your Route</p>
                <p className="text-xl font-black text-secondary flex items-center gap-2">
                  {navigation.pickup.label} 
                  <span className="text-xs text-on-surface-variant ml-1 font-bold">via Aisle 112</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-on-surface/50 font-bold block mb-1">Est. Wait</span>
                <span className="text-lg font-black text-secondary">{navigation.durationMinutes} min</span>
              </div>
            </div>
            
            <div className="relative rounded-lg border border-white/10 bg-surface-container-low overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <iframe
                title="StadiumPulse pickup navigation map"
                src={navigation.mapEmbedUrl}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-background/80 backdrop-blur text-[8px] font-black uppercase tracking-widest text-secondary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Live
              </div>
            </div>
            
            <button
              onClick={() => setIsNavigating(true)}
              disabled={isNavigating}
              className={`flex w-full items-center justify-center gap-2 rounded-lg py-4 text-xs font-black uppercase tracking-widest shadow-lg transition-all duration-300 active:scale-95 ${
                isNavigating 
                  ? 'bg-secondary/50 text-on-secondary cursor-default'
                  : 'bg-secondary text-background shadow-secondary/20 hover:scale-[1.02] hover:shadow-xl'
              }`}
            >
              {isNavigating ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  Launching Maps...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[14px]">map</span>
                  Start Navigation · {navigation.distanceKm} km
                </>
              )}
            </button>
          </div>
        </div>

        <div className="glass-card relative flex flex-col items-center overflow-hidden rounded-lg border border-secondary/20 p-6 shadow-[0_0_30px_rgba(74,225,118,0.1)]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0" />
          
          <div className="relative mb-4 flex h-36 w-36 items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="64" fill="none" stroke="var(--surface-container-highest)" strokeWidth="10" />
              <circle 
                cx="72" 
                cy="72" 
                r="64" 
                fill="none" 
                stroke="var(--secondary)" 
                strokeWidth="10" 
                strokeDasharray="402.12"
                strokeDashoffset={402.12 - (progressPercent / 100) * 402.12}
                className="transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-secondary">{ecoPoints}</span>
              <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface-variant">points</span>
            </div>
          </div>

          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-[10px] font-black uppercase tracking-widest text-secondary">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              Level {level} Fan
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="text-center p-3 rounded-lg bg-surface-container-high/50 transition-all duration-300 hover:scale-105 cursor-default">
              <span className="text-2xl font-black text-secondary block">{carbonSaved.toFixed(1)}<span className="text-[10px]">kg</span></span>
              <p className="text-[8px] uppercase tracking-widest text-on-surface/50 font-bold mt-1">CO₂ Prevented</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-surface-container-high/50 transition-all duration-300 hover:scale-105 cursor-default">
              <span className="text-2xl font-black text-primary block">{state.apiHealth === "live" ? "3" : "1"}<span className="text-[10px]"></span></span>
              <p className="text-[8px] uppercase tracking-widest text-on-surface/50 font-bold mt-1">Events Attended</p>
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="flex justify-between text-[8px] uppercase tracking-widest mb-2">
              <span className="text-on-surface/50">Level {level}</span>
              <span className="text-secondary">{nextLevelPoints - ecoPoints} to Level {level + 1}</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary/70 transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="glass-card rounded-lg border border-secondary/20 p-4 transition-all duration-300 hover:scale-[1.02] cursor-default">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary/60 text-sm">electric_bolt</span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-secondary/80">Grid Carbon</span>
              </div>
              <p className="text-2xl font-black text-secondary">{carbon.intensity}<span className="text-xs"> gCO2/kWh</span></p>
              <p className="text-[10px] uppercase tracking-widest text-on-surface/50">{carbon.index} · {carbon.source}</p>
            </div>
            <div className="glass-card rounded-lg border border-primary/20 p-4 transition-all duration-300 hover:scale-[1.02] cursor-default">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary/60 text-sm">thermostat</span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/80">Venue Weather</span>
              </div>
              <p className="text-2xl font-black text-primary">{weather.temperatureC.toFixed(1)}°C</p>
              <p className="text-[10px] uppercase tracking-widest text-on-surface/50">{location.city} · {weather.source}</p>
            </div>
          </div>

          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant mt-2 border-b border-white/5 pb-2">Smart Transit Flow</h3>
          
          <div className="glass-card group relative overflow-hidden rounded-lg border border-white/5 p-6 transition-all duration-300 hover:border-primary/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em] block mb-1">Lot 4 Pickup</span>
                <h3 className="text-xl font-bold">Surge Pricing: <span className="text-primary">{transitStatus === "Controlled" ? "1.8x" : "1.2x"}</span></h3>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface/40">{navigation.source} route · {navigation.taxi.provider} handoff</p>
              </div>
              <span className="material-symbols-outlined text-primary/30 text-3xl group-hover:scale-110 transition-transform">local_taxi</span>
            </div>
            
            <a
              href={navigation.taxi.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-lg border border-transparent bg-primary py-3 text-center text-[10px] font-black uppercase tracking-widest text-background shadow-lg shadow-primary/20 transition-all duration-300 hover:border-primary hover:bg-transparent hover:text-primary active:scale-95"
            >
              Open Taxi Booking
            </a>
            <p className="mt-3 text-[10px] leading-relaxed text-on-surface/50">
              {navigation.taxi.note}
            </p>
          </div>

          <div className={`glass-card relative flex h-36 flex-col justify-center overflow-hidden rounded-lg border transition-all duration-500 ${isCarpoolMatched ? 'border-secondary/40 bg-secondary/5' : 'border-white/5'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-50" />
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 px-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>nature_people</span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-secondary">Carpool Community</span>
              </div>
              <h4 className="text-lg font-black leading-tight mb-1">
                {isCarpoolMatched ? "Match Found!" : "Match & Save"}
              </h4>
              <p className="text-[10px] text-on-surface/50 max-w-[180px] leading-tight">
                {isCarpoolMatched 
                  ? "You're matched with 3 fans. Exit 15% faster together!"
                  : `Match with ${carpoolMatches.toLocaleString()} fans to exit faster and earn 50 Eco-Points.`
                }
              </p>
            </div>
            
            <button 
              onClick={handleCarpoolJoin}
              disabled={isCarpoolMatched}
              className={`absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border transition-all duration-300 active:scale-95 ${
                isCarpoolMatched 
                  ? 'bg-secondary border-secondary text-background' 
                  : 'border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary hover:text-background'
              }`}
            >
              {isCarpoolMatched ? (
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              ) : (
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              )}
            </button>
          </div>

          <div className="glass-card rounded-lg border border-white/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-sm">military_tech</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Badges</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {userBadges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    badge.earned 
                      ? 'bg-secondary/20 border border-secondary/30 text-secondary hover:scale-110 cursor-pointer' 
                      : 'bg-surface-container-high/50 border border-white/5 text-on-surface/20'
                  }`}
                  title={badge.label}
                >
                  <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}