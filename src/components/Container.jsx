import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import Title from "./Title";
import { useEffect } from "react";
import gsap from "gsap/all";
import { Home } from "lucide-react";
import { Settings } from "lucide-react";
import { Folder } from "lucide-react";
import { Bell } from "lucide-react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { LayoutDashboard } from "lucide-react";
import { Layers2 } from "lucide-react";
import { Layers3 } from "lucide-react";
import { Star } from "lucide-react";
import { UsersRound } from "lucide-react";
const Container = ({ children }) => {
  const [title, setTitle] = useState(null);
  const [position, setPosition] = useState(null);
  const { sidebarActive } = useContext(GlobalContext);
  // const [sidebarActive, setSidebarActive] = useState(false);
  const gradients = [
    "bg-gradient-to-r from-red-500 to-orange-500",
    "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    "bg-gradient-to-r from-blue-600 to-violet-600",
    "bg-gradient-to-r from-emerald-500 to-emerald-900",
    "bg-gradient-to-r from-amber-500 to-pink-500",
  ];
  useEffect(() => {
    const tl = gsap.timeline();
    if (sidebarActive) {
      tl.to("aside", { width: "20vw" });
      tl.fromTo(
        ".sidebar-link span",
        { opacity: 0, x: -12, display: "none" },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.2,
          display: "block",
          transition: "opacity",
        }
      );
    } else {
      tl.to("aside", { width: "" });
    }
  }, [sidebarActive]);

  function showTitle(e, title) {
   if(!sidebarActive){
    setPosition({
      left: e.currentTarget.getBoundingClientRect().right,
      top:
        e.currentTarget.getBoundingClientRect().top -
        e.currentTarget.scrollHeight -
        15,
    });
    setTitle(title);
   }
  }

  return (
    <section className="container">
      <div className={`container-width`}>
        <aside
          className={`flex flex-col p-[1.5rem] py-[4rem] text-[1.5rem] gap-[1rem] relative min-h-[91.8vh]`}
        >
          
            <NavLink
            onMouseEnter={(e) => showTitle(e, "Início")}
            onMouseLeave={() => setPosition(null)}
            to={"/"}
            className={`sidebar-link ${
              !sidebarActive ? "justify-center" : "px-[1.5rem]"
            }`}
          >
            <Home width={24} height={24} strokeWidth={1.5} />
            {sidebarActive && <span>Início</span>}
          </NavLink>
            <NavLink
              onMouseEnter={(e) => showTitle(e, "Projetos")}
              onMouseLeave={() => setPosition(null)}
              to={"/projetos"}
              className={`sidebar-link ${
                !sidebarActive ? "justify-center" : "px-[1.5rem]"
              }`}
            >
              {/* <Layer /> */}
              <Layers3 strokeWidth={1.5} width={24} height={24} />

              {sidebarActive && <span className="sidebar-text">Projetos</span>}
            </NavLink>
            <NavLink
              onMouseEnter={(e) => showTitle(e, "Membros")}
              onMouseLeave={() => setPosition(null)}
              to={"membros"}
              className={`sidebar-link ${
                !sidebarActive ? "justify-center" : "px-[1.5rem]"
              }`}
            >
              {/* <Layer /> */}
              <UsersRound strokeWidth={1.5} width={24} height={24} />

              {sidebarActive && <span className="sidebar-text">Membros</span>}
            </NavLink>
            <NavLink
              onMouseEnter={(e) => showTitle(e, "Favoritos")}
              onMouseLeave={() => setPosition(null)}
              to={"/favoritos"}
              className={`sidebar-link ${
                !sidebarActive ? "justify-center" : "px-[1.5rem]"
              }`}
            >
              <Star strokeWidth={1.5} width={24} height={24} />

              {sidebarActive && <span className="sidebar-text">Favoritos</span>}
            </NavLink>
            {/* <NavLink
              onMouseEnter={(e) => showTitle(e, "Configurações")}
              onMouseLeave={() => {
                setPosition(null);
              }}
              to={"/configuracoes"}
              className={`sidebar-link mt-auto ${
                !sidebarActive ? "justify-center" : "px-[1.5rem]"
              }`}
            >
              <Settings width={24} height={24} strokeWidth={1.5} />
              {sidebarActive && <span>Configurações</span>}
            </NavLink> */}
            {position && <Title position={position} title={title} />}
        </aside>
        {children}
      </div>
    </section>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
