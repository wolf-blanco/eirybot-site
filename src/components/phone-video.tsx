"use client";
import { useEffect, useMemo, useRef } from "react";

type Locale = "es" | "en";

export default function PhoneVideo({ locale = "es" }: { locale?: Locale }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Tus archivos tienen espacio -> usar %20
  const src = useMemo(() => {
    return locale === "en" ? "/videodemobot%20EN.mp4" : "/videodemobot%20ES.mp4";
  }, [locale]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const tryPlay = () => v.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => e.isIntersecting && tryPlay(), {
      threshold: 0.3,
    });

    io.observe(v);
    window.addEventListener("pointerdown", tryPlay, { once: true });

    // por si cambia el src (cuando cambies idioma), recargá y reproducí
    v.load();
    tryPlay();

    return () => {
      io.disconnect();
      window.removeEventListener("pointerdown", tryPlay);
    };
  }, [src]);

  return (
  <div className="relative mx-auto w-[360px] md:w-[420px]">
    <div className="relative aspect-[9/16] overflow-hidden rounded-[69px] pr-[0px] md:pr-[0px]">
      <video
        key={src}
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover scale-[1.0] -translate-x-[0%] translate-y-[0%]"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
       
  </div> </div>
);

}
