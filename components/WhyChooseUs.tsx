"use client";

import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { landingPageData } from "@/constants";
import { cn } from "@/lib/utils";

const reasons = landingPageData.whyChooseUs.content;

function Reason({
  index,
  icon: Icon,
  title,
  description,
  variants,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
  variants: Variants;
}) {
  return (
    <motion.li
      variants={variants}
      className="group relative grid grid-cols-[2.5rem_1fr] items-start gap-4 border-t border-ink/10 py-7 md:grid-cols-[4rem_1fr] md:gap-7 md:py-9"
    >
      {/* hollow index numeral, fills blue on hover */}
      <span
        aria-hidden
        className={cn(
          "font-display text-4xl font-extrabold leading-none tabular-nums md:text-5xl",
          "text-stroke-ink transition-all duration-300",
          "group-hover:[-webkit-text-stroke-width:0px] group-hover:text-blue",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </span>
          <h3 className="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
            {title}
          </h3>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft md:text-[15px]">
          {description}
        </p>
      </div>

      {/* blue underline draws in on hover */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-blue transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
    </motion.li>
  );
}

export function WhyChooseUs() {
  const reduce = useReducedMotion();

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const row: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        {/* Sticky editorial header + focal CTA */}
        <div className="min-w-0 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
            {landingPageData.whyChooseUs.title}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            {landingPageData.whyChooseUs.description}
          </p>

          <div className="mt-8 rounded-3xl bg-yellow p-6 md:p-7">
            <p className="font-display text-xl font-bold tracking-tight text-ink">
              Ready for your next move?
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
              Tell us where you are. We&apos;ll map the step that actually moves
              you forward.
            </p>
            <Link
              href="/contact"
              className="group/cta mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book a session
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Numbered reason index */}
        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="min-w-0 lg:col-span-7"
        >
          {reasons.map((r, i) => (
            <Reason
              key={r.title}
              index={i}
              icon={r.icon}
              title={r.title}
              description={r.description}
              variants={row}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default WhyChooseUs;
