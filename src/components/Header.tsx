"use client";

import { useEventEngine } from "@/context/EventContext";

export default function Header() {
  const { state } = useEventEngine();
  const apiStatusLabel = state.apiHealth === "live" ? "API Live" : state.apiHealth === "loading" ? "Syncing" : "Fallback";

  const isLoading = state.apiHealth === "loading";

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/5 bg-[#131313]/70 px-4 py-4 shadow-lg backdrop-blur-xl sm:px-6 lg:px-8 transition-all duration-300">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-2xl animate-pulse" aria-hidden="true">
          hub
        </span>
        <span className="text-sm font-black tracking-tighter text-primary uppercase sm:text-base">StadiumPulse</span>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden flex-col items-end min-[380px]:flex">
          <span className="text-[10px] font-bold text-on-surface/50 uppercase tracking-widest leading-none">
            {state.eventType}
          </span>
          <span className="text-xs font-bold text-on-surface transition-all duration-300">{state.gameClock}</span>
          <span className={`hidden text-[8px] font-black uppercase tracking-widest sm:block transition-all duration-300 ${
            isLoading ? "text-tertiary" : state.apiHealth === "live" ? "text-secondary" : "text-error"
          }`}>
            {isLoading && <span className="inline-block animate-pulse mr-1">●</span>}
            {apiStatusLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full border border-white/5 transition-all duration-300 hover:bg-surface-container-high">
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
            state.aisleStatus === "OPEN" 
              ? "bg-secondary shadow-[0_0_8px_#4ae176]" 
              : "bg-error shadow-[0_0_8px_#ffb4ab]"
          } ${state.aisleStatus === "OPEN" ? "animate-pulse" : ""}`} />
          <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors duration-300 ${
            state.aisleStatus === "OPEN" ? "text-secondary" : "text-error"
          }`}>
            {state.aisleStatus}
          </span>
        </div>
      </div>
    </header>
  );
}