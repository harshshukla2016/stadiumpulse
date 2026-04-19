"use client";

import { useState } from "react";
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

  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  const renderView = () => {
    switch (activeView) {
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
        {renderView()}
      </main>
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </>
  );
}
