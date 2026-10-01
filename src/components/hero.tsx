import Image from "next/image";
import { blackOpsOne } from "@/config/fonts";
import type { SiteConfig } from "@/config/site-config";
import FoldText from "./FoldText";

type HeroProps = {
  hero: SiteConfig["hero"];
};

export function Hero({ hero }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative z-10 min-h-[calc(100svh+20px)] bg-white text-white sm:min-h-[calc(100svh+64px)]"
    >
      <div className="relative h-[calc(100svh+20px)] overflow-hidden rounded-t-none! bg-ink-950 pb-16! shadow-[0_8px_18px_-7px_rgba(7,11,18,.38),0_24px_46px_-16px_rgba(7,11,18,.3)] sm:h-[calc(100svh+64px)]">
        <div className="absolute inset-0 z-0 rounded-none ">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="scale-[1.01] rounded-none object-cover object-center blur-[2px]"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(3,7,13,.28)_0%,rgba(3,7,13,.08)_44%,rgba(3,7,13,.72)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_43%,rgba(37,99,235,.08),rgba(3,7,13,.48)_82%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[30%] left-1/2 z-[3] aspect-[1672/941] w-[clamp(125vw,145vw,155vw)] -translate-x-1/2 sm:bottom-[14svh] sm:h-[70svh] sm:w-[125vw] sm:aspect-auto lg:bottom-[7svh] lg:h-[80svh] lg:w-[108vw]"
        >
          {/* <div className="">
            <div
              className={` whitespace-nowrap bg-white bg-clip-text text-[32vw]! font-normal leading-none tracking-[0.055em] text-transparent sm:text-[23vw]! lg:top-[2.5%] lg:text-[17vw]!`}
              dir="ltr"
            >
              AVIN
            </div>
          </div> */}
          <div
            className={`w-full hero-avin-scale flex items-center justify-center absolute left-1/2 top-[8%] z-0 -translate-x-1/2 sm:top-[8%] ${blackOpsOne.className}`}
            dir="ltr"
          >
            <FoldText
              text="AVIN"
              splitBy="char"
              hinge="bottom"
              trigger="mount"
              duration={1.5}
              stagger={0.08}
              ease="power3.out"
              perspective={700}
              creaseShading={0}
              fontSize="clamp(5rem, 21vw, 12.5rem)"
              fontWeight={500}
              color="#f7f2e8"
              style={{ letterSpacing: "clamp(0.03em, 1.5vw, 0.08em)" }}
            />
          </div>
          <div className="hero-machines-enter absolute inset-0 z-10 trnaslate-x-1/2 left-0 sm:-left-14  [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,transparent_100%)] [mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,transparent_100%)]">
            <Image
              src={hero.foregroundImage}
              alt={hero.foregroundImageAlt}
              fill
              priority
              sizes="(max-width: 639px) 180vw, (max-width: 1023px) 125vw, 108vw"
              className="object-contain object-bottom [filter:brightness(.82)_contrast(1.1)_saturate(.85)_drop-shadow(0_0rem_1.35rem_rgba(0,0,0,.60))_drop-shadow(0_0.8rem_1.8rem_rgba(0,0,0,.80))]"
            />
          </div>
          <div className="absolute inset-x-0 bottom-[-1%] z-20 h-[46%] bg-[linear-gradient(to_top,rgba(3,7,13,1)_0%,rgba(3,7,13,.92)_18%,rgba(3,7,13,.68)_42%,rgba(3,7,13,.3)_68%,transparent_100%)] sm:hidden" />
          <div className="absolute inset-x-[5%] bottom-[-2%] z-20 hidden h-[28%] bg-[radial-gradient(ellipse_at_bottom,rgba(3,7,13,.96)_0%,rgba(3,7,13,.72)_38%,rgba(3,7,13,.28)_66%,transparent_84%)] blur-[2px] sm:block" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3]"
        >
          <div className="absolute inset-x-0 bottom-[20%] h-[48%] bg-gradient-to-t from-black/20 via-black/10 to-transparent sm:bottom-[14%] sm:h-[46%] sm:from-black/70 sm:via-black/30 lg:bottom-[7%] lg:h-[50%]" />
          <div className="absolute bottom-[24%] left-1/2 h-20 w-[76vw] -translate-x-1/2 rounded-[50%] bg-black/35 blur-3xl sm:bottom-[18%] sm:w-[62vw] lg:bottom-[13%]" />
          <div className="absolute inset-x-0 bottom-0 hidden h-[36svh] bg-[radial-gradient(ellipse_at_bottom,rgba(3,7,13,.94)_0%,rgba(3,7,13,.58)_42%,rgba(3,7,13,0)_72%)] sm:block" />
          <div className="absolute inset-x-0 bottom-0 h-[14svh] bg-gradient-to-t from-ink-950/15 to-transparent sm:h-[24svh] sm:from-ink-950/90 sm:via-ink-950/35" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,transparent_0%,rgba(3,7,13,.35)_52%,rgba(3,7,13,1)_70%,rgba(3,7,13,.98)_91%,#03070d_100%)] sm:bg-[linear-gradient(180deg,transparent_0%,rgba(3,7,13,.35)_55%,rgba(3,7,13,.9)_75%,rgba(3,7,13,.99)_92%,#03070d_100%)]"
        />
      </div>

      <a
        href="#about"
        aria-label={`${hero.title} ${hero.highlightedTitle} - رفتن به بخش بعدی`}
        className="w-full group absolute bottom-[6%] left-1/2 z-20 flex h-24 -translate-x-1/2 translate-y-[33px] flex-col items-center justify-end gap-0.5 pb-4 text-white focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:bottom-0 sm:h-28 sm:w-24 sm:translate-y-[37px] sm:pb-10"
      >
        <div className="w-full! flex items-center my-12 justify-center gap-1 text-lg font-medium text-white  sm:hidden">
          <p>{hero.title}</p>
          <p className="text-center text-xl font-bold text-blue-400 ">
            {hero.highlightedTitle}
          </p>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 280 40"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-1/2 -z-10 h-9 w-[clamp(15rem,65vw,17.5rem)] -translate-x-1/2 overflow-visible fill-current text-ink-950 transition-colors duration-300 group-hover:text-slate-950 sm:h-10"
        >
          <path d="M0 0H52C78 0 90 4 101 16C113 29 123 38 140 38C157 38 167 29 179 16C190 4 202 0 228 0H280Z" />
        </svg>

        <div className="flex flex-col items-center gap-">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <span
              key={index}
              aria-hidden="true"
              className="
        block size-3
        rotate-45
        border-b-2 border-r-2 border-current
        will-change-[opacity]
        [animation:hero-scroll-chevron_1.9s_ease-in-out_infinite]
        sm:size-4
      "
              style={{
                animationDelay: `${index * 0.18}s`,
              }}
            />
          ))}
        </div>
      </a>
    </section>
  );
}
