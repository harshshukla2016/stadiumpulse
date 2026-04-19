"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type EventType = "IPL" | "CONCERT" | "COMEDY";
export type AisleStatus = "OPEN" | "LOCKED";

interface EventState {
  eventType: EventType;
  aisleStatus: AisleStatus;
  gameClock: string; // e.g., "19.2 Overs" or "Set 4/12"
  scoreInfo: string; // e.g., "182/4" or "Acoustic Set"
  noiseLevel: number; // dB
  density: number; // percentage
  agenticAction: {
    active: boolean;
    message: string;
    discount: number;
  };
}

interface EventContextProps {
  state: EventState;
  setEventType: (type: EventType) => void;
  toggleAisleStatus: () => void;
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
    agenticAction: {
      active: false,
      message: "",
      discount: 0,
    },
  });

  // Agentic Ticket simulation counter
  const tickCount = React.useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        tickCount.current += 1;
        
        let newAisleStatus = prev.aisleStatus;
        let newClock = prev.gameClock;
        let newScore = prev.scoreInfo;
        let densityDelta = Math.round((Math.random() - 0.35) * 4);
        let newAgenticAction = { ...prev.agenticAction };

        // Agentic Friction Resolution Simulation
        // Simulates detecting "Late Food Delivery" and auto-granting a discount
        if (tickCount.current % 6 === 0 && !prev.agenticAction.active) {
          newAgenticAction = {
            active: true,
            message: "High wait time detected at Vendor 4. Auto-resolving friction.",
            discount: 15, // 15% discount
          };
        } else if (tickCount.current % 6 === 2 && prev.agenticAction.active) {
          // Clear it after a while
          newAgenticAction = { active: false, message: "", discount: 0 };
        }
        
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

        return {
          ...prev,
          aisleStatus: newAisleStatus,
          gameClock: newClock,
          scoreInfo: newScore,
          noiseLevel: Math.min(118, Math.max(72, +(prev.noiseLevel + (Math.random() - 0.5) * 5).toFixed(1))),
          density: Math.min(94, Math.max(12, prev.density + densityDelta)),
          agenticAction: newAgenticAction,
        };
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const setEventType = (type: EventType) => {
    document.body.setAttribute("data-theme", type);
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

  const toggleAisleStatus = () => {
    setState((prev) => ({
      ...prev,
      aisleStatus: prev.aisleStatus === "OPEN" ? "LOCKED" : "OPEN",
    }));
  };

  return (
    <EventContext.Provider value={{ state, setEventType, toggleAisleStatus }}>
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
