"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const companies = [
  { name: "Google", src: "/google.png" },
  { name: "Microsoft", src: "/microsoft.png" },
  { name: "Amazon", src: "/amazon.png" },
  { name: "Nvidia", src: "/nvidia.png" },
  { name: "Apple", src: "/apple.png" },
];

const talent = [
  { name: "Aanya R.", role: "Software Engineer", seed: "Aanya" },
  { name: "Marcus L.", role: "Data Scientist", seed: "Marcus" },
  { name: "Priya N.", role: "Product Manager", seed: "Priya" },
  { name: "Diego S.", role: "AI Engineer", seed: "Diego" },
  { name: "Lena K.", role: "UX Designer", seed: "Lena" },
];

const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=transparent`;

// node centres in the 1000x640 SVG userspace (5 items, evenly distributed)
const nodeY = (i: number) => 64 + i * 128;

const ease = [0.16, 1, 0.3, 1] as const;

export const PlacementBridge = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-blue-100 py-20 text-ink md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/15 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-blue-700">
            Our candidates now work at
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Talent, bridged to the best.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Vision &amp; Path connects ambitious people with world-class teams —
            and walks with them from first conversation to first day.
          </p>
        </div>

        {/* ===== Desktop bridge ===== */}
        <div className="mt-16 hidden md:block">
          <div className="flex items-stretch md:h-[460px]">
            {/* Left: talent */}
            <div className="flex w-44 flex-col justify-between py-1">
              {talent.map((person, i) => (
                <motion.div
                  key={person.seed}
                  initial={
                    reduce ? { opacity: 1 } : { opacity: 0, x: -40 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  className="group relative mx-auto"
                >
                  <div className="absolute -inset-1 rounded-full bg-blue/60 opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/80 bg-paper shadow-lg">
                    <Image
                      src={avatarUrl(person.seed)}
                      alt={person.name}
                      width={64}
                      height={64}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* tooltip */}
                  <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-navy-2/95 px-3 py-1.5 opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <p className="text-xs font-semibold text-white">
                      {person.name}
                    </p>
                    <p className="text-[10px] text-yellow">{person.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center: animated bridge */}
            <div className="relative flex-1">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 640"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="bridgeLine"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="1000"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#5b7bf0" />
                    <stop offset="45%" stopColor="#aab8f5" />
                    <stop offset="55%" stopColor="var(--brand-yellow-300)" />
                    <stop offset="100%" stopColor="var(--brand-yellow)" />
                  </linearGradient>
                  <filter
                    id="bridgeGlow"
                    x="-60%"
                    y="-60%"
                    width="220%"
                    height="220%"
                  >
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {talent.map((_, i) => {
                  const y = nodeY(i);
                  const leftD = `M 0,${y} C 320,${y} 320,320 440,320`;
                  const rightD = `M 560,320 C 680,320 680,${y} 1000,${y}`;
                  const fullD = `M 0,${y} C 320,${y} 320,320 440,320 L 560,320 C 680,320 680,${y} 1000,${y}`;
                  return (
                    <g key={i}>
                      <motion.path
                        d={leftD}
                        fill="none"
                        stroke="url(#bridgeLine)"
                        strokeWidth={4}
                        strokeLinecap="round"
                        initial={
                          reduce
                            ? { pathLength: 1, opacity: 0.7 }
                            : { pathLength: 0, opacity: 0 }
                        }
                        whileInView={{ pathLength: 1, opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: i * 0.12, ease }}
                      />
                      <motion.path
                        d={rightD}
                        fill="none"
                        stroke="url(#bridgeLine)"
                        strokeWidth={4}
                        strokeLinecap="round"
                        initial={
                          reduce
                            ? { pathLength: 1, opacity: 0.7 }
                            : { pathLength: 0, opacity: 0 }
                        }
                        whileInView={{ pathLength: 1, opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.4,
                          delay: 0.7 + i * 0.12,
                          ease,
                        }}
                      />
                      {!reduce && (
                        <circle
                          r="5"
                          fill="var(--brand-yellow)"
                          filter="url(#bridgeGlow)"
                        >
                          <animateMotion
                            dur={`${4 + i * 0.55}s`}
                            repeatCount="indefinite"
                            keyPoints="0;0.46;0.54;1"
                            keyTimes="0;0.46;0.54;1"
                            calcMode="linear"
                            path={fullD}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Central Vision & Path hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative grid h-24 w-24 place-items-center">
                  <div className="absolute inset-0 rounded-full bg-yellow/25 blur-xl" />
                  <div
                    className={`absolute inset-0 rounded-full border border-dashed border-blue/25 ${
                      reduce ? "" : "animate-spin-slow"
                    }`}
                  />
                  <div className="relative grid h-[4.5rem] w-[4.5rem] place-items-center overflow-hidden rounded-full border border-white/15 bg-paper shadow-2xl">
                    <Image
                      src="/logo.png"
                      alt="Vision and Path"
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: companies */}
            <div className="flex w-44 flex-col justify-between py-1">
              {companies.map((company, i) => (
                <motion.div
                  key={company.name}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease }}
                  className="flex h-16 items-center justify-center rounded-2xl border border-blue/10 bg-white px-4 shadow-lg transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={company.src}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="max-h-9 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Labels row, aligned under the columns */}
          <div className="mt-6 flex items-center">
            <div className="w-44 text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Talent
              </span>
            </div>
            <div className="flex-1" />
            <div className="w-44 text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Hired at
              </span>
            </div>
          </div>
        </div>

        {/* ===== Mobile bridge ===== */}
        <div className="mt-12 md:hidden">
          {/* Talent */}
          <p className="mb-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Talent
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {talent.map((person) => (
              <div
                key={person.seed}
                className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/80 bg-paper shadow-lg"
              >
                <Image
                  src={avatarUrl(person.seed)}
                  alt={person.name}
                  width={56}
                  height={56}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Connector + hub */}
          <div className="relative my-6 flex flex-col items-center">
            <span
              className={`block h-10 w-px bg-gradient-to-b from-blue/50 to-yellow/70 ${
                reduce ? "" : "animate-pulse"
              }`}
            />
            <div className="relative grid h-16 w-16 place-items-center">
              <div className="absolute inset-0 rounded-full bg-yellow/25 blur-lg" />
              <div className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white/15 bg-paper shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="Vision and Path"
                  width={44}
                  height={44}
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>
            <span
              className={`block h-10 w-px bg-gradient-to-b from-yellow/70 to-blue/50 ${
                reduce ? "" : "animate-pulse"
              }`}
            />
          </div>

          {/* Companies */}
          <p className="mb-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Hired at
          </p>
          <div className="grid grid-cols-2 gap-3">
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex h-14 items-center justify-center rounded-2xl border border-blue/10 bg-white px-4 shadow-lg"
              >
                <Image
                  src={company.src}
                  alt={company.name}
                  width={110}
                  height={36}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementBridge;
