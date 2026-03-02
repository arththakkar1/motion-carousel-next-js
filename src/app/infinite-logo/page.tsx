import { Logos3 } from "@/components/LogoInfiniteCarousel";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Logos3
        heading="Trusted by these companies"
        logos={[
          {
            id: "logo-1",
            description: "Astro",
            image:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
            className: "h-7 w-auto",
          },
          {
            id: "logo-2",
            description: "Figma",
            image:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
            className: "h-7 w-auto",
          },
          {
            id: "logo-3",
            description: "Next.js",
            image:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
            className: "h-7 w-auto",
          },
          {
            id: "logo-4",
            description: "React",
            image:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg",
            className: "h-7 w-auto",
          },
          {
            id: "logo-5",
            description: "shadcn/ui",
            image:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
            className: "h-7 w-auto",
          },
          {
            id: "logo-6",
            description: "Supabase",
            image:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
            className: "h-7 w-auto",
          },
          {
            id: "logo-7",
            description: "Vercel",
            image:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
            className: "h-7 w-auto",
          },
        ]}
      />
    </main>
  );
}
