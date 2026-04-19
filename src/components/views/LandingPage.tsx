"use client";

import Image from "next/image";
import React from "react";

interface LandingPageProps {
  onEnter: () => void;
}

const metrics = [
  { value: "98%", label: "flow accuracy" },
  { value: "4.2ms", label: "signal latency" },
  { value: "12M+", label: "fans routed" },
  { value: "350", label: "active venues" },
];

const features = [
  {
    icon: "monitoring",
    title: "Pulse Architecture",
    text: "Live heatmaps flag aisle pressure, concourse surges, and seating-bowl movement before bottlenecks build.",
    tone: "text-secondary",
  },
  {
    icon: "campaign",
    title: "Echo Logistics",
    text: "Event-aware alerts coordinate crowd messages with gates, rideshare zones, security, and local transport teams.",
    tone: "text-primary",
  },
  {
    icon: "storefront",
    title: "Fan Hub",
    text: "A controlled fan-to-fan layer keeps urgent venue requests visible without overwhelming operations staff.",
    tone: "text-tertiary",
  },
];

const timeline = [
  "Detect live crowd and sound patterns",
  "Prioritize routes, exits, and alerts",
  "Sync fans, staff, vendors, and rideshare",
];

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-on-surface">
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/5 bg-background/75 px-4 py-4 shadow-2xl backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="material-symbols-outlined text-primary" aria-hidden="true">
            hub
          </span>
          <span className="truncate text-lg font-black uppercase tracking-tight text-on-surface sm:text-xl">
            StadiumPulse
          </span>
        </div>
        <button
          onClick={onEnter}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-on-primary transition-transform active:scale-95 sm:px-5"
        >
          Open App
        </button>
      </header>

      <main>
        <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface-container-high/70 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Live system operational
              </span>
            </div>

            <h1 className="max-w-[12ch] text-5xl font-black uppercase leading-[0.95] tracking-tight text-on-surface sm:text-6xl lg:text-7xl">
              Run the venue in real time.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-on-surface-variant sm:text-lg">
              StadiumPulse turns live crowd density, sound patterns, fan requests, and exit timing into one control surface for high-density events.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onEnter}
                className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-6 py-4 text-sm font-black uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary/20 transition-transform active:scale-95"
              >
                Enter the Pulse
              </button>
              <button
                onClick={onEnter}
                className="rounded-lg border border-outline-variant/50 px-6 py-4 text-sm font-black uppercase tracking-widest text-primary transition-colors hover:bg-white/5"
              >
                View Live Demo
              </button>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-surface-container-low shadow-2xl lg:min-h-[620px]">
            <Image
              alt="Night stadium crowd under event lights"
              className="object-cover opacity-55"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
              <div className="glass-card rounded-lg p-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">North Gate</span>
                <p className="mt-2 text-3xl font-black text-secondary">Flowing</p>
                <p className="mt-1 text-xs text-on-surface-variant">Recommended for rideshare and metro access.</p>
              </div>
              <div className="glass-card rounded-lg p-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">Main Bowl</span>
                <p className="mt-2 text-3xl font-black">74%</p>
                <p className="mt-1 text-xs text-on-surface-variant">Density rising near sections 108-116.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-surface-container-lowest px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 text-center lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-white/5 bg-surface-container-low p-5">
                <p className="text-3xl font-black text-secondary sm:text-4xl">{metric.value}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {features.map((feature) => (
            <article key={feature.title} className="glass-card rounded-lg p-6">
              <span className={`material-symbols-outlined mb-5 block text-4xl ${feature.tone}`} aria-hidden="true">
                {feature.icon}
              </span>
              <h2 className="text-2xl font-black tracking-tight">{feature.title}</h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">{feature.text}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Operations loop</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight">From signal to route in seconds.</h2>
          </div>
          <div className="grid gap-3">
            {timeline.map((item, index) => (
              <div key={item} className="glass-card flex items-center gap-4 rounded-lg p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-black text-on-primary">
                  {index + 1}
                </span>
                <p className="text-sm font-bold text-on-surface-variant sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="relative h-72 overflow-hidden rounded-lg border border-white/10 bg-surface-container-low sm:h-96">
            <Image
              alt="Crowd operations dashboard on tablets"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              src="https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=1600&q=80"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Command center</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Built for phones on the floor and screens in control rooms.</h2>
            <p className="mt-5 text-sm leading-7 text-on-surface-variant">
              The same views adapt for mobile operators, vendor leads, transport partners, and desktop monitors without hiding the live context.
            </p>
            <button
              onClick={onEnter}
              className="mt-7 rounded-lg bg-secondary px-6 py-4 text-sm font-black uppercase tracking-widest text-on-secondary transition-transform active:scale-95"
            >
              Start Deployment
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-surface-container-lowest px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
              hub
            </span>
            <span className="text-lg font-black uppercase tracking-tight">StadiumPulse</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-on-surface/40">
            © 2026 StadiumPulse. Kinetic Horizon Logistics.
          </p>
        </div>
      </footer>
    </div>
  );
}
