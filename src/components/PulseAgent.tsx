"use client";

import { useEventEngine } from "@/context/EventContext";
import { useState, useEffect, useRef } from "react";

export default function PulseAgent() {
  const { state } = useEventEngine();
  const [isOpen, setIsOpen] = useState(false);
  const [latestInsight, setLatestInsight] = useState(state.insights[0]);
  const [showBubble, setShowBubble] = useState(false);
  const prevInsightIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentInsight = state.insights[0];
    if (currentInsight && currentInsight.id !== prevInsightIdRef.current) {
      prevInsightIdRef.current = currentInsight.id;
      setLatestInsight(currentInsight);
      setShowBubble(true);
      const timer = setTimeout(() => setShowBubble(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [state.insights]);

  return (
    <div className="fixed bottom-32 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none sm:bottom-40">
      
      {/* Thought Bubble */}
      {(showBubble || isOpen) && latestInsight && (
        <div 
          className={`glass-panel border-primary/20 p-4 rounded-2xl max-w-[240px] shadow-2xl pointer-events-auto transition-all duration-500 origin-bottom-right ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-100 translate-y-[-10px]'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Pulse Intelligence</span>
          </div>
          <p className="text-xs font-medium leading-relaxed text-on-surface">
            {latestInsight.text}
          </p>
          {isOpen && (
            <div className="mt-4 pt-3 border-t border-white/5 space-y-3">
              <span className="text-[8px] font-black uppercase tracking-widest text-on-surface/40">Recent Reasoning</span>
              {state.insights.slice(1, 4).map((insight) => (
                <div key={insight.id} className="flex gap-2">
                  <span className="text-secondary text-[10px] sm:text-xs">→</span>
                  <p className="text-[10px] text-on-surface/60">{insight.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Agent Orb */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto relative group flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 ${
          isOpen ? 'bg-primary shadow-[0_0_30px_rgba(148,181,255,0.4)] rotate-90' : 'bg-surface-container-highest shadow-xl hover:scale-110 active:scale-95'
        }`}
      >
        <div className={`absolute inset-0 rounded-full border-2 border-primary/30 transition-all duration-700 ${isOpen ? 'scale-125 opacity-0' : 'animate-ping opacity-40'}`} />
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
        
        <span className={`material-symbols-outlined text-2xl transition-all duration-500 ${
          isOpen ? 'text-on-primary' : 'text-primary group-hover:text-secondary'
        }`} style={{ fontVariationSettings: "'FILL' 1" }}>
          {isOpen ? 'close' : 'smart_toy'}
        </span>

        {/* Status Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle 
            cx="28" cy="28" r="26" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeDasharray="163" 
            strokeDashoffset={isOpen ? "0" : "120"}
            className={`transition-all duration-1000 ${isOpen ? 'text-on-primary/30' : 'text-primary/20 animate-pulse'}`}
          />
        </svg>
      </button>
    </div>
  );
}
