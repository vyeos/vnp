"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The grounded 3D-style mascot, made to feel alive without any WebGL: it idles
 * gently and blinks every 2s by crossfading to an eyes-closed frame
 * (public/hero-man-blink.png, generated from the base render).
 * Blinking is disabled under prefers-reduced-motion.
 *
 * Container-driven: it fills its positioned parent and bottom-aligns, so the
 * bust's chest-crop sits flush with (and is hidden by) the parent's edge.
 */
export function HeroMascot({
  className,
  imgClassName,
}: {
  className?: string;
  imgClassName?: string;
}) {
  const reduce = useReducedMotion();
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 130);
    }, 2000);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "absolute inset-0 flex items-end justify-center",
        className,
      )}
    >
      <motion.div
        className={cn("relative h-[86%] w-auto sm:h-[88%]", imgClassName)}
        style={{ transformOrigin: "50% 100%" }}
        animate={reduce ? undefined : { y: [0, -6, 0] }}
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
                rotate: [0, 4, -2, 3, -1, 0],
                transition: { duration: 1, ease: "easeInOut" },
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
          className="h-full w-auto object-contain drop-shadow-2xl"
        />
        {/* overlay: eyes closed, crossfaded in for a blink */}
        <Image
          src="/hero-man-blink.png"
          alt=""
          aria-hidden
          width={620}
          height={760}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-75 ease-out"
          style={{ opacity: blinking ? 1 : 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default HeroMascot;
