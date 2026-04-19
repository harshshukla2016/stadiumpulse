"use client";

import { useEventEngine } from "@/context/EventContext";

interface EchoMessage {
  id: string;
  category: string;
  text: string;
  time: string;
  color: string;
}

const feedByEvent: Record<string, EchoMessage[]> = {
  IPL: [
    { id: "1", category: "CROWD ANALYSIS", text: "Decibel surge in North Stand after the boundary. Expect vibration increase.", time: "Just Now", color: "secondary" },
    { id: "2", category: "TACTICAL ALERT", text: "Death overs active. Aisle access may lock during live balls.", time: "2m ago", color: "primary" },
  ],
  CONCERT: [
    { id: "1", category: "ACOUSTIC INTEL", text: "Acoustic set starting. Crowd movement bottlenecking at Aisle 4.", time: "Just Now", color: "secondary" },
    { id: "2", category: "ATMOSPHERE", text: "Peak frequency detected. Audio clarity at 98.4%.", time: "5m ago", color: "primary" },
  ],
  COMEDY: [
    { id: "1", category: "SILENCE SENSOR", text: "Crowd quiet for headline set. Keep aisle movement low.", time: "Just Now", color: "error" },
    { id: "2", category: "HUMOR METRIC", text: "Laughter peaks are lifting in the east bowl. Arena pressure normal.", time: "10m ago", color: "primary" },
  ],
};

const visualizerBars = [64, 42, 78, 35, 88, 52, 73, 96, 46, 69, 31, 82, 58, 74, 39];

export default function EchoFeed() {
  const { state } = useEventEngine();
  const messages = feedByEvent[state.eventType] || [];

  return (
    <div className="flex-1 space-y-6 overflow-y-auto">
      <div className="flex flex-col">
        <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
          Acoustic Intelligence
        </span>
        <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">Echo Live.</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
        <div className="glass-card relative flex h-64 items-end justify-center gap-1 overflow-hidden rounded-lg p-6 lg:h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          {visualizerBars.map((height, i) => (
            <div 
              key={`visualizer-bar-${height}-${i}`} 
              className="w-2 animate-pulse rounded-t-full bg-primary/40 sm:w-3" 
              style={{ 
                height: `${height}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.6 + (i % 5) * 0.12}s`
              }} 
            />
          ))}
        </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={`${state.eventType}-${msg.id}`} className={`glass-card rounded-lg border-l-2 p-4 ${msg.color === 'secondary' ? 'border-secondary' : msg.color === 'error' ? 'border-error' : 'border-primary'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[8px] font-black text-on-surface/40 uppercase tracking-widest">{msg.category}</span>
              <span className="text-[8px] font-bold text-on-surface/30 uppercase">{msg.time}</span>
            </div>
            <p className="text-sm text-on-surface/90 leading-relaxed font-medium">
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
