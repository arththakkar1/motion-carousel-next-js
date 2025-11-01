import { Metadata } from "next";
import PlaylistCarousel from "@/components/PlaylistCarousel";

export const metadata: Metadata = {
  title: "Playlist Carousel",
  description: "A 3D playlist carousel using Motion and Next.js",
};

export default function Home() {
  return <PlaylistCarousel />;
}

export interface CardProps {
  imgSrc: string;
  index: number;
  selected: number;
  setSelected: (index: number) => void;
  total: number;
}
