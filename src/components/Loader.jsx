import gsap from "gsap";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Loader = () => {
  const loaderIcon = useRef();

  useEffect(() => {
    gsap.fromTo(
      loaderIcon.current.querySelectorAll("rect"),
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        repeat: -1,
        yoyo: true, // Faz a animação repetir ao contrário
      }
    );
  }, []);

  return (
    <div className="bg-dark-950 fixed w-[100vw] h-[100vh] left-0 top-0 bg-opacity-60 flex items-center justify-center">
      <LayoutDashboard
        ref={loaderIcon}
        strokeWidth={1.5}
        absoluteStrokeWidth
        className="text-dark-50 w-[15.6rem] h-[15.6rem]"
      />
    </div>
  );
};

export default Loader;
