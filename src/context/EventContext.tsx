"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
  gameClock: string; // e.g., "19.2 Overs" or "Set 4/12"
  scoreInfo: string; // e.g., "182/4" or "Acoustic Set"
  queues: QueueItem[];
  incidents: Incident[];
  noiseLevel: number;
  density: number;
  apiHealth: ApiHealth;
  venueIntel: VenueIntel;
  navigation: NavigationIntel;
  insights: AgentInsight[];
}

interface EventContextProps {
  state: EventState;
  setEventType: (type: EventType) => void;
  reportIncident: (type: Incident["type"], location: string) => void;
  resolveIncident: (id: string) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EventState>({
    eventType: "IPL",
    aisleStatus: "OPEN",
    gameClock: "18.4 Overs",
    scoreInfo: "174/3",
    noiseLevel: 104.2,
    density: 24,
    apiHealth: "loading",
    venueIntel: { ...fallbackVenueIntel, status: "loading" },
    navigation: { ...createFallbackNavigationIntel(fallbackVenueIntel.location), status: "loading" },
    queues: [
      { id: "q1", name: "Section 114 Restrooms", category: "restroom", waitTime: 12, trend: "stable" },
      { id: "q2", name: "Main Concourse Beer", category: "concession", waitTime: 25, trend: "rising" },
      { id: "q3", name: "VIP Lounge Bar", category: "concession", waitTime: 4, trend: "falling" }
    ],
    incidents: [],
    insights: [
      { id: "i0", text: "Pulse Agent online. Synchronizing with venue sensors...", type: "action", timestamp: new Date().toISOString() }
    ],
  });

  // Agentic Ticket simulation counter
  const tickCount = React.useRef(0);
  const nextIncidentId = React.useRef(1);
  const venueLatitude = state.venueIntel.location.latitude;
  const venueLongitude = state.venueIntel.location.longitude;

  useEffect(() => {
    let cancelled = false;

    const loadVenueIntel = async () => {
      try {
        const response = await fetch("/api/venue-intel", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Venue intel request failed");
        }

        const venueIntel = (await response.json()) as VenueIntel;
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            apiHealth: venueIntel.status,
            venueIntel,
          }));
        }
      } catch {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            apiHealth: "fallback",
            venueIntel: { ...fallbackVenueIntel, updatedAt: new Date().toISOString() },
          }));
        }
      }
    };

    loadVenueIntel();
    const interval = window.setInterval(loadVenueIntel, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadNavigation = async () => {
      try {
        const params = new URLSearchParams({
          lat: String(venueLatitude),
          lon: String(venueLongitude),
        });
        const response = await fetch(`/api/navigation?${params.toString()}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Navigation request failed");
        }

        const navigation = (await response.json()) as NavigationIntel;
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            navigation,
          }));
        }
      } catch {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            navigation: {
              ...createFallbackNavigationIntel({ latitude: venueLatitude, longitude: venueLongitude }),
              updatedAt: new Date().toISOString(),
            },
          }));
        }
      }
    };

    loadNavigation();

    return () => {
      cancelled = true;
    };
  }, [venueLatitude, venueLongitude]);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        tickCount.current += 1;
        
        // If there's an active medical/security incident, FORCE locked aisles
        const hasCriticalIncident = prev.incidents.some(i => i.status === "active" && i.type !== "spill");
        let newAisleStatus = hasCriticalIncident ? "LOCKED" : prev.aisleStatus;
        
        let newClock = prev.gameClock;
        let newScore = prev.scoreInfo;
        let densityDelta = Math.round((Math.random() - 0.35) * 4);

        // Queue Dynamics Simulation
        const isBreak = prev.gameClock.includes("Break") || prev.scoreInfo === "Intermission";
        const newQueues = prev.queues.map(q => {
          // Lines go up fast during breaks, down during live action
          const shift = isBreak ? Math.floor(Math.random() * 4) : -Math.floor(Math.random() * 3);
          const newWait = Math.max(0, Math.min(45, q.waitTime + shift));
          const newTrend = newWait > q.waitTime ? "rising" : newWait < q.waitTime ? "falling" : "stable";
          return { ...q, waitTime: newWait, trend: newTrend as "rising"|"falling"|"stable" };
        });
        
        if (prev.eventType === "IPL") {
          if (prev.gameClock === "Innings Break") {
            return {
              ...prev,
              noiseLevel: Math.min(118, Math.max(72, +(prev.noiseLevel + (Math.random() - 0.5) * 3).toFixed(1))),
              density: Math.min(94, Math.max(12, prev.density + 1)),
            };
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
          const possiblePredictions = [
            `Bottleneck predicted at ${prev.eventType === "IPL" ? "North Stand" : "Main Concourse"} in 5m.`,
            `Noise levels stabilizing at ${prev.noiseLevel.toFixed(0)}dB. Optimal for accessibility narration.`,
            `Aisle ${prev.aisleStatus === "OPEN" ? "pressure rising" : "lock confirmed"}. Diverting staff paths.`,
            `Queue Sniper detected fall in Section 114. Suggesting fan rerouting.`
          ];
          const text = possiblePredictions[Math.floor(Math.random() * possiblePredictions.length)];
          newInsights.unshift({ id: `i-${tickCount.current}`, text, type: "prediction", timestamp: new Date().toISOString() });
          if (newInsights.length > 5) newInsights.pop();
        }

        return {
          ...prev,
          aisleStatus: newAisleStatus,
          gameClock: newClock,
          scoreInfo: newScore,
          noiseLevel: Math.min(118, Math.max(72, +(prev.noiseLevel + (Math.random() - 0.5) * 5).toFixed(1))),
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
    
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 500);

    let initialScore = "174/3";
    let initialClock = "18.4 Overs";
    let noiseLevel = 104.2;
    let density = 24;
    
    if (type === "CONCERT") {
      initialScore = "Main Set";
      initialClock = "Song 1/15";
      noiseLevel = 96.8;
      density = 42;
    } else if (type === "COMEDY") {
      initialScore = "Headline Set";
      initialClock = "12:00";
      noiseLevel = 82.5;
      density = 18;
    }

    setState((prev) => ({
      ...prev,
      eventType: type,
      scoreInfo: initialScore,
      gameClock: initialClock,
      aisleStatus: "OPEN",
      noiseLevel,
      density,
    }));
  };

  const reportIncident = (type: Incident["type"], location: string) => {
    setState((prev) => ({
      ...prev,
      incidents: [...prev.incidents, { id: `inc-${nextIncidentId.current++}`, type, location, status: "active" }],
      // Immediately lock aisles if critical
      aisleStatus: type !== "spill" ? "LOCKED" : prev.aisleStatus,
    }));
  };

  const resolveIncident = (id: string) => {
    setState((prev) => {
      const updated = prev.incidents.map(i => i.id === id ? { ...i, status: "resolved" as const } : i);
      const remainingCritical = updated.some(i => i.status === "active" && i.type !== "spill");
      return {
        ...prev,
        incidents: updated,
        aisleStatus: remainingCritical ? "LOCKED" : "OPEN"
      };
    });
  };

  return (
    <EventContext.Provider value={{ state, setEventType, reportIncident, resolveIncident }}>
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
