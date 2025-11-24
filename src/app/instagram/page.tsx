import InstagramCarousel from "@/components/InstagramCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Carousel",
  description: "A Instagram style carousel using Motion and Next.js",
};

export default function Home() {
  return (
    <>
      <InstagramCarousel />
    </>
  );
}
