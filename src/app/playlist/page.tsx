"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const img = [
  "https://preview.redd.it/what-deluxe-volume-is-the-famous-panel-of-the-eclipse-v0-h8pmalb7w0jc1.jpg?width=768&format=pjpg&auto=webp&s=26994415b54e803de0f3a5e99015e139e1bb5e48",
  "https://images3.alphacoders.com/137/thumb-1920-1372691.png",
  "https://images5.alphacoders.com/133/thumb-1920-1334103.jpeg",
  "https://i.ytimg.com/vi/OQKN1Aqe69k/maxresdefault.jpg",
  "https://images5.alphacoders.com/136/1364638.jpeg",
  "https://i.pinimg.com/736x/57/de/b4/57deb4a336ce0d49193370bd32304674.jpg",
  "https://pbs.twimg.com/media/GmsRlkOWoAA2dCr?format=jpg&name=medium",
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const totalImages = img.length;

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-[30px_10px] font-['DM_Sans',_sans-serif]">
      <div className="flex w-full max-w-[900px] h-[600px] flex-col items-center justify-center">
        <div className="relative h-full w-full flex items-center justify-center">
          {img.map((src, index) => (
            <Card
              key={index}
              imgSrc={src}
              index={index}
              selected={selected}
              setSelected={setSelected}
              total={totalImages}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          {img.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`h-2 rounded-full transition-all ${
                index === selected ? "w-8 bg-white" : "w-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  imgSrc: string;
  index: number;
  selected: number;
  setSelected: (index: number) => void;
  total: number;
}

function Card({ imgSrc, index, selected, setSelected, total }: CardProps) {
  const isCenter = index === selected;
  const isLeft = index === (selected - 1 + total) % total;
  const isRight = index === (selected + 1) % total;

  let x = "0%";
  let scale = 0.75;
  let opacity = 0;
  let zIndex = 0;
  let rotateY = 0;

  if (isCenter) {
    x = "0%";
    scale = 1;
    opacity = 1;
    zIndex = 10;
    rotateY = 0;
  } else if (isLeft) {
    x = "-70%";
    opacity = 0.6;
    zIndex = 5;
    rotateY = 25;
  } else if (isRight) {
    x = "70%";
    opacity = 0.6;
    zIndex = 5;
    rotateY = -25;
  } else {
    opacity = 0;
    zIndex = 0;
    x = index > selected ? "100%" : "-100%";
  }

  return (
    <motion.div
      className="absolute h-full w-[65%] cursor-pointer"
      style={{
        left: "50%",
        marginLeft: "-32.5%",
        perspective: "1000px",
      }}
      animate={{
        x,
        scale,
        opacity,
        zIndex,
        rotateY,
      }}
      transition={{
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
        opacity: { duration: 0.4 },
      }}
      onClick={() => setSelected(index)}
    >
      <Image
        src={imgSrc}
        alt={`Image ${index + 1}`}
        className={`h-full w-full rounded-xl object-cover ${
          isCenter ? "shadow-2xl" : "shadow-lg"
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
        height={1000}
        width={1000}
      />
    </motion.div>
  );
}
