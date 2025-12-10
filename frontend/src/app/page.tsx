import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Brain, Clock, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white">
      {/* Abstract Background Gradient */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[128px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span>Apotheca AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#roadmap" className="hover:text-white transition-colors">Roadmap</Link>
          <Link href="#technology" className="hover:text-white transition-colors">Technology</Link>
        </div>
        <Link
          href="/portal"
          className="group flex items-center gap-2 text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-all"
        >
          Doctor Portal
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-8 text-blue-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Reinventing Healthcare Logistics
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Autonomous Pharmacy & <br /> AI Diagnosis System
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Eliminating inefficiencies. Reducing costs. Saving lives.
            <strong className="text-white block mt-2">From Doctor straight to Patient's Doorstep.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]">
              View the Vision
            </button>
            <button className="h-12 px-8 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-semibold transition-all">
              Contact Sales
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Truck className="w-6 h-6 text-blue-400" />}
              title="Autonomous Logistics"
              description="End-to-end automated supply chain delivering medication directly to patients via drones and smart couriers."
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6 text-purple-400" />}
              title="AI Diagnosis (A.I.D.A)"
              description="Advanced diagnostic models assisting doctors with practitioner-level accuracy for primary care."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
              title="Zero-Error Safety"
              description="Automated prescription verification and blockchain-backed audit trails for 100% reliability."
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="24/7" label="Operation Time" />
            <StatItem value="99.9%" label="Accuracy Rate" />
            <StatItem value="-40%" label="Cost Reduction" />
            <StatItem value="<1h" label="Delivery Time" />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 mt-32 bg-black py-12 px-6 text-center text-zinc-500 text-sm">
        <p>© 2025 Apotheca AI (MediFlow). All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all hover:bg-zinc-900 group">
      <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</div>
      <div className="text-zinc-500 font-medium uppercase tracking-wider text-xs">{label}</div>
    </div>
  );
}
