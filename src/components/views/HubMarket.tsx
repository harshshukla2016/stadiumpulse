"use client";

import { useEventEngine } from "@/context/EventContext";
import { useId, useMemo, useRef, useState, useEffect } from "react";

const BASE_TIME = 1700000000000;

type HubRequest = {
  id: string;
  user: string;
  info: string;
  title: string;
  urgent: boolean;
  status: "open" | "claimed";
  timestamp: number;
};

export default function HubMarket() {
  const { state } = useEventEngine();
  const postInputId = useId();
  const nextRequestId = useRef(4);
  const [activeTab, setActiveTab] = useState<"active" | "mine">("active");
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentTime, setCurrentTime] = useState<number>(BASE_TIME);
  const [justPosted, setJustPosted] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const initialRequests: HubRequest[] = [
    { id: "1", user: "Alex T.", info: "Sec 114, Row J", title: "2x Cold Beverages", urgent: true, status: "open", timestamp: currentTime - 60000 },
    { id: "2", user: "Sarah M.", info: "Sec 208, Row B", title: "Team Scarf", urgent: false, status: "open", timestamp: currentTime - 120000 },
    { id: "3", user: "David C.", info: "VIP Lounge", title: "Battery Pack", urgent: false, status: "open", timestamp: currentTime - 180000 },
  ];

  const [requests, setRequests] = useState<HubRequest[]>(initialRequests);

  const visibleRequests = useMemo(
    () => requests.filter((request) => activeTab === "mine" || request.status === "open"),
    [activeTab, requests],
  );

  const myRequests = useMemo(
    () => requests.filter((request) => request.user === "You"),
    [requests],
  );

  const fulfillRequest = (id: string) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status: "claimed" } : request,
      ),
    );
  };

  const addRequest = () => {
    const cleanTitle = postTitle.trim();
    if (!cleanTitle) return;

    const newRequest: HubRequest = {
      id: `fan-request-${nextRequestId.current++}`,
      user: "You",
      info: selectedLocation || (state.eventType === "CONCERT" ? "Floor B" : "Sec 101, Row C"),
      title: cleanTitle,
      urgent: state.aisleStatus === "LOCKED",
      status: "open",
      timestamp: currentTime,
    };

    setRequests((current) => [newRequest, ...current]);
    setPostTitle("");
    setSelectedLocation("");
    setShowModal(false);
    setActiveTab("mine");
    setJustPosted(newRequest.id);
    setTimeout(() => setJustPosted(null), 3000);
  };

  const formatTime = (timestamp: number) => {
    const diff = currentTime - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  const locationOptions = state.eventType === "CONCERT" 
    ? ["Floor A", "Floor B", "Sec 101", "Sec 102", "VIP"]
    : state.eventType === "COMEDY"
    ? ["Front Row", "Middle Section", "Back Section"]
    : ["Sec 101-110", "Sec 111-120", "Sec 201-210", "VIP Lounge"];

  return (
    <div className="flex-1 space-y-6 overflow-y-auto">
      <div className="flex flex-col">
        <span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
          Fan-to-Fan Marketplace
        </span>
        <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">Fan Hub</h2>
      </div>

      <div className="flex gap-2 rounded-lg border border-white/5 bg-surface-container p-1">
        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 rounded-lg py-2.5 text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${activeTab === "active" ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "text-on-surface/50 hover:text-on-surface hover:bg-white/5"}`}
          aria-pressed={activeTab === "active"}
        >
          Active ({requests.filter(r => r.status === "open").length})
        </button>
        <button
          onClick={() => setActiveTab("mine")}
          className={`flex-1 rounded-lg py-2.5 text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${activeTab === "mine" ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "text-on-surface/50 hover:text-on-surface hover:bg-white/5"}`}
          aria-pressed={activeTab === "mine"}
        >
          My Posts ({myRequests.length})
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleRequests.map((req, i) => (
          <div 
            key={req.id} 
            className={`glass-card group relative rounded-lg border border-white/5 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 ${
              req.urgent ? 'border-secondary/40 bg-secondary/5' : ''
            } ${justPosted === req.id ? 'ring-2 ring-secondary ring-offset-2 ring-offset-background animate-pulse' : ''}`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {req.urgent && (
              <div className="absolute -top-2 -right-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-background shadow-lg shadow-secondary/30 animate-pulse">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-primary/60" aria-hidden="true">person</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold">{req.user}</h4>
                  <p className="text-[10px] text-primary uppercase font-black tracking-widest leading-none mt-1">{req.info}</p>
                  <p className="text-[8px] text-on-surface/40 mt-1">{formatTime(req.timestamp)}</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-on-surface mb-4 group-hover:text-primary transition-colors">{req.title}</h3>

            <button
              onClick={() => fulfillRequest(req.id)}
              disabled={req.status === "claimed"}
              className={`w-full rounded-lg border py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                req.status === "claimed" 
                  ? "border-secondary/20 text-secondary bg-secondary/5 cursor-default" 
                  : "border-primary/30 text-primary hover:bg-primary hover:text-on-primary hover:shadow-lg hover:shadow-primary/20"
              }`}
            >
              {req.status === "claimed" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Claimed
                </span>
              ) : "Fulfill Request"}
            </button>
          </div>
        ))}
        {visibleRequests.length === 0 && (
          <div className="glass-card rounded-lg p-8 text-center text-sm text-on-surface/60 md:col-span-2 xl:col-span-3">
            <span className="material-symbols-outlined text-4xl text-primary/30 mb-3 block mx-auto">sentiment_satisfied</span>
            <p className="font-bold mb-1">
              {activeTab === "mine" ? "No posts yet" : "No open requests"}
            </p>
            <p className="text-xs text-on-surface/40">
              {activeTab === "mine" ? "Time to enjoy the show!" : "All fans are happy!"}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-primary to-primary-container py-4 font-black text-on-primary shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
      >
        <span className="material-symbols-outlined text-lg" aria-hidden="true">add</span>
        <span className="uppercase tracking-widest text-xs">Post New Request</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full sm:max-w-md glass-card rounded-t-2xl sm:rounded-2xl border-t border-white/10 border-white/5 p-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight">New Request</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-primary mb-2" htmlFor={postInputId}>
                  What do you need?
                </label>
                <input
                  id={postInputId}
                  value={postTitle}
                  onChange={(event) => setPostTitle(event.target.value)}
                  placeholder="e.g., 2x Cold Drinks, Team Jersey..."
                  autoFocus
                  className="w-full rounded-lg border border-white/10 bg-surface-container-high px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-primary mb-2">
                  Your Location
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {locationOptions.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                        selectedLocation === loc 
                          ? 'bg-primary text-on-primary' 
                          : 'bg-surface-container-high text-on-surface/60 hover:bg-white/10'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {state.aisleStatus === "LOCKED" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20">
                  <span className="material-symbols-outlined text-error text-sm">info</span>
                  <p className="text-[10px] font-bold text-error uppercase">Aisles locked - your request will be marked urgent</p>
                </div>
              )}
            </div>

            <button
              onClick={addRequest}
              disabled={!postTitle.trim()}
              className="w-full mt-6 rounded-lg bg-secondary py-4 text-xs font-black uppercase tracking-widest text-on-secondary transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/90"
            >
              Publish Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}