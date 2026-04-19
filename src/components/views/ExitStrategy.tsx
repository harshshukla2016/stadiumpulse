"use client";

import { useEventEngine } from "@/context/EventContext";
import { useState } from "react";

export default function ExitStrategy() {
  const { state } = useEventEngine();
  const [rideBooked, setRideBooked] = useState(false);
  const [loungeClaimed, setLoungeClaimed] = useState(false);
  const [carpoolJoined, setCarpoolJoined] = useState(false);
  const rideshareWait = state.aisleStatus === "LOCKED" ? 52 : state.density > 45 ? 38 : 24;
  const northFlow = state.aisleStatus === "LOCKED" ? "Controlled" : "Flowing";

  return (
    <div className="flex-1 space-y-6 overflow-y-auto">
      <div className="flex flex-col">
        <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
          Smart Departure
        </span>
        <h2 className="text-3xl font-black tracking-tighter leading-none sm:text-4xl">Smart Exit</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)]">
      <div className="glass-card group relative overflow-hidden rounded-lg p-6">
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em] block mb-1">Transport Analysis</span>
            <h3 className="text-xl font-bold">Rideshare Wait: <span className="text-error italic">{rideshareWait}m</span></h3>
          </div>
          <span className="text-on-surface/20 text-3xl font-black" aria-hidden="true">ETA</span>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="flex justify-between text-[10px] border-b border-white/5 pb-2">
            <span className="text-on-surface/50 font-bold uppercase tracking-widest">Zone A (Main)</span>
            <span className="text-error font-black uppercase">Congested</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-on-surface/50 font-bold uppercase tracking-widest">Zone B (North)</span>
            <span className="text-secondary font-black uppercase tracking-widest">{northFlow}</span>
          </div>
        </div>

        <button
          onClick={() => setRideBooked(true)}
          className="mt-6 w-full rounded-lg bg-primary py-4 text-xs font-black uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          {rideBooked ? "Rideshare Booked" : "Book Rideshare"}
        </button>
      </div>

      <div className="glass-card rounded-lg border border-secondary/20 p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
          <span className="material-symbols-outlined text-secondary" aria-hidden="true">workspace_premium</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Avoid the Rush</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
          Wait out the peak traffic in our premium North Wing Lounge. Exclusive 20% discount for app users.
        </p>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-3xl font-black text-secondary">20% Off</span>
            <p className="text-[8px] font-bold text-on-surface/40 uppercase tracking-widest leading-none mt-1">Lounge Pass</p>
          </div>
          <button
            onClick={() => setLoungeClaimed(true)}
            className="rounded-lg bg-secondary-container px-6 py-3 text-[10px] font-black uppercase tracking-widest text-on-secondary-container transition-all hover:brightness-110"
          >
            {loungeClaimed ? "Claimed" : "Claim"}
          </button>
        </div>
      </div>

      <button
        onClick={() => setCarpoolJoined(true)}
        className="glass-card relative flex h-40 flex-col justify-center overflow-hidden rounded-lg p-6 text-left transition-all active:scale-[0.98] lg:col-span-2"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-highest to-transparent opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">groups</span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Community</span>
          </div>
          <h4 className="text-lg font-black leading-tight mb-2">{carpoolJoined ? "Carpool Match Active" : "Match Carpool"}</h4>
          <p className="text-[10px] text-on-surface/50 max-w-[180px] leading-tight">
            {carpoolJoined ? "Searching North Gate matches now." : "Match with 1,240 fans and exit 15% faster tonight."}
          </p>
        </div>
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl text-on-surface/10 font-black" aria-hidden="true">&gt;</span>
      </button>
      </div>
    </div>
  );
}
