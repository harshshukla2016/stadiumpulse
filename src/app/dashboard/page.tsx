"use client";

import { useState } from "react";
import BottomNav, { ViewType } from "@/components/BottomNav";
import EcoDashboard from "@/components/views/EcoDashboard";
import EchoFeed from "@/components/views/EchoFeed";
import Header from "@/components/Header";
import HubMarket from "@/components/views/HubMarket";
import PulseView from "@/components/views/PulseView";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ViewType>("pulse");

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden px-4 pb-36 pt-24 sm:px-6 lg:px-8">
        {activeView === "pulse" && <PulseView />}
        {activeView === "echo" && <EchoFeed />}
        {activeView === "hub" && <HubMarket />}
        {activeView === "eco" && <EcoDashboard />}
      </main>
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </>
  );
}
