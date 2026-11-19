"use client";

import { useEffect, useRef } from "react";
import { mountScrollScene } from "@/lib/scroll-scene";

export default function ExperienceCanvas({ animate }: { animate: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dispose = () => {};
    try {
      dispose = mountScrollScene(canvas, { animate });
    } catch {
      canvas.remove();
    }
    return () => dispose();
  }, [animate]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
