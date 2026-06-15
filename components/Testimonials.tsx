"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { landingPageData } from "@/constants";
import { cn } from "@/lib/utils";

const testimonials = landingPageData.testimonials.content;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const current = testimonials[active];

  // auto-advance, paused on hover and under reduced motion
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(id);
  }, [reduce, paused]);

  return (
    <section
      aria-labelledby="stories-heading"
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-28"
    >
      <div className="mb-12 max-w-3xl">
        <h2
          id="stories-heading"
          className="font-display text-4xl font-bold tracking-tight text-ink md:text-6xl"
        >
          {landingPageData.testimonials.title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          {landingPageData.testimonials.desc}
        </p>
      </div>

      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover only pauses auto-advance; all controls are real buttons */}
      <div
        className="grid gap-6 lg:grid-cols-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Featured quote */}
        <div className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-navy p-8 text-white md:p-12 lg:col-span-7">
          <span
            aria-hidden
            className="font-display text-7xl leading-none text-yellow"
          >
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex-1"
            >
              <p className="line-clamp-4 text-2xl font-medium leading-snug text-white md:text-3xl">
                {current.text}
              </p>
              <footer className="mt-8 flex items-center gap-3">
                <Image
                  src={current.image}
                  alt={current.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20"
                />
                <div>
                  <div className="font-semibold">{current.name}</div>
                  <div className="text-sm text-white/55">{current.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Selector */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-5 gap-2.5 sm:grid-cols-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Read ${t.name}'s story`}
                aria-pressed={i === active}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-2xl ring-2 transition-all duration-300",
                  i === active
                    ? "ring-blue"
                    : "opacity-60 ring-transparent hover:opacity-100",
                )}
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
                {i === active && (
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-blue" />
                )}
              </button>
            ))}
          </div>
          <p className="mt-5 font-mono text-sm text-ink-soft">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
            <span className="ml-3 text-ink/40">
              Tap a face to read their story
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
