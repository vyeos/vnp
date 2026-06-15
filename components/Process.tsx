"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  Compass,
  type LucideIcon,
  Route,
  Target,
  Trophy,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  n: string;
  title: string;
  desc: string;
  img: string;
  icon: LucideIcon;
  outcome: string;
  points: string[];
  // tone — each step is its own colored "world"
  card: string; // surface bg + base text + ring
  chip: string; // icon chip / step accent
  tick: string; // checklist tick circle
  badge: string; // floating outcome pill
};

const steps: Step[] = [
  {
    n: "01",
    title: "Discover",
    desc: "We map your strengths, experience, and goals so the next move is obvious instead of overwhelming.",
    img: "/process-1.png",
    icon: Compass,
    outcome: "A clear direction",
    points: [
      "Strengths and work-style profile",
      "Target roles and industries shortlisted",
      "An honest skill-gap read",
    ],
    card: "bg-blue-100 text-ink ring-1 ring-inset ring-blue/10",
    chip: "bg-blue text-white",
    tick: "bg-blue text-white",
    badge: "bg-blue text-white",
  },
  {
    n: "02",
    title: "Plan",
    desc: "A roadmap with real milestones for applications, skills, and outreach that you can actually keep up with.",
    img: "/process-2.png",
    icon: Route,
    outcome: "A real roadmap",
    points: [
      "Weekly priorities and milestones",
      "Application and outreach targets",
      "A learning plan that fits your time",
    ],
    card: "bg-navy text-white ring-1 ring-inset ring-white/10",
    chip: "bg-yellow text-ink",
    tick: "bg-yellow text-ink",
    badge: "bg-yellow text-ink",
  },
  {
    n: "03",
    title: "Prepare",
    desc: "Sharpen the skills that matter and rehearse interviews until the answers feel like yours, not a script.",
    img: "/process-3.png",
    icon: Target,
    outcome: "Interview-ready",
    points: [
      "Mock interviews with real feedback",
      "Sharper STAR stories",
      "Resume and LinkedIn polish",
    ],
    card: "bg-blue text-white ring-1 ring-inset ring-white/15",
    chip: "bg-white text-blue",
    tick: "bg-white text-blue",
    badge: "bg-yellow text-ink",
  },
  {
    n: "04",
    title: "Placed",
    desc: "Land the offer, negotiate with confidence, and start the new role on solid footing from day one.",
    img: "/process-4.png",
    icon: Trophy,
    outcome: "Offer signed",
    points: [
      "Offer review and negotiation",
      "A clear start and onboarding plan",
      "90-day check-ins after you land",
    ],
    card: "bg-secondary text-ink ring-1 ring-inset ring-ink/10",
    chip: "bg-ink text-yellow",
    tick: "bg-ink text-yellow",
    badge: "bg-navy text-white",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.93,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-ink md:text-6xl">
          How it works
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Four steps from where you are now to the offer you want. No fluff,
          just momentum.
        </p>
      </div>

      <div ref={ref} className="relative">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const last = i === steps.length - 1;
          return (
            <div
              key={s.n}
              className="stack-card sticky top-20 flex min-h-[78vh] items-center md:min-h-[80vh]"
            >
              <div
                className={`group relative grid w-full items-center gap-8 overflow-hidden rounded-[2rem] p-7 shadow-lg md:grid-cols-2 md:gap-12 md:p-12 lg:p-16 ${s.card}`}
              >
                {/* oversized ghost numeral bleeding off the corner */}
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute -bottom-14 -right-3 select-none text-[11rem] font-black leading-none tracking-tighter opacity-[0.07] md:-bottom-24 md:-right-6 md:text-[20rem]"
                >
                  {s.n}
                </span>

                {/* left: copy */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${s.chip}`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span className="font-mono text-sm font-medium opacity-70">
                        Step {s.n}
                      </span>
                    </div>
                    {/* progress rail */}
                    <div className="flex items-center gap-1.5">
                      {steps.map((p, j) => (
                        <span
                          key={p.n}
                          className={`h-1.5 rounded-full bg-current transition-all ${
                            j <= i ? "w-7 opacity-90" : "w-3 opacity-25"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-display mt-6 text-5xl font-bold tracking-tight md:text-7xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed opacity-80">
                    {s.desc}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-3 text-base font-medium"
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${s.tick}`}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  {last && (
                    <Link
                      href="/contact"
                      className="group/cta mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      Book a session
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </Link>
                  )}
                </div>

                {/* right: framed image that pops off the colored world */}
                <div className="relative z-10">
                  <div
                    className={`relative rounded-[1.85rem] bg-white p-3 shadow-xl ring-1 ring-black/5 transition-transform duration-500 md:p-4 ${
                      i % 2 === 0 ? "md:-rotate-2" : "md:rotate-2"
                    } md:group-hover:rotate-0`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                      <Image
                        src={s.img}
                        alt={`${s.title} step`}
                        fill
                        sizes="(min-width: 768px) 40vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                    {/* floating outcome badge */}
                    <div
                      className={`absolute -bottom-3 left-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-md ${s.badge}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.5} />
                      {s.outcome}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Process;
