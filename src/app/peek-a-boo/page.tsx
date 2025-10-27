"use client";

import { img } from "@/components/data";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const SPRING = { type: "spring", mass: 3, stiffness: 400, damping: 50 };

export default function Home() {
  const [dragConstraintLeft, setDragConstraintLeft] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const carouselWidth = carouselRef.current.scrollWidth;

      const newConstraint = containerWidth - carouselWidth - 64;

      setDragConstraintLeft(Math.min(0, newConstraint));
    }
  }, [containerRef, carouselRef]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative min-h-auto overflow-hidden bg-neutral-950 py-8 px-8"
      >
        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{
            right: 0,
            left: dragConstraintLeft,
          }}
          transition={SPRING}
          className="flex cursor-grab items-center active:cursor-grabbing gap-4"
        >
          <Images />
        </motion.div>
        <GradientEdges />
      </div>
    </>
  );
}

const Images = () => {
  return (
    <>
      {img.map((src, index) => (
        <motion.div
          key={index}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          // No more complex scale animation, just consistent layout
          transition={SPRING}
          className="
            aspect-video w-[300px] shrink-0 rounded-xl 
            bg-neutral-800 object-cover 
            sm:w-[400px] md:w-[500px]
          "
        ></motion.div>
      ))}
    </>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/80 to-neutral-950/0"></div>

      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/80 to-neutral-950/0" />
    </>
  );
};
