"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import Image from "next/image";

const InstagramCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const images = [
    {
      id: 1,
      url: "https://preview.redd.it/what-deluxe-volume-is-the-famous-panel-of-the-eclipse-v0-h8pmalb7w0jc1.jpg?width=768&format=pjpg&auto=webp&s=26994415b54e803de0f3a5e99015e139e1bb5e48",
      alt: "Anime image 1",
    },
    {
      id: 2,
      url: "https://images3.alphacoders.com/137/thumb-1920-1372691.png",
      alt: "Anime image 2",
    },
    {
      id: 3,
      url: "https://images5.alphacoders.com/133/thumb-1920-1334103.jpeg",
      alt: "Anime image 3",
    },
    {
      id: 4,
      url: "https://i.ytimg.com/vi/OQKN1Aqe69k/maxresdefault.jpg",
      alt: "Anime image 4",
    },
    {
      id: 5,
      url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/753d408f-4fc0-496d-bfda-995d17c5e164/dgb4isd-e5995a0a-673a-4dcb-a594-d116c714531f.jpg/v1/fill/w_850,h_850,q_75,strp/desktop_wallpaper_toji_fushiguro_from_jujutsu_kais_by_opharshal_dgb4isd-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODUwIiwicGF0aCI6Ii9mLzc1M2Q0MDhmLTRmYzAtNDk2ZC1iZmRhLTk5NWQxN2M1ZTE2NC9kZ2I0aXNkLWU1OTk1YTBhLTY3M2EtNGRjYi1hNTk0LWQxMTZjNzE0NTMxZi5qcGciLCJ3aWR0aCI6Ijw9ODUwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.bSN3_0WfnE6hNdKgbwWpWtXDhOEIfV9e7NmaXWgOqwA",
      alt: "Anime image 5",
    },
    {
      id: 6,
      url: "https://i.pinimg.com/736x/57/de/b4/57deb4a336ce0d49193370bd32304674.jpg",
      alt: "Anime image 6",
    },
    {
      id: 7,
      url: "https://pbs.twimg.com/media/GmsRlkOWoAA2dCr?format=jpg&name=medium",
      alt: "Anime image 7",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md  rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
              <span className="text-sm font-semibold">🌟</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-white">bhupendrajogi</p>
            <p className="text-xs text-gray-400">Nature & Travel</p>
          </div>
          <button className="text-gray-300">•••</button>
        </div>

        {/* Carousel */}
        <div className="relative aspect-square bg-black overflow-hidden">
          {/* Current Image */}
          <div className="w-full h-full">
            <Image
              height={2000}
              width={2000}
              key={currentIndex}
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover animate-fadeIn"
            />
          </div>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-zinc-700 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-zinc-700 transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-transform hover:scale-110 ${
                  isLiked ? "animate-likeHeart" : ""
                }`}
              >
                <Heart
                  className={`w-7 h-7 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
              </button>
              <button className="transition-transform hover:scale-110">
                <MessageCircle className="w-7 h-7 text-white" />
              </button>
              <button className="transition-transform hover:scale-110">
                <Send className="w-7 h-7 text-white" />
              </button>
            </div>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="transition-transform hover:scale-110"
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isBookmarked ? "fill-white text-white" : "text-white"
                }`}
              />
            </button>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-sm text-white">2,847 likes</p>
            <p className="text-sm text-gray-200">
              <span className="font-semibold text-white">bhupendrajogi</span> US
              me kaha kaha gaye ho? bahot gaja gaya hu, nam batye? bhupendrajogi
            </p>
            <p className="text-gray-400 text-xs">View all 124 comments</p>
            <p className="text-gray-500 text-xs uppercase">2 hours ago</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes likeHeart {
          0% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.3);
          }
          30% {
            transform: scale(0.95);
          }
          45% {
            transform: scale(1.1);
          }
          60% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-likeHeart {
          animation: likeHeart 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InstagramCarousel;
