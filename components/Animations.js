"use client";

import { useEffect } from "react";

export function FadeInReveal() {
  useEffect(() => {
    if (typeof anime === "undefined") return;
    const appContainers = document.querySelectorAll(".appContainer");
    appContainers.forEach((container) => {
      anime({
        targets: container,
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 1200,
        easing: "easeOutExpo",
        complete: () => {
          container.style.opacity = 1;
        },
      });
    });
  }, []);
  return null;
}

export function InertiaScroll() {
  useEffect(() => {
    const appContainer = document.getElementById("appContainer");
    if (!appContainer) return;

    let velocity = 0;
    let isTicking = false;
    const friction = 0.82;
    let frame;

    function startInertia() {
      if (isTicking) return;
      isTicking = true;

      function step() {
        appContainer.scrollTop += velocity;
        velocity *= friction;
        if (Math.abs(velocity) < 0.5) {
          velocity = 0;
          isTicking = false;
          cancelAnimationFrame(frame);
          return;
        }
        frame = requestAnimationFrame(step);
      }
      step();
    }

    const handler = (e) => {
      if (
        e.target.tagName === "TEXTAREA" ||
        (e.target.closest && e.target.closest("textarea"))
      ) {
        return;
      }
      if (!e.shiftKey && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        velocity += e.deltaY * 0.5;
        startInertia();
      }
    };

    appContainer.addEventListener("wheel", handler, { passive: false });
    return () => {
      appContainer.removeEventListener("wheel", handler);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

export function ScaleContainer() {
  useEffect(() => {
    function scaleAppContainer() {
      const container = document.getElementById("appContainer");
      if (!container) return;
      const maxWidth = 1440;
      const scaleX = window.innerWidth / maxWidth;
      const scaleY = window.innerHeight / window.innerHeight;
      const scale = Math.min(scaleX, scaleY);
      container.style.transform = `translate(-50%, 0) scale(${scale})`;
      container.style.transformOrigin = "top center";
    }

    scaleAppContainer();
    window.addEventListener("resize", scaleAppContainer);
    return () => window.removeEventListener("resize", scaleAppContainer);
  }, []);
  return null;
}
