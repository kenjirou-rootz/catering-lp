import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/Button";
import {
  HeroAnimation,
  HeroImage,
  HeroContent,
  HeroCTA,
} from "@/components/ui/HeroAnimation";

type HeroData = {
  catchCopy?: string;
  badgeText?: string;
  mediaType?: "image" | "video";
  backgroundImage?: any;
  backgroundVideoUrl?: string;
  videoPoster?: any;
  ctaText?: string;
} | null;

export function HeroSection({ data }: { data: HeroData }) {
  const catchCopy = data?.catchCopy || "特別な日を、もっと特別に。";
  const badgeText = data?.badgeText || "5ツ星シェフ監修のケータリングサービス";
  const isVideo = data?.mediaType === "video" && data?.backgroundVideoUrl;

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <HeroAnimation>
        <HeroImage className="absolute inset-0">
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={
                data?.videoPoster
                  ? urlFor(data.videoPoster).width(1920).quality(60).url()
                  : undefined
              }
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={data.backgroundVideoUrl} type="video/mp4" />
            </video>
          ) : (
            data?.backgroundImage && (
              <Image
                src={urlFor(data.backgroundImage).width(1920).quality(85).url()}
                alt="ケータリングの様子"
                fill
                priority
                className="object-cover"
              />
            )
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </HeroImage>

        <div className="relative z-10 text-left pl-5 md:pl-8 lg:pl-24 pb-20 md:pb-32 pr-5">
          <HeroContent>
            <div className="inline-block border-l border-r border-white/70 px-4 py-2 mb-8 md:mb-10">
              <span className="text-[10px] md:text-xs lg:text-sm font-serif-ja font-medium text-white tracking-wider">
                {badgeText}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-light text-white leading-editorial tracking-heading max-w-5xl">
              French Chef<br />
              Catering<br />
              Kitao
            </h1>
            <p className="mt-6 text-xl md:text-2xl lg:text-3xl font-serif-ja font-normal text-white leading-relaxed">
              {catchCopy}
            </p>
          </HeroContent>
          <HeroCTA className="mt-10">
            <Button href="#contact" variant="primary" className="text-base px-10 py-5 !rounded-full font-serif-ja">
              {data?.ctaText || "お問い合わせはこちら"}
            </Button>
          </HeroCTA>
        </div>
      </HeroAnimation>
    </section>
  );
}
