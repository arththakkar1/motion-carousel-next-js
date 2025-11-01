import InfiniteCarousel from "@/components/InfiniteCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infinite Carousel",
  description: "A infinite looping carousel using Motion and Next.js",
};

export default function Home() {
  return <InfiniteCarousel />;
}
