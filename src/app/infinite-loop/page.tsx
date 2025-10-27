"use client";
import { img } from "@/components/data";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { useRef, useState, useLayoutEffect } from "react";

export default function Home() {
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocityRef = useRef(0.5);

  const containerRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);

  const numCopies = 3;
  const duplicatedImages = Array(numCopies).fill(img).flat();

  useLayoutEffect(() => {
    const measureWidth = () => {
      if (containerRef.current) {
        setLoopWidth(containerRef.current.scrollWidth / numCopies);
      }
    };

    measureWidth();

    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, []);

  useAnimationFrame((t, delta) => {
    if (!isHovered && loopWidth > 0) {
      const currentX = x.get();
      const newX = currentX - velocityRef.current * (delta / 16);

      const resetPoint = -loopWidth;

      if (newX <= resetPoint) {
        x.set(newX - resetPoint);
      } else {
        x.set(newX);
      }
    }
  });

  return (
    <div className="relative min-h-auto overflow-hidden bg-neutral-950 py-8">
      <motion.div
        ref={containerRef}
        style={{ x }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="flex items-center"
      >
        {duplicatedImages.map((src, index) => (
          <motion.div
            key={index}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="aspect-video h-[200px] sm:h-[300px] md:h-[500px] lg:h-[400px] w-fit shrink-0 rounded-xl bg-neutral-800 object-cover mx-2"
          />
        ))}
      </motion.div>
      <GradientEdges />
    </div>
  );
}

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
