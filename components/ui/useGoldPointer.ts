import { useRef, type PointerEvent } from "react";

export function useGoldPointer<T extends HTMLElement>() {
  const gradientRef = useRef<HTMLSpanElement>(null);

  const handlePointerMove = (event: PointerEvent<T>) => {
    if (event.pointerType === "touch") return;

    const gradient = gradientRef.current;
    if (!gradient) return;

    const bounds = gradient.getBoundingClientRect();
    gradient.style.setProperty("--gold-x", `${event.clientX - bounds.left}px`);
    gradient.style.setProperty("--gold-y", `${event.clientY - bounds.top}px`);
    gradient.classList.add("is-active");
  };

  const handlePointerLeave = (event: PointerEvent<T>) => {
    if (event.pointerType === "touch") return;
    gradientRef.current?.classList.remove("is-active");
  };

  return { gradientRef, handlePointerMove, handlePointerLeave };
}
