"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav, { ViewType } from "@/components/BottomNav";
import PulseView from "@/components/views/PulseView";
import EchoFeed from "@/components/views/EchoFeed";
import HubMarket from "@/components/views/HubMarket";
import EcoDashboard from "@/components/views/EcoDashboard";
import LandingPage from "@/components/views/LandingPage";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>("pulse");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayView, setDisplayView] = useState<ViewType>("pulse");

  const handleViewChange = (newView: ViewType) => {
    if (newView === activeView) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayView(newView);
      setActiveView(newView);
      setIsTransitioning(false);
    }, 150);
  };

  useEffect(() => {
    document.body.classList.add("theme-transition");
    return () => document.body.classList.remove("theme-transition");
  }, []);

  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  const renderView = () => {
    switch (displayView) {
      case "pulse":
        return <PulseView />;
      case "echo":
        return <EchoFeed />;
      case "hub":
        return <HubMarket />;
      case "eco":
        return <EcoDashboard />;
      default:
        return <PulseView />;
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden px-4 pb-36 pt-24 sm:px-6 lg:px-8">
        <div 
          key={displayView}
          className={`view-enter transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          {renderView()}
        </div>
      </main>
      <BottomNav activeView={activeView} setActiveView={handleViewChange} />
    </>
  );
}
