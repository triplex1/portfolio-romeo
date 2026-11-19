"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ExperienceCanvas = dynamic(() => import("@/components/experience-canvas"), {
  ssr: false,
});

type Mode = "off" | "still" | "full";

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

export function ScrollStage() {
  const [mode, setMode] = useState<Mode>("off");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const hints = navigator as NavigatorHints;

    const decide = () => {
      const lowPower =
        (typeof hints.deviceMemory === "number" && hints.deviceMemory < 4) ||
        (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2) ||
        Boolean(hints.connection?.saveData);

      if (!wide.matches || lowPower || !canUseWebGL()) {
        setMode("off");
        return;
      }
      setMode(reduced.matches ? "still" : "full");
    };

    decide();
    wide.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.scene = mode;
    return () => {
      delete document.documentElement.dataset.scene;
    };
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--scroll", progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="stage-fallback absolute inset-0" />
      {mode !== "off" ? <ExperienceCanvas animate={mode === "full"} /> : null}
    </div>
  );
}
