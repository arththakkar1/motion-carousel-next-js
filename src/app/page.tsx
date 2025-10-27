"use client";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";

export const img: string[] = [
  "https://preview.redd.it/what-deluxe-volume-is-the-famous-panel-of-the-eclipse-v0-h8pmalb7w0jc1.jpg?width=768&format=pjpg&auto=webp&s=26994415b54e803de0f3a5e99015e139e1bb5e48",
  "https://images3.alphacoders.com/137/thumb-1920-1372691.png",
  "https://images5.alphacoders.com/133/thumb-1920-1334103.jpeg",
  "https://i.ytimg.com/vi/OQKN1Aqe69k/maxresdefault.jpg",
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/753d408f-4fc0-496d-bfda-995d17c5e164/dgb4isd-e5995a0a-673a-4dcb-a594-d116c714531f.jpg/v1/fill/w_850,h_850,q_75,strp/desktop_wallpaper_toji_fushiguro_from_jujutsu_kais_by_opharshal_dgb4isd-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODUwIiwicGF0aCI6Ii9mLzc1M2Q0MDhmLTRmYzAtNDk2ZC1iZmRhLTk5NWQxN2M1ZTE2NC9kZ2I0aXNkLWU1OTk1YTBhLTY3M2EtNGRjYi1hNTk0LWQxMTZjNzE0NTMxZi5qcGciLCJ3aWR0aCI6Ijw9ODUwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.bSN3_0WfnE6hNdKgbwWpWtXDhOEIfV9e7NmaXWgOqwA",
  "https://i.pinimg.com/736x/57/de/b4/57deb4a336ce0d49193370bd32304674.jpg",
  "https://pbs.twimg.com/media/GmsRlkOWoAA2dCr?format=jpg&name=medium",
];

const DRAG_BUFFER = 50;
const SPRING = { type: "spring", mass: 3, stiffness: 400, damping: 50 };
const ONE_SECOUND = 1000;
const AUTO_DELAY = ONE_SECOUND * 5;

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
  }, [dragXProgess]);

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
      {/* <AnimatePresence>  <-- This was causing the error */}

      <div className="relative min-h-auto overflow-hidden bg-neutral-950 py-8">
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
      {/* </AnimatePresence> <-- This was causing the error */}
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
          key={index} // This key is correct
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: imgIndex === index ? 0.95 : 0.85,
          }}
          transition={SPRING}
          className="aspect-video sm:h-[300px] md:h-[500px] lg:h-[600px] w-screen shrink-0 rounded-xl bg-neutral-800 object-cover"
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
