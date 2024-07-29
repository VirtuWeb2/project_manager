import gsap from "gsap";
import { Play } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const actionText = ["Organize", "Planeje", "Gerencie", "Controle"];
  const [index, setIndex] = useState(0);
  const timeOut = useRef();

const animateMainElements = useEffect(()=>{
    gsap.fromTo("[data-animate='main']", {opacity: 0, y: 32}, {opacity: 1, y:0, stagger: .15, })
},[])

const AnimateText =  useEffect(() => {
    timeOut.current = setTimeout(() => {
      gsap.fromTo(
        "main h1 span",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, ease: "elastic.out", duration: 2 }
      );
      if (index < 3) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 3000);
    return () => clearTimeout(timeOut.current);
  }, [index]);
  return (
    <main>
      <div className="mx-auto max-w-[80%] mt-[20vh] text-center">
        <h1
          className="text-dark-50 text-[8rem] font-semibold max-w-[50vw] mx-auto"
          data-animate="main"
        >
          <span className="p-[1rem] bg-dark-50 inline-block text-dark-900">
            {actionText[index]}
          </span>{" "}
          seus projetos em um único lugar.
        </h1>
        <p
          className="text-dark-300 text-[2rem] mt-[1.6rem] max-w-[40vw] mx-auto leading-[1.5]"
          data-animate="main"
        >
          Sem planejamento seu projeto pode virar um pesadelo cheio de
          retrabalhos. Deixe o planejamento conosco e foque no que realmente
          importa:{" "}
          <span className="font-semibold text-dark-100">
            codificar suas ideias.
          </span>
          {/* Começar um projeto sem planejamento pode transformar uma ideia em um
          verdadeiro pesadelo. Deixe isso conosco e foque no que você faz de
          melhor: codificar. */}
        </p>
        <div
          className="flex mx-auto justify-center gap-[1rem]"
          data-animate="main"
        >
          <Link to={"/login"} className="mt-[2rem] bg-dark-50 p-[1rem] font-semibold text-[1.6rem] rounded-md">
            Começar agora
          </Link>
          <button className="mt-[2rem] border-dark-500 border-opacity-30 border ml-[1rem] text-dark-300 p-[1rem] font-semibold text-[1.6rem] rounded-md flex items-center w-fit gap-[.4rem]">
            <Play width={12} height={12} className="fill-dark-300" />
            Assistir o vídeo
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
