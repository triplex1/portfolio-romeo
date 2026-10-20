"use client";

import { useEffect, useRef } from "react";
import { mountHeroScene } from "@/lib/hero-scene";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dispose = () => {};
    try {
      dispose = mountHeroScene(canvas);
    } catch {
      canvas.remove();
    }
    return () => dispose();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full mix-blend-screen" />;
}
