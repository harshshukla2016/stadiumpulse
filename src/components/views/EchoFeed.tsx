"use client";

import { useEventEngine, Incident } from "@/context/EventContext";
import { useState, useEffect, useRef } from "react";

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

export default function EchoFeed() {
  const { state, reportIncident, resolveIncident } = useEventEngine();
  const [reporting, setReporting] = useState(false);
  const [locInput, setLocInput] = useState("");
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [isListening, setIsListening] = useState(true);
  const animationRef = useRef<number | undefined>(undefined);
  
  const messages = feedByEvent[state?.eventType || "IPL"] || [];

  useEffect(() => {
    const generateAudioLevels = () => {
      if (!isListening) return;
      
      const baseLevel = (state?.noiseLevel || 45) / 120;
      const newLevels = Array.from({ length: 32 }, () => {
        const variation = Math.random() * 0.4 - 0.2;
        const spike = Math.random() > 0.9 ? 0.3 : 0;
        return Math.min(1, Math.max(0.1, baseLevel + variation + spike));
      });
      setAudioLevels(newLevels);
      animationRef.current = requestAnimationFrame(generateAudioLevels);
    };

    generateAudioLevels();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [state.noiseLevel, isListening]);

  const handleReport = (type: Incident["type"]) => {
    if (!locInput) return;
    reportIncident(type, locInput);
    setReporting(false);
    setLocInput("");
  };

  const getBarColor = (level: number) => {
    const hue = 200 + (level * 60);
    if (level > 0.7) return `hsl(0, 70%, 60%)`;
    if (level > 0.5) return `hsl(30, 80%, 55%)`;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div className="flex-1 space-y-8 overflow-y-auto pb-32 p-6 pt-2">
      
      <div>
        <div className="flex flex-col mb-4">
          <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
            Acoustic Intelligence
          </span>
          <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">Echo Live.</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
          <div className="glass-card relative flex h-64 items-end justify-center gap-0.5 overflow-hidden rounded-xl border border-primary/20 p-4 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent" />
            
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary/60 text-sm">equalizer</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-primary/60">Spectrum</span>
            </div>
            
            <div className="absolute top-3 right-3">
              <button 
                onClick={() => setIsListening(!isListening)}
                aria-label={isListening ? "Pause live acoustic scanning" : "Resume live acoustic scanning"}
                className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all ${isListening ? 'bg-secondary text-background' : 'bg-surface-container-high text-on-surface/50'}`}
              >
                {isListening ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-end justify-center gap-[3px] h-32 w-full px-4">
                {audioLevels.length > 0 ? audioLevels.map((level, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-75"
                    style={{
                      height: `${level * 100}%`,
                      backgroundColor: getBarColor(level),
                      boxShadow: level > 0.6 ? `0 0 8px ${getBarColor(level)}` : 'none',
                    }}
                  />
                )) : Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/30"
                    style={{ height: '20%' }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-secondary animate-pulse' : 'bg-on-surface/30'}`} />
                <span className="text-[10px] font-bold text-on-surface/50">{state.noiseLevel.toFixed(1)} dB</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-black uppercase tracking-widest text-secondary">
                  {isListening ? 'Capturing' : 'Paused'}
                </span>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-center">
                <span className="text-4xl font-black text-primary/20">{state?.noiseLevel?.toFixed(0) || 45}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div 
                key={`${state.eventType}-${msg.id}`} 
                className={`glass-card rounded-xl border-l-2 p-4 transition-all duration-300 hover:scale-[1.01] ${
                  msg.color === 'secondary' 
                    ? 'border-secondary bg-secondary/5' 
                    : msg.color === 'error' 
                    ? 'border-error bg-error/5' 
                    : 'border-primary bg-primary/5'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
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

      <div className="border-t border-white/5 pt-8">
        <div className="flex flex-col mb-4">
          <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
            Agentic Logic Layer
          </span>
          <h2 className="text-2xl font-black tracking-tight text-on-surface">Intelligence Timeline</h2>
          <p className="text-xs text-on-surface-variant mt-2 max-w-sm">
            Real-time feed of Pulse Agent reasoning, predictive modeling, and autonomous proactive actions.
          </p>
        </div>

        <div className="relative space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10 before:border-l before:border-dashed before:border-white/20">
          {state.insights.map((insight, i) => (
            <div 
              key={insight.id} 
              className="relative animate-in fade-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-background border border-primary flex items-center justify-center">
                <div className={`w-1 h-1 rounded-full ${insight.type === 'alert' ? 'bg-error' : insight.type === 'action' ? 'bg-secondary' : 'bg-primary'} animate-pulse`} />
              </div>
              <div className="glass-card rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] font-black uppercase tracking-widest ${insight.type === 'alert' ? 'text-error' : insight.type === 'action' ? 'text-secondary' : 'text-primary'}`}>
                    {insight.type}
                  </span>
                  <span className="text-[8px] font-bold text-on-surface/30 uppercase">
                    {new Date(insight.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-on-surface/80 leading-relaxed font-medium">
                  {insight.text}
                </p>
                {insight.type === 'prediction' && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[8px] font-bold text-secondary uppercase bg-secondary/10 px-1.5 py-0.5 rounded">Deploying Optimization</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-8">
        <div className="flex flex-col mb-4">
          <span className="text-error text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
            Peer-to-Peer Safety
          </span>
          <h2 className="text-2xl font-black tracking-tight text-on-surface">SOS Mesh</h2>
          <p className="text-xs text-on-surface-variant mt-2 max-w-sm">
            Critical issues lock surrounding aisles and establish immediate emergency paths.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            onClick={() => setReporting(true)}
            data-testid="report-btn"
            className="col-span-2 py-4 bg-error text-background font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-error/20 active:scale-95 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            Report New Incident
          </button>
        </div>

        {reporting && (
          <div className="glass-card p-5 rounded-2xl border border-error/20 bg-error/5 animate-in fade-in slide-in-from-top-4 mb-6">
            <h3 className="font-bold mb-3 text-sm uppercase tracking-widest text-error">Incident Details</h3>
            <input 
              type="text" 
              placeholder="Location (e.g. Aisle 114)" 
              className="w-full bg-background/80 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-error focus:ring-1 focus:ring-error mb-3 transition-all"
              value={locInput}
              onChange={(e) => setLocInput(e.target.value)}
            />
            <div className="flex gap-2">
              <button disabled={!locInput} onClick={() => handleReport("medical")} className="flex-1 py-3 border border-error text-error bg-error/10 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-error/20 disabled:opacity-50 transition-all">Medical</button>
              <button disabled={!locInput} onClick={() => handleReport("security")} className="flex-1 py-3 border border-orange-500 text-orange-500 bg-orange-500/10 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-orange-500/20 disabled:opacity-50 transition-all">Security</button>
              <button data-testid="report-mess-btn" disabled={!locInput} onClick={() => handleReport("spill")} className="flex-1 py-3 border border-blue-400 text-blue-400 bg-blue-400/10 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-400/20 disabled:opacity-50 transition-all">Mess</button>
            </div>
            <button onClick={() => setReporting(false)} className="w-full mt-3 py-2 text-[10px] uppercase font-bold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
          </div>
        )}

        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4 border-b border-white/5 pb-2">Active Mesh Beacons</h3>
          <div className="space-y-3">
            {state.incidents.length === 0 ? (
              <div className="glass-card rounded-xl p-6 text-center border border-white/5 transition-all hover:border-secondary/30 group">
                <span className="material-symbols-outlined text-4xl text-secondary/50 mb-2 group-hover:scale-110 transition-transform">check_circle</span>
                <p className="text-sm font-bold text-on-surface-variant">All Zones Secure</p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50">No active incidents</p>
              </div>
            ) : (
              state.incidents.map((incident, i) => (
                <div 
                  key={incident.id} 
                  className={`glass-card rounded-xl p-4 border transition-all duration-300 hover:scale-[1.01] ${
                    incident.status === 'resolved' 
                      ? 'border-white/5 opacity-50' 
                      : incident.type === 'spill' 
                      ? 'border-blue-400/30 bg-blue-400/5' 
                      : 'border-error/40 shadow-[0_0_20px_rgba(255,89,94,0.15)] bg-error/10'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${incident.status === 'resolved' ? 'bg-surface-container-high' : incident.type === 'spill' ? 'bg-blue-400/20 text-blue-400' : 'bg-error/20 text-error'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {incident.type === 'medical' ? 'medical_services' : incident.type === 'security' ? 'local_police' : 'water_drop'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface capitalize">{incident.type} <span className="uppercase text-[9px] tracking-widest text-on-surface-variant ml-1 font-black">Beacon</span></h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">{incident.location}</p>
                      </div>
                    </div>
                    {incident.status === 'active' ? (
                      <button data-testid="resolve-btn" onClick={() => resolveIncident(incident.id)} className="px-3 py-1.5 bg-background border border-white/10 rounded-lg text-[10px] font-bold uppercase hover:bg-secondary hover:border-secondary hover:text-background transition-all active:scale-95">Resolve</button>
                    ) : (
                      <span className="text-[9px] uppercase tracking-widest font-black text-secondary">Cleared</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}