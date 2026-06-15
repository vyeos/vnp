"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The grounded 3D-style mascot, made to feel alive without any WebGL:
 *  - gentle idle float (breathing)
 *  - a friendly wave on hover (the raised hand swings)
 *  - a periodic blink, crossfading to an eyes-closed frame
 *    (public/hero-man-blink.png, generated from the base render)
 * All effects respect prefers-reduced-motion.
 */
export function HeroMascot() {
  const reduce = useReducedMotion();
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;

    const open = () => {
      const wait = 2200 + Math.random() * 2800; // 2.2–5s between blinks
      timer = setTimeout(blink, wait);
    };
    const blink = () => {
      setBlinking(true);
      timer = setTimeout(() => {
        setBlinking(false);
        // ~30% chance of a quick double-blink
        if (Math.random() < 0.3) {
          timer = setTimeout(() => {
            setBlinking(true);
            timer = setTimeout(() => {
              setBlinking(false);
              open();
            }, 120);
          }, 160);
        } else {
          open();
        }
      }, 130);
    };

    timer = setTimeout(blink, 2000); // first blink ~2s after mount
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-0 z-10 flex justify-center"
    >
      <motion.div
        className="relative cursor-pointer"
        style={{ transformOrigin: "50% 100%" }}
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={
          reduce
            ? undefined
            : {
                duration: 4.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
        }
        whileHover={
          reduce
            ? undefined
            : {
                rotate: [0, 5, -3, 4, -2, 0],
                transition: { duration: 1.1, ease: "easeInOut" },
              }
        }
      >
        {/* base: eyes open (sizes the container) */}
        <Image
          src="/hero-man.png"
          alt="Vision and Path career mentor"
          width={620}
          height={760}
          priority
          className="h-[46vh] w-auto object-contain object-bottom drop-shadow-2xl lg:h-[74vh]"
        />
        {/* overlay: eyes closed, crossfaded in for a blink */}
        <Image
          src="/hero-man-blink.png"
          alt=""
          aria-hidden
          width={620}
          height={760}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-75 ease-out"
          style={{ opacity: blinking ? 1 : 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default HeroMascot;
