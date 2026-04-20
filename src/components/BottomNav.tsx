"use client";

import { EventType, useEventEngine } from "@/context/EventContext";

export type ViewType = "pulse" | "echo" | "hub" | "eco";

interface BottomNavProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export default function BottomNav({ activeView, setActiveView }: BottomNavProps) {
  const { state, setEventType } = useEventEngine();

  const navItems: { id: ViewType; label: string; icon: string }[] = [
    { id: "pulse", label: "Pulse", icon: "monitoring" },
    { id: "echo", label: "Echo", icon: "campaign" },
    { id: "hub", label: "Hub", icon: "storefront" },
    { id: "eco", label: "Eco", icon: "energy_savings_leaf" },
  ];

  const personas: EventType[] = ["IPL", "CONCERT", "COMEDY"];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-4xl border-t border-white/5 bg-[#131313]/80 px-3 pb-4 pt-2 shadow-2xl backdrop-blur-xl sm:px-4 transition-all duration-300">
      <div className="mb-3 grid grid-cols-4 gap-2">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`relative flex min-h-16 flex-col items-center justify-center rounded-xl px-2 py-3 transition-all duration-300 ${
              activeView === item.id 
                ? "text-secondary bg-secondary/10 scale-105 shadow-lg shadow-secondary/20" 
                : "text-on-surface/50 hover:text-primary hover:bg-white/5 active:scale-95"
            }`}
            aria-pressed={activeView === item.id}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {activeView === item.id && (
              <span className="absolute inset-x-2 top-1 h-0.5 bg-secondary rounded-full" />
            )}
            <span className="material-symbols-outlined text-2xl mb-1 transition-transform duration-300" style={{ fontVariationSettings: activeView === item.id ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span className="text-[10px] uppercase tracking-[0.1em] font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {personas.map((p, index) => (
          <button
            key={p}
            onClick={() => setEventType(p)}
            className={`rounded-lg border px-4 py-1.5 text-[8px] font-bold uppercase tracking-widest transition-all duration-300 sm:text-[10px] ${
              state.eventType === p 
                ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20 scale-105" 
                : "bg-surface-container-high text-on-surface/40 border-white/5 hover:bg-white/10 hover:text-on-surface hover:border-white/20"
            }`}
            style={{ animationDelay: `${index * 75}ms` }}
            aria-pressed={state.eventType === p}
          >
            {p}
          </button>
        ))}
      </div>
    </nav>
  );
}