"use client";

import { EventType, useEventEngine } from "@/context/EventContext";

export type ViewType = "pulse" | "echo" | "hub" | "eco";

interface BottomNavProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export default function BottomNav({ activeView, setActiveView }: BottomNavProps) {
  const { state, setEventType } = useEventEngine();

  const navItems: Array<{ id: ViewType; label: string; icon: string }> = [
    { id: "pulse", label: "Pulse", icon: "monitoring" },
    { id: "echo", label: "Echo", icon: "campaign" },
    { id: "hub", label: "Hub", icon: "storefront" },
    { id: "eco", label: "Eco", icon: "energy_savings_leaf" },
  ];

  const personas: EventType[] = ["IPL", "CONCERT", "COMEDY"];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-4xl border-t border-white/5 bg-[#131313]/70 px-3 pb-4 pt-2 shadow-2xl backdrop-blur-md sm:px-4">
      {/* View Switcher */}
      <div className="mb-3 grid grid-cols-4 gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex min-h-14 flex-col items-center justify-center rounded-lg px-2 py-2 transition-all ${
              activeView === item.id 
                ? "text-secondary bg-secondary/10 active:scale-95" 
                : "text-on-surface/50 hover:text-primary active:scale-95"
            }`}
            aria-pressed={activeView === item.id}
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-[10px] uppercase tracking-[0.1em] font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Persona Switcher (Quick Toggle for Demo) */}
      <div className="flex justify-center gap-2">
        {personas.map((p) => (
          <button
            key={p}
            onClick={() => setEventType(p)}
            className={`rounded-lg border px-3 py-1 text-[8px] font-bold uppercase tracking-widest transition-all sm:text-[10px] ${
              state.eventType === p 
                ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20" 
                : "bg-surface-container-high text-on-surface/40 border-white/5"
            }`}
            aria-pressed={state.eventType === p}
          >
            {p}
          </button>
        ))}
      </div>
    </nav>
  );
}
