"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { fallbackVenueIntel, type ApiHealth, type VenueIntel } from "@/lib/venueIntel";
import { createFallbackNavigationIntel, type NavigationIntel } from "@/lib/navigation";

export type EventType = "IPL" | "CONCERT" | "COMEDY";
export type AisleStatus = "OPEN" | "LOCKED";

export interface QueueItem {
  id: string;
  name: string;
  category: "restroom" | "concession" | "merch";
  waitTime: number;
  trend: "rising" | "falling" | "stable";
}

export interface Incident {
  id: string;
  type: "medical" | "security" | "spill";
  location: string;
  status: "active" | "resolved";
}

export interface AgentInsight {
  id: string;
  text: string;
  type: "prediction" | "action" | "alert";
  timestamp: string;
}

interface EventState {
  eventType: EventType;
  aisleStatus: AisleStatus;
  gameClock: string; 
  scoreInfo: string; 
  queues: QueueItem[];
  incidents: Incident[];
  noiseLevel: number;
  density: number;
  apiHealth: ApiHealth;
  venueIntel: VenueIntel;
  navigation: NavigationIntel;
  insights: AgentInsight[];
  isMicActive: boolean;
}

interface EventContextProps {
  state: EventState;
  isReady: boolean;
  setEventType: (type: EventType) => void;
  reportIncident: (type: Incident["type"], location: string) => void;
  resolveIncident: (id: string) => void;
  toggleMic: () => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EventState>({
    eventType: "IPL",
    aisleStatus: "OPEN",
    gameClock: "18.4 Overs",
    scoreInfo: "174/3",
    queues: [
      { id: "q1", name: "Gate 4 Restrooms", category: "restroom", waitTime: 4, trend: "falling" },
      { id: "q2", name: "Section 112 Drinks", category: "concession", waitTime: 12, trend: "rising" },
      { id: "q3", name: "Main Merch Hub", category: "merch", waitTime: 8, trend: "stable" }
    ],
    incidents: [],
    noiseLevel: 104.2,
    density: 24,
    apiHealth: { status: "nominal", latency: 24, load: 0.12 },
    venueIntel: fallbackVenueIntel,
    navigation: createFallbackNavigationIntel({ latitude: 18.9933, longitude: 73.1154 }),
    insights: [
      { id: "i1", text: "Crowd density increasing in North Stand. Rerouting concessions staff.", type: "action", timestamp: new Date().toISOString() },
      { id: "i2", text: "Acoustic peak detected (112dB). Narrating event highlights for accessibility users.", type: "prediction", timestamp: new Date().toISOString() }
    ],
    isMicActive: false
  });

  const [isReady, setIsReady] = useState(false);
  const nextIncidentId = useRef(0);
  const tickCount = useRef(0);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const [vi, ni, ah] = await Promise.all([
          fetch("/api/venue-intel").then(r => r.json()),
          fetch("/api/navigation").then(r => r.json()),
          fetch("/api/health").then(r => r.json())
        ]);
        setState(prev => ({ ...prev, venueIntel: vi, navigation: ni, apiHealth: ah }));
        setIsReady(true);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    initialFetch();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      tickCount.current += 1;
      
