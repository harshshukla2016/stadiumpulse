"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface LandingPageProps {
  onEnter?: () => void;
}

const liveStats = [
  { value: "2.4M", label: "Live Fans", icon: "group" },
  { value: "847", label: "Active Events", icon: "event" },
  { value: "99.2%", label: "Uptime", icon: "check_circle" },
  { value: "<50ms", label: "Latency", icon: "speed" },
];

const features = [
  {
    icon: "analytics",
    title: "Real-Time Analytics",
    description: "Live crowd density mapping with predictive bottleneck detection using advanced ML algorithms.",
    details: ["Heatmap visualization", "Flow prediction", "Anomaly detection"],
  },
  {
    icon: "notifications_active",
    title: "Smart Alerts",
    description: "AI-powered notification system that prioritizes escalations and coordinates emergency response.",
    details: ["Tier-based routing", "Multi-channel", "Auto-escalation"],
  },
  {
    icon: "navigation",
    title: "Spatial Routing",
    description: "Dynamic wayfinding adapts to real-time conditions, directing crowds through optimal paths.",
    details: ["Live rerouting", "Capacity caps", "Exit planning"],
  },
  {
    icon: "groups",
    title: "Staff Coordination",
    description: "Unified command center for security, medical, and vendor teams with real-time positioning.",
    details: ["Team tracking", "Task dispatch", "Status sync"],
  },
  {
    icon: "restaurant",
    title: "Vendor Intelligence",
    description: "Predictive demand forecasting for concessions with automated restocking alerts.",
    details: ["Sales patterns", "Inventory sync", "Peak prediction"],
  },
  {
    icon: "local_taxi",
    title: "Transport Integration",
    description: "Seamless rideshare and transit coordination with departure windows.",
    details: ["API integration", "Surge detection", "Pickup routing"],
  },
];

const techStack = [
  "Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript", "Real-time WebSocket", "ML Pipeline"
];

const timeline = [
  { step: "01", title: "Data Ingestion", description: "Cameras, sensors, and mobile signals feed live crowd data" },
  { step: "02", title: "ML Processing", description: "Neural networks analyze density, flow, and anomaly patterns" },
  { step: "03", title: "Action Engine", description: "AI generates optimal routing and alert recommendations" },
  { step: "04", title: "Feedback Loop", description: "Real-world outcomes refine prediction accuracy" },
];

