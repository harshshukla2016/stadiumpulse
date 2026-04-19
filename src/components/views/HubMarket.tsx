"use client";

import { useEventEngine } from "@/context/EventContext";
import { useId, useMemo, useRef, useState } from "react";

type HubRequest = {
  id: string;
  user: string;
  info: string;
  title: string;
  urgent: boolean;
  status: "open" | "claimed";
};

export default function HubMarket() {
  const { state } = useEventEngine();
  const postInputId = useId();
  const nextRequestId = useRef(4);
  const [activeTab, setActiveTab] = useState<"active" | "mine">("active");
  const [isPosting, setIsPosting] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [requests, setRequests] = useState<HubRequest[]>([
    { id: "1", user: "Alex T.", info: "Sec 114, Row J", title: "2x Cold Beverages", urgent: true, status: "open" },
    { id: "2", user: "Sarah M.", info: "Sec 208, Row B", title: "Team Scarf", urgent: false, status: "open" },
    { id: "3", user: "David C.", info: "VIP Lounge", title: "Battery Pack", urgent: false, status: "open" },
  ]);

  const visibleRequests = useMemo(
    () => requests.filter((request) => activeTab === "mine" || request.status === "open"),
    [activeTab, requests],
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
    if (!cleanTitle) {
      return;
    }

    setRequests((current) => [
      {
        id: `fan-request-${nextRequestId.current++}`,
        user: "You",
        info: state.eventType === "CONCERT" ? "Floor B" : "Sec 101, Row C",
        title: cleanTitle,
        urgent: state.aisleStatus === "LOCKED",
        status: "open",
      },
      ...current,
    ]);
    setPostTitle("");
    setIsPosting(false);
    setActiveTab("mine");
  };

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
          className={`flex-1 rounded-lg py-2 text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === "active" ? "bg-primary text-on-primary shadow-lg" : "text-on-surface/50 hover:text-on-surface"}`}
          aria-pressed={activeTab === "active"}
        >
          Active Requests
        </button>
        <button
          onClick={() => setActiveTab("mine")}
          className={`flex-1 rounded-lg py-2 text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === "mine" ? "bg-primary text-on-primary shadow-lg" : "text-on-surface/50 hover:text-on-surface"}`}
          aria-pressed={activeTab === "mine"}
        >
          My Posts
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleRequests.map((req) => (
          <div key={req.id} className="glass-card group rounded-lg border border-white/5 p-5 transition-all hover:border-primary/30">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high">
                  <span className="material-symbols-outlined text-primary/60" aria-hidden="true">person</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold">{req.user}</h4>
                  <p className="text-[10px] text-primary uppercase font-black tracking-widest leading-none mt-1">{req.info}</p>
                </div>
              </div>
              {req.urgent && (
                <span className="text-[8px] bg-secondary/10 text-secondary px-2 py-0.5 rounded font-black uppercase tracking-widest border border-secondary/20">
                  Urgent
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-on-surface mb-4">{req.title}</h3>

            <button
              onClick={() => fulfillRequest(req.id)}
              disabled={req.status === "claimed"}
              className="w-full rounded-lg border border-primary/20 py-3 text-xs font-bold uppercase tracking-widest text-primary transition-all duration-200 hover:bg-primary hover:text-on-primary active:scale-95 disabled:border-secondary/20 disabled:text-secondary disabled:hover:bg-transparent"
            >
              {req.status === "claimed" ? "Claimed by you" : "Fulfill Request"}
            </button>
          </div>
        ))}
        {visibleRequests.length === 0 && (
          <div className="glass-card rounded-lg p-6 text-center text-sm text-on-surface/60 md:col-span-2 xl:col-span-3">
            No open requests right now.
          </div>
        )}
      </div>

      {isPosting && (
        <div className="glass-card space-y-3 rounded-lg p-4">
          <label className="block text-[9px] font-black uppercase tracking-widest text-primary" htmlFor={postInputId}>
            New request
          </label>
          <input
            id={postInputId}
            value={postTitle}
            onChange={(event) => setPostTitle(event.target.value)}
            placeholder="What do you need?"
            className="w-full rounded-lg border border-white/10 bg-surface-container-high px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={addRequest}
            className="w-full rounded-lg bg-secondary py-3 text-xs font-black uppercase tracking-widest text-on-secondary transition-all active:scale-95"
          >
            Publish Request
          </button>
        </div>
      )}

      <button
        onClick={() => setIsPosting((current) => !current)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-primary to-primary-container py-4 font-black text-on-primary shadow-xl shadow-primary/20 transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-lg" aria-hidden="true">{isPosting ? "close" : "add"}</span>
        <span className="uppercase tracking-widest text-xs">{isPosting ? "Close Request" : "Post Request"}</span>
      </button>
    </div>
  );
}
