"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/ui/cta-button";

const Hero = () => {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  const sceneItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 42 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-paper pb-10 sm:pb-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[58%] bg-linear-to-b from-blue-100 via-paper to-paper" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1460px] flex-col px-5 pt-24 md:px-8 lg:pt-22">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-30 flex min-h-[35svh] flex-col items-center justify-end pb-4 text-center md:min-h-[37svh] lg:min-h-[34svh] lg:pb-5"
        >
          <motion.h1
            variants={item}
            className="max-w-5xl font-display text-[2.45rem] font-extrabold leading-[0.92] text-ink sm:text-[3.45rem] lg:text-[4.35rem] xl:text-[4.9rem]"
          >
            Where talent and teams
            <br className="hidden sm:block" />{" "}
            <span className="text-blue">find the path</span>{" "}
            <span className="mark-yellow text-ink">forward.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-4xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Students bring ambition. Teams bring opportunity. Vision and Path
            helps both move forward.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 flex w-full max-w-[390px] flex-row justify-center gap-2 sm:w-auto sm:max-w-none sm:gap-3"
          >
            <Link
              href="/contact"
              aria-label="Book a session"
              className="flex-1 sm:flex-none"
            >
              <CtaButton
                size="lg"
                className="w-full px-4 text-sm shadow-lg sm:w-auto sm:px-8 sm:text-base"
              >
                Book a session
              </CtaButton>
            </Link>
            <Link href="/services" className="flex-1 sm:flex-none">
              <CtaButton
                variant="outline"
                size="lg"
                className="w-full border-ink/15 bg-paper-2/85 px-4 text-sm shadow-sm sm:w-auto sm:px-8 sm:text-base"
              >
                Explore services
              </CtaButton>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto mt-auto h-[43svh] min-h-[320px] w-full max-w-[1320px] sm:h-[56svh] sm:min-h-[410px] lg:h-[57svh] lg:min-h-[430px]"
        >
          <div className="grid h-full grid-cols-3 overflow-hidden rounded-[2rem] shadow-2xl sm:rounded-[3rem]">
            <motion.div
              variants={sceneItem}
              className="relative h-full overflow-hidden rounded-l-[2rem] bg-blue-100/45 sm:rounded-l-[3rem]"
            >
              <Image
                src="/staff-cutout.png"
                alt="Staff member walking toward Vision and Path"
                width={408}
                height={612}
                priority
                sizes="(min-width: 1024px) 420px, 34vw"
                className="absolute bottom-0 left-1/2 h-[86%] w-auto max-w-none -translate-x-1/2 object-contain mix-blend-multiply drop-shadow-2xl sm:h-[90%] lg:h-[94%]"
              />
            </motion.div>

            <motion.div
              variants={sceneItem}
              className="relative h-full overflow-hidden border-x border-blue/10 bg-muted/60"
            >
              <Image
                src="/hero-man.png"
                alt="Vision and Path mascot"
                width={1072}
                height={912}
                priority
                sizes="(min-width: 1024px) 420px, 34vw"
                className="absolute bottom-0 left-1/2 h-[86%] w-auto max-w-none -translate-x-[68%] object-contain drop-shadow-2xl sm:h-[90%] lg:h-[94%]"
              />
            </motion.div>

            <motion.div
              variants={sceneItem}
              className="relative h-full overflow-hidden rounded-r-[2rem] bg-yellow-50/65 sm:rounded-r-[3rem]"
            >
              <Image
                src="/student-cutout.png"
                alt="Student walking toward Vision and Path"
                width={560}
                height={1000}
                priority
                sizes="(min-width: 1024px) 420px, 34vw"
                className="absolute bottom-0 left-1/2 h-[86%] w-auto max-w-none -translate-x-1/2 object-contain mix-blend-multiply drop-shadow-2xl sm:h-[90%] lg:h-[94%]"
              />
            </motion.div>
          </div>

          <motion.div
            variants={sceneItem}
            className="pointer-events-none absolute right-[16.666%] bottom-[calc(21%+1rem)] left-[16.666%] z-20 h-[3px] bg-yellow shadow-[0_0_18px_rgba(255,200,26,0.55)]"
          />
          <motion.div
            variants={sceneItem}
            className="absolute bottom-[21%] left-[16.666%] z-30 -translate-x-1/2 rounded-full border border-white/15 bg-white/95 px-3 py-2 text-xs font-bold text-blue shadow-xl sm:px-5 sm:text-sm"
          >
            Staff
          </motion.div>
          <motion.div
            variants={sceneItem}
            className="absolute right-1/2 bottom-[21%] z-30 translate-x-1/2 rounded-full border border-white/15 bg-paper-2 px-4 py-2 text-center text-xs font-extrabold text-ink shadow-xl sm:px-7 sm:text-base"
          >
            Vision & Path
          </motion.div>
          <motion.div
            variants={sceneItem}
            className="absolute right-[16.666%] bottom-[21%] z-30 translate-x-1/2 rounded-full border border-white/15 bg-white/95 px-3 py-2 text-xs font-bold text-blue shadow-xl sm:px-5 sm:text-sm"
          >
            Students
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