      setState((prev) => {
        const newQueues = prev.queues.map(q => ({
          ...q,
          waitTime: Math.max(1, q.waitTime + Math.floor(Math.random() * 3 - 1))
        }));

        let newClock = prev.gameClock;
        let newScore = prev.scoreInfo;
        let newAisleStatus = prev.aisleStatus;
        let densityDelta = (Math.random() - 0.4) * 3;

        if (prev.eventType === "IPL") {
          if (prev.gameClock === "Innings Break") {
            newClock = "0.0 Overs";
            newScore = "0/0";
            return { ...prev, gameClock: newClock, scoreInfo: newScore };
          }

          const [overText, ballText = "0"] = prev.gameClock.replace(" Overs", "").split(".");
          const over = Number(overText);
          const ball = Number(ballText);
          const nextBall = ball >= 5 ? 0 : ball + 1;
          const nextOver = ball >= 5 ? over + 1 : over;

          if (nextOver >= 19 && nextOver < 20) {
            newAisleStatus = "LOCKED";
          }
          if (nextOver >= 20) {
            newClock = "Innings Break";
            newAisleStatus = "OPEN";
            newScore = "188/5";
            densityDelta = 7;
          } else {
            newClock = `${nextOver}.${nextBall} Overs`;
            if (nextBall === 0) {
              const [runs = "174", wickets = "3"] = prev.scoreInfo.split("/");
              newScore = `${Number(runs) + 8}/${wickets}`;
            }
          }
        }
        
        if (prev.eventType === "CONCERT") {
          const songNumber = Number(prev.gameClock.replace("Song ", "").split("/")[0]);
          const nextSong = Math.min(15, songNumber + 1);
          newClock = `Song ${nextSong}/15`;
          newScore = nextSong === 8 ? "Intermission" : nextSong > 8 ? "Encore Build" : "Main Set";
          if (newScore === "Intermission") {
            newAisleStatus = "OPEN";
            densityDelta = 6;
          } else if (nextSong >= 13) {
            newAisleStatus = "LOCKED";
          }
        }

        if (prev.eventType === "COMEDY") {
          const currentMinutes = Number(prev.gameClock.split(":")[0]);
          const nextMinutes = Math.max(currentMinutes - 1, 0);
          newClock = `${String(nextMinutes).padStart(2, "0")}:00`;
          newScore = nextMinutes <= 3 ? "Final Bit" : "Headline Set";
          newAisleStatus = nextMinutes <= 3 ? "LOCKED" : "OPEN";
        }

        const newInsights = [...prev.insights];
        if (tickCount.current % 3 === 0) {
          const pos = [`Bottleneck at ${prev.eventType === "IPL" ? "North Stand" : "Main Concourse"}`, `Noise stabilizing`, `Aisle status change`, `Queue Sniper update`];
          const text = pos[Math.floor(Math.random() * pos.length)];
          newInsights.unshift({ id: `i-${tickCount.current}`, text, type: "prediction", timestamp: new Date().toISOString() });
          if (newInsights.length > 5) newInsights.pop();
        }

        return {
          ...prev,
          aisleStatus: newAisleStatus,
          gameClock: newClock,
          scoreInfo: newScore,
          noiseLevel: prev.isMicActive ? prev.noiseLevel : Math.min(118, Math.max(72, +(prev.noiseLevel + (Math.random() - 0.5) * 5).toFixed(1))),
          density: Math.min(94, Math.max(12, prev.density + densityDelta)),
          queues: newQueues,
          insights: newInsights,
        };
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const setEventType = (type: EventType) => {
    document.body.classList.add("theme-transition");
    document.body.setAttribute("data-theme", type);
    setTimeout(() => { document.body.classList.remove("theme-transition"); }, 500);

    let initialScore = "174/3";
    let initialClock = "18.4 Overs";
    let noiseLevel = 104.2;
    let density = 24;
    
    if (type === "CONCERT") {
      initialScore = "Main Set"; initialClock = "Song 1/15"; noiseLevel = 96.8; density = 42;
    } else if (type === "COMEDY") {
      initialScore = "Headline Set"; initialClock = "12:00"; noiseLevel = 82.5; density = 18;
    }

    setState((prev) => ({ ...prev, eventType: type, scoreInfo: initialScore, gameClock: initialClock, aisleStatus: "OPEN", noiseLevel, density }));
  };

  const reportIncident = (type: Incident["type"], location: string) => {
    setState((prev) => ({
      ...prev,
      incidents: [...prev.incidents, { id: `inc-${nextIncidentId.current++}`, type, location, status: "active" }],
      aisleStatus: type !== "spill" ? "LOCKED" : prev.aisleStatus,
    }));
  };

  const resolveIncident = (id: string) => {
    setState((prev) => {
      const updated = prev.incidents.map(i => i.id === id ? { ...i, status: "resolved" as const } : i);
      const remainingCritical = updated.some(i => i.status === "active" && i.type !== "spill");
      return { ...prev, incidents: updated, aisleStatus: remainingCritical ? "LOCKED" : "OPEN" };
    });
  };

  const toggleMic = () => {
    setState(prev => ({ ...prev, isMicActive: !prev.isMicActive }));
  };

  return (
    <EventContext.Provider value={{ state, isReady, setEventType, reportIncident, resolveIncident, toggleMic }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventEngine() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventEngine must be used within an EventProvider");
  }
  return context;
}
