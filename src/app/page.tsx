"use client";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useState } from "react";

const img = [
  "https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg",
  "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/552785/pexels-photo-552785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1183021/pexels-photo-1183021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const DRAG_BUFFER = 50;
const SPRING = { type: "spring", mass: 3, stiffness: 400, damping: 50 };
const ONE_SECOUND = 1000;
const AUTO_DELAY = ONE_SECOUND * 10;

export default function Home() {
  const dragX = useMotionValue(0);
  const dragXProgess = useMotionValue(0);

  useMotionValueEvent(dragX, "change", (latest) => {
    if (typeof latest === "number" && dragging) {
      dragXProgess.set(latest);
    } else {
      dragXProgess.set(0);
    }
  });
  const [imgIndex, setImgIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragXProgess.get();

      if (x === 0) {
        setImgIndex((prev) => {
          if (prev === img.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDrageStart = () => {
    setDragging(true);
  };

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (imgIndex < img.length - 1) {
      setImgIndex((prev) => prev + 1);
    }
  };

  const onDrageEnd = () => {
    setDragging(false);

    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < img.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <AnimatePresence>
        <div className="relative min-h-screen overflow-hidden bg-neutral-950 py-8">
          <motion.div
            drag="x"
            dragConstraints={{
              right: 0,
              left: 0,
            }}
            transition={SPRING}
            style={{
              x: dragX,
            }}
            onDragStart={onDrageStart}
            onDragEnd={onDrageEnd}
            animate={{
              translateX: `-${imgIndex * 100}%`,
            }}
            className="curser-grab active:cursor-grabbing flex items-center"
          >
            <Images
              imgIndex={imgIndex}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </motion.div>
          <GradientEdges />
        </div>
      </AnimatePresence>
    </>
  );
}

const Images = ({
  imgIndex,
  handlePrev,
  handleNext,
}: {
  imgIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
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
          animate={{
            scale: imgIndex === index ? 0.95 : 0.85,
          }}
          transition={SPRING}
          className="aspect-video w-screen shrink-0 rounded-xl bg-neutral-800 object-cover"
        >
          <div className="flex justify-between h-full items-center">
            <button onClick={handlePrev}>
              <MdNavigateBefore
                className={`text-5xl rounded-lg ${
                  imgIndex === 0 ? "hidden" : "block"
                }`}
              />
            </button>
            <button onClick={handleNext}>
              <MdNavigateNext
                className={`text-5xl rounded-lg ${
                  imgIndex < img.length - 1 ? "block" : "hidden"
                }`}
              />
            </button>
          </div>
        </motion.div>
      ))}
    </>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
