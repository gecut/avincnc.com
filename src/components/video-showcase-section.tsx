"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { changaOne } from "@/config/fonts";
import type { SiteConfig } from "@/config/site-config";
import { video } from "motion/react-client";

type VideoShowcaseSectionProps = {
  videoShowcase: SiteConfig["videoShowcase"];
};

function formatTime(seconds: number): string {
  if (!seconds || Number.isNaN(seconds) || !Number.isFinite(seconds)) {
    return "00:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function VideoShowcaseSection({ videoShowcase }: VideoShowcaseSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const videoSrc = videoShowcase.videoSrc || "/videos/IMG_4086.mp4";

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {
        // Autoplay/play interrupted or prevented
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
    <section
      data-reveal
      className="flex min-h-screen w-full flex-col items-center justify-center bg-ink-950 py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-between items-center h-fit sm:h-auto gap-10 lg:grid lg:grid-cols-12 lg:items-center">
          <div className="w-full lg:col-span-5">
            <SectionHeader
              mobileCenter
              inverse
              eyebrow={videoShowcase.eyebrow}
              title={videoShowcase.title}
              description={videoShowcase.description}
            />
            <ul>
              <li className="flex flex-col items-start gap-4 mt-8">
                {videoShowcase.benefits.map((benefit, index) => (
                  <p key={index} className=" flex items-center gap4 text-sm leading-7 sm:text-base sm:leading-8 text-slate-400">
                   {(index+1).toLocaleString("fa-IR")}-{benefit}
                  </p>
                ))}
              </li>
            </ul>
          </div>
          <div data-motion-item className="w-full lg:col-span-7">
            <div
              ref={containerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(47,131,204,.24),transparent_42%),linear-gradient(135deg,#101a2b,#05080e)] shadow-2xl shadow-black/30 select-none"
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                src={videoSrc}
                poster={videoShowcase.poster}
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
                className="h-full w-full object-cover cursor-pointer"
              />

              {/* Ambient / Initial Backdrop when not playing */}
              {!hasStarted && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(47,131,204,.24),transparent_42%),linear-gradient(135deg,rgba(16,26,43,0.8),rgba(5,8,14,0.9))] cursor-pointer"
                />
              )}

              {/* Center Play/Pause Trigger & Status */}
              <div
                onClick={togglePlay}
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                  isPlaying
                    ? isHovered
                      ? "opacity-80 bg-black/25"
                      : "opacity-0 pointer-events-none"
                    : "opacity-100 bg-black/20 backdrop-blur-[1px]"
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={isPlaying ? "توقف ویدیو" : "پخش ویدیو"}
                  className="group/btn grid size-16 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/20 sm:size-20"
                >
                  {isPlaying ? (
                    <Pause className="size-6 sm:size-8 fill-white text-white" />
                  ) : (
                    <span className="ml-1 block size-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-white sm:border-y-[11px] sm:border-l-[18px]" />
                  )}
                </button>
                {/* {!isPlaying && (
                  <p
                    className={`${changaOne.className} mt-7 text-4xl tracking-[0.08em] text-white sm:text-6xl drop-shadow-md`}
                    dir="ltr"
                  >
                    {videoShowcase.status}
                  </p>
                )} */}
              </div>

              {/* Bottom Custom Controls Bar */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-5 pb-4 pt-8 transition-opacity duration-300 ${
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
