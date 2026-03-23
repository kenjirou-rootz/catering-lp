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
  backgroundImage?: any;
  ctaText?: string;
} | null;

export function HeroSection({ data }: { data: HeroData }) {
  const catchCopy = data?.catchCopy || "特別な空間を、\nおいしい料理と共に。";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroAnimation>
        <HeroImage className="absolute inset-0">
          {data?.backgroundImage && (
            <Image
              src={urlFor(data.backgroundImage).width(1920).quality(85).url()}
              alt="ケータリングの様子"
              fill
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </HeroImage>

        <div className="relative z-10 text-center px-5">
          <HeroContent>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto whitespace-pre-line">
              {catchCopy}
            </h1>
          </HeroContent>
          <HeroCTA className="mt-10">
            <Button href="#contact" variant="primary" className="text-base px-10 py-5">
              {data?.ctaText || "お問い合わせはこちら"}
            </Button>
          </HeroCTA>
        </div>
      </HeroAnimation>
    </section>
  );
}
