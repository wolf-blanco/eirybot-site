// src/components/phone-video.tsx
"use client";
import { useEffect, useRef } from "react";

export default function PhoneVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => e.isIntersecting && tryPlay(), { threshold: 0.3 });
    io.observe(v);
    window.addEventListener("pointerdown", tryPlay, { once: true });
    tryPlay();
    return () => { io.disconnect(); window.removeEventListener("pointerdown", tryPlay); };
  }, []);

  return (
    <div className="relative mx-auto w-[300px] md:w-[360px]">
      {/* Contenedor recortador */}
      <div className="aspect-[9.5/18.7] overflow-hidden rounded-[34px] shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          // Hacemos zoom y pequeño ajuste para “sacar” los bordes blancos
          className="h-full w-full object-cover scale-[1.133] translate-y-[0%]"
          // poster="/video-poster.jpg"
        >
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
    </div>
  );
}
