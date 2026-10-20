"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("@/components/hero-canvas"), {
  ssr: false,
});

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroStage() {
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const hints = navigator as NavigatorHints;
    const lowEnd =
      (typeof hints.deviceMemory === "number" && hints.deviceMemory < 4) ||
      (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2);

    if (reduced || narrow || coarse || lowEnd || hints.connection?.saveData || !canUseWebGL()) {
      return;
    }

    let cancelled = false;
    const start = () => {
      if (!cancelled) setShow3d(true);
    };

    const timeout = window.setTimeout(start, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div className="hero-fallback absolute inset-0" />
      {show3d ? <HeroCanvas /> : null}
    </div>
  );
}
