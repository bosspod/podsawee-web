"use client";

import { useEffect } from "react";

export function TechExperience() {
  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };
    const onScroll = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${distance > 0 ? (window.scrollY / distance) * 100 : 0}%`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="tech-experience" aria-hidden="true"><span className="scroll-progress" /><span className="cursor-aura" /></div>;
}
