import InstagramSlideCarousel from "@/components/InstaSlideCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Slide Carousel",
  description: "A Instagram slide style carousel using Motion and Next.js",
};

export default function Home() {
  return (
    <>
      <InstagramSlideCarousel />
    </>
  );
}
