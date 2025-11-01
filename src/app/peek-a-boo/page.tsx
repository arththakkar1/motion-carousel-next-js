import PeekabooCarousel from "@/components/PeekabooCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peek-a-boo Carousel",
  description: "A peek-a-boo style carousel using Motion and Next.js",
};

export default function Home() {
  return (
    <>
      <PeekabooCarousel />
    </>
  );
}
