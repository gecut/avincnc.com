"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { VideoFramePlayHorizontal } from "@solar-icons/react/ssr";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { ProductData } from "@/config/site-config";

type ProductVideoFrameProps = {
  product: ProductData;
};

function formatTime(seconds: number): string {
  if (!seconds || Number.isNaN(seconds) || !Number.isFinite(seconds)) {
    return "00:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function ProductVideoFrame({ product }: ProductVideoFrameProps) {
  const image = product.images[0];
  const videoSrc = product.videoSrc || "/videos/IMG_4086.mp4";

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {
        // Autoplay or playback interrupted
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (!duration && video.duration) {
      setDuration(video.duration);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!video || !duration) return;

    const clickPosition = (e.clientX - rect.left) / rect.width;
    const boundedClick = Math.max(0, Math.min(1, clickPosition));
    video.currentTime = boundedClick * duration;
    setCurrentTime(video.currentTime);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen not supported or blocked
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <figure className="relative w-full overflow-hidden rounded-2xl bg-ink-950 text-white shadow-[0_1rem_3rem_rgba(7,11,18,.16)] sm:rounded-[2rem]">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative aspect-video overflow-hidden bg-black select-none"
      >
        {/* Real Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={image?.src}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="h-full w-full object-cover cursor-pointer"
        />

        {/* Poster / Thumbnail Overlay (visible before first play) */}
        {!hasStarted && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 z-10 cursor-pointer"
          >
            {image && (
              <Image
                src={image.src}
                alt={`فریم معرفی ${product.name}`}
                fill
                sizes="(max-width: 767px) calc(100vw - 2rem), 48rem"
                className="object-cover opacity-55 transition-opacity duration-300 group-hover:opacity-70"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,8,18,.72)_75%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <button
                type="button"
                aria-label="پخش ویدیوی معرفی"
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <VideoFramePlayHorizontal
                  size={60}
                  weight="BoldDuotone"
                  className="text-white drop-shadow-lg transition-colors duration-300 hover:text-brand-300"
                />
              </button>
              <p className="mt-4 text-lg font-black sm:text-xl drop-shadow-md">{product.name}</p>
              <p className="mt-2 text-xs text-white/75 sm:text-sm drop-shadow">نمای دستگاه، کاربرد و اجزای اصلی</p>
            </div>
          </div>
        )}

        {/* Center Hover Pause/Play Overlay (after video has started) */}
        {hasStarted && (
          <div
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isPlaying
                ? isHovered
                  ? "opacity-60 bg-black/20"
                  : "opacity-0 pointer-events-none"
                : "opacity-100 bg-black/30 backdrop-blur-[1px]"
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? "توقف ویدیو" : "پخش ویدیو"}
              className="grid size-14 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/20 sm:size-16"
            >
              {isPlaying ? (
                <Pause className="size-6 fill-white text-white sm:size-7" />
              ) : (
                <Play className="ml-1 size-6 fill-white text-white sm:size-7" />
              )}
            </button>
          </div>
        )}

        {/* Bottom Custom Controls Bar */}
        {hasStarted && (
          <div
            className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-5 pb-4 pt-8 transition-opacity duration-300 ${
              isPlaying && !isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            dir="ltr"
          >
            {/* Seek Bar */}
            <div
              onClick={handleSeek}
              className="group/bar relative mb-3 flex h-1.5 w-full cursor-pointer items-center rounded-full bg-white/20 transition-all hover:h-2"
            >
              <div
                className="h-full rounded-full bg-brand-400"
                style={{ width: `${progressPercentage}%` }}
              />
              <div
                className="absolute size-3 -translate-x-1/2 rounded-full border border-white bg-brand-400 opacity-0 shadow transition-opacity group-hover/bar:opacity-100"
                style={{ left: `${progressPercentage}%` }}
              />
            </div>

            {/* Controls Action Row */}
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="cursor-pointer p-1 text-white/80 transition-colors hover:text-white"
                  aria-label={isPlaying ? "توقف" : "پخش"}
                >
                  {isPlaying ? (
                    <Pause className="size-4 fill-current sm:size-5" />
                  ) : (
                    <Play className="size-4 fill-current sm:size-5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="cursor-pointer p-1 text-white/80 transition-colors hover:text-white"
                  aria-label={isMuted ? "وصل صدا" : "قطع صدا"}
                >
                  {isMuted ? (
                    <VolumeX className="size-4 sm:size-5" />
                  ) : (
                    <Volume2 className="size-4 sm:size-5" />
                  )}
                </button>

                <div className="flex items-center gap-1 font-number text-[11px] text-white/60">
                  <span className="text-white">{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="cursor-pointer p-1 text-white/80 transition-colors hover:text-white"
                aria-label="تمام‌صفحه"
              >
                {isFullscreen ? (
                  <Minimize className="size-4 sm:size-5" />
                ) : (
                  <Maximize className="size-4 sm:size-5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <figcaption className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-white/45">
        <span>ویدیوی معرفی محصول</span>
        <span dir="ltr">AVIN CNC</span>
      </figcaption>
    </figure>
  );
}