export default function LandingPage({ onEnter }: LandingPageProps) {
  const router = useRouter();
  const [demoState, setDemoState] = useState({ 
    activeFans: 24520, 
    crowdLevel: "Normal",
    avgWait: "3.2m",
    incidents: 0
  });

  const [isVisible, setIsVisible] = useState({ 
    hero: false, 
    stats: false, 
    features: false, 
    timeline: false, 
    tech: false,
    creator: false,
    cta: false 
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleEnter = () => {
    if (onEnter) {
      onEnter();
    } else {
      router.push("/dashboard");
    }
  };

  const goToCreator = () => {
    window.open("https://harsh-kumar-shukla-portfolio.vercel.app/", "_blank");
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(v => ({ ...v, hero: true })), 200);
    const timer2 = setTimeout(() => setIsVisible(v => ({ ...v, stats: true })), 600);
    const timer3 = setTimeout(() => setIsVisible(v => ({ ...v, features: true })), 1000);
    const timer4 = setTimeout(() => setIsVisible(v => ({ ...v, timeline: true })), 1300);
    const timer5 = setTimeout(() => setIsVisible(v => ({ ...v, tech: true })), 1600);
    const timer6 = setTimeout(() => setIsVisible(v => ({ ...v, creator: true })), 1900);
    const timer7 = setTimeout(() => setIsVisible(v => ({ ...v, cta: true })), 2200);

    const demoInterval = setInterval(() => {
      setDemoState(prev => ({
        activeFans: prev.activeFans + Math.floor(Math.random() * 200 - 100),
        crowdLevel: Math.random() > 0.7 ? "Moderate" : "Normal",
        avgWait: Math.random() > 0.5 ? "3.2m" : "2.8m",
        incidents: Math.random() > 0.8 ? 1 : 0
      }));
    }, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 8, 
        y: (e.clientY / window.innerHeight - 0.5) * 8 
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearInterval(demoInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-on-surface">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full items-center justify-between border-b border-white/5 bg-background/80 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined text-primary text-2xl">hub</span>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-secondary animate-pulse" />
          </div>
          <div>
            <span className="block truncate text-base font-black uppercase tracking-tight text-on-surface">
              StadiumPulse
            </span>
            <span className="text-[10px] uppercase tracking-widest text-primary/60">
              Kinetic Horizon
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="hidden text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary sm:block">
            Features
          </a>
          <a href="#creator" className="hidden text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary sm:block">
            Creator
          </a>
          <button
            onClick={handleEnter}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-on-primary transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            Open App
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen pt-20">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Stadium aerial view"
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src="https://images.unsplash.com/photo-1459867813278-8d57b21e9fc7?auto=format&fit=crop&w=2400&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-tertiary/5" />
          </div>
          
          <div className="relative z-10 mx-auto grid min-h-[85vh] w-full max-w-7xl items-center gap-12 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className={`transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                    Live
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-on-surface/40">
                  Powered by Next.js 16
                </span>
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight text-on-surface sm:text-6xl lg:text-7xl">
                Orchestrate <span className="text-primary">chaos</span> with
                <br />
                <span className="text-primary">precision</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-on-surface-variant">
                Real-time crowd dynamics, predictive analytics, and autonomous response 
                for high-density venues. From IPL matches to global concerts.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleEnter}
                  className="group flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-4 text-sm font-black uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40"
                >
                  Launch Dashboard
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
                <a
                  href="#features"
                  className="flex items-center gap-3 rounded-lg border border-white/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-on-surface transition-all hover:border-primary/50"
                >
                  Explore Features
                </a>
              </div>
            </div>

            <div 
              className={`relative hidden aspect-square overflow-hidden rounded-2xl border border-white/10 bg-surface-container-low/80 shadow-2xl lg:block transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transform: `perspective(1200px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.3}deg)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-background" />
              <div className="absolute inset-0 flex flex-col p-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary">Live Command</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface/40">IPL Final 2026</span>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-surface-container-high/50 p-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface/40">Active Fans</span>
                    <p className="mt-1 text-2xl font-black text-secondary">
                      {demoState.activeFans.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg bg-surface-container-high/50 p-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface/40">Crowd Level</span>
                    <p className="mt-1 text-2xl font-black text-tertiary">{demoState.crowdLevel}</p>
                  </div>
                  <div className="rounded-lg bg-surface-container-high/50 p-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface/40">Avg Wait</span>
                    <p className="mt-1 text-2xl font-black text-primary">{demoState.avgWait}</p>
                  </div>
                  <div className="rounded-lg bg-surface-container-high/50 p-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface/40">Incidents</span>
                    <p className="mt-1 text-2xl font-black text-error">{demoState.incidents}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-[10px] text-on-surface/40">
                    <span>North Gate: 78%</span>
                    <span>South Gate: 65%</span>
                    <span>West VIP: 42%</span>
                    <span>East Concourse: 89%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-surface-container-high">
                    <div className="flex h-full rounded-full overflow-hidden">
                      <div className="w-[35%] bg-secondary" />
                      <div className="w-[25%] bg-primary" />
                      <div className="w-[20%] bg-tertiary" />
                      <div className="w-[20%] bg-error" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats */}
        <section className="border-y border-white/5 bg-surface-container-lowest py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
            {liveStats.map((stat, i) => (
              <div 
                key={stat.label}
                className={`text-center transition-all duration-700 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-center">
                  <span className="material-symbols-outlined text-2xl text-primary/60">{stat.icon}</span>
                </div>
                <p className="mt-3 text-3xl font-black text-secondary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`mb-16 max-w-2xl transition-all duration-700 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Platform</span>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-on-surface sm:text-5xl">
                Everything you need to run venues at scale
              </h2>
              <p className="mt-6 text-base text-on-surface-variant">
                Built for the demands of modern high-density events. Real-time intelligence 
                that adapts to every situation.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <div 
                  key={feature.title}
                  className={`group rounded-xl border border-white/5 bg-surface-container-low p-6 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <span className="material-symbols-outlined text-2xl text-primary group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-black text-on-surface group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {feature.details.map(detail => (
                      <span key={detail} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-on-surface/60">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-surface-container-low py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`mb-16 transition-all duration-700 ${isVisible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Architecture</span>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-on-surface">
                From signal to action in milliseconds
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {timeline.map((item, i) => (
                <div 
                  key={item.step}
                  className={`relative transition-all duration-700 ${isVisible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-xl font-black text-on-primary">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-black text-on-surface">{item.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{item.description}</p>
                  {i < timeline.length - 1 && (
                    <div className="absolute -right-3 top-12 hidden text-primary/30 lg:block">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16">
          <div className={`mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 transition-all duration-700 ${isVisible.tech ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface/40">
              Built with
            </span>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {techStack.map((tech) => (
                <span 
                  key={tech}
                  className="rounded-lg border border-white/10 bg-surface-container-high px-4 py-2 text-sm font-bold text-on-surface-variant"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section id="creator" className="border-t border-white/5 bg-surface-container-lowest py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid items-center gap-12 lg:grid-cols-2 transition-all duration-700 ${isVisible.creator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-surface-container-high lg:aspect-[4/3]">
                <Image
                  alt="Creator profile"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-2xl font-black text-white">Harsh Kumar Shukla</p>
                  <p className="text-sm text-white/80">SAP SD Consultant & Developer</p>
                </div>
              </div>
              
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Creator</span>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-on-surface">
                  Built by a passion for solving complex problems
                </h2>
                <p className="mt-6 text-base leading-7 text-on-surface-variant">
                  StadiumPulse is a demonstration of integrating real-time data processing, 
                  predictive analytics, and autonomous response systems into a seamless user experience.
                </p>
                <p className="mt-4 text-base leading-7 text-on-surface-variant">
                  The creator brings expertise in enterprise systems and modern web technologies 
                  to build solutions that scale.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={goToCreator}
                    className="flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/20"
                  >
                    View Full Profile
                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                  </button>
                  <a
                    href="https://github.com/harshshukla2016/stadiumpulse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-black uppercase tracking-widest text-on-surface-variant transition-all hover:border-white/30"
                  >
                    <span className="material-symbols-outlined text-lg">code</span>
                    View Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className={`mx-auto max-w-3xl px-4 text-center transition-all duration-700 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl font-black uppercase tracking-tight text-on-surface sm:text-5xl">
              Ready to transform your venue?
            </h2>
            <p className="mt-6 text-base text-on-surface-variant">
              Launch the dashboard to experience real-time crowd intelligence in action.
            </p>
            <button
              onClick={handleEnter}
              className="group mt-8 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-primary to-primary-container px-8 py-5 text-base font-black uppercase tracking-widest text-on-primary-fixed shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
            >
              Launch Dashboard
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                rocket_launch
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-surface-container-lowest px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">hub</span>
            <div>
              <span className="block text-sm font-black uppercase text-on-surface">StadiumPulse</span>
              <span className="text-[10px] uppercase tracking-widest text-on-surface/40">Kinetic Horizon</span>
            </div>
          </div>
          <p className="text-xs uppercase tracking-widest text-on-surface/40">
            © 2026 StadiumPulse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}