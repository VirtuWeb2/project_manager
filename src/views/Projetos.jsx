import gsap from "gsap/all";
import { UserRoundPlus } from "lucide-react";
import { Braces } from "lucide-react";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Star } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Message from "../components/Message";
import { EllipsisVertical } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Share } from "lucide-react";
import { Settings } from "lucide-react";

const Projetos = () => {
  const [modal, setModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [language, setLanguage] = useState([]);
  const [framework, setFramework] = useState([]);
  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [tipoProjeto, setTipoProjeto] = useState("");
  const [tituloProjeto, setTituloProjeto] = useState("");
  const [showOptionsTypeProject, setShowOptionsTypeProject] = useState(false);
  const [step, setStep] = useState(1);
  const [modalOptionsProject, setModalOptionsProject] = useState(false)
  const [message, setMessage] = useState(null);
  const [projects, setProjects] = useState(()=>{
    const localProjects = localStorage.getItem("projects")
    return localProjects ? JSON.parse(localProjects): []
  });
  const timeOut = useRef();
  const programmingLanguages = [
    {
      type: "back-end",
      icon: "c",
      label: "C",
    },
    {
      type: "back-end",
      icon: "cplus",
      label: "C++",
    },
    {
      type: "back-end",
      icon: "csharp",
      label: "C#",
    },
    {
      type: "back-end",
      icon: "go",
      label: "Golang",
    },
    {
      type: "back-end",
      icon: "java",
      label: "Java",
      frameworks: ["spring"],
    },
    {
      type: "back-end",
      icon: "donet",
      label: ".Net",
    },
    {
      type: "back-end",
      icon: "php",
      label: "PHP",
      frameworks: ["laravel"],
    },
    {
      type: "back-end",
      icon: "r",
      label: "R",
    },
    {
      type: "front-end",
      icon: "javascript",
      label: "JavaScript",
    },
    {
      type: "front-end",
      icon: "typescript",
      label: "TypeScript",
    },
    {
      type: "back-end",
      icon: "python",
      label: "Python",
      frameworks: ["django"],
    },
    {
      type: "back-end",
      icon: "ruby",
      label: "Ruby",
      frameworks: ["rails"],
    },
    {
      type: "back-end",
      icon: "rust",
      label: "Rust",
    },
    {
      type: "front-end",
      icon: "swift",
      label: "Swift",
    },
    {
      type: "fullstack",
      icon: "kotlin",
      label: "Kotlin",
    },
  ];
  const frameworks = [
    {
      language: ["ruby"],
      frameworks: ["rails"],
    },
    {
      language: ["javascript", "typescript"],
      frameworks: [
        "react",
        "express",
        "angular",
        "electron",
        "svelte",
        "vue",
        "react-router",
      ],
    },
  ];
  const databases = [
    { icon: "firebase", label: "Firebase" },
    { icon: "mongodb", label: "Mongodb" },
    { icon: "mysql", label: "MySQL" },
    { icon: "postgresql", label: "Postgresql" },
    { icon: "sqlite", label: "SQLite" },
    { icon: "supabase", label: "Supabase" },
    { icon: "sql-server", label: "SQL Server" },
    { icon: "localstorage", label: "Localstorage" },
    { icon: "none", label: "Nenhum" },
  ];
  const backgroundColors = [
    {
      class: "from-purple-700 to-orange-700",
      index: 0,
    },
    {
      class: "from-green-700 to-blue-700",
      index: 1,
    },
    {
      class: "from-fuchsia-600 to-purple-600",
      index: 2,
    },
    {
      class: " from-purple-500 to-purple-900",
      index: 3,
    },
    {
      class: "from-teal-400 to-yellow-200",
      index: 4,
    },
    {
      class: "from-amber-500 to-pink-500",
      index: 5,
    },
  ];
  function animateStep() {
    if (!backgroundColor || !tipoProjeto || language.length == 0) {
      setMessage({
        type: "Erro",
        text: "Preencha todos os campos",
        time: 2000,
      });
      return;
    }
    if (step > 1) {
      clearTimeout(timeOut.current);
      gsap.fromTo(".step", { x: 0 }, { x: 600, duration: 0.3 });
      timeOut.current = setTimeout(() => setStep(step - 1), 200);
    } else if (step == 1) {
      clearTimeout(timeOut.current);
      gsap.fromTo(".step", { x: 0 }, { x: -600, duration: 0.3 });
      timeOut.current = setTimeout(() => setStep(step + 1), 200);
    }
  }
  useEffect(()=>{
    localStorage.setItem("projects", JSON.stringify(projects))
  },[projects])

  useEffect(() => {
    if (showOptionsTypeProject) {
      gsap.fromTo(
        ".options-project",
        { opacity: 0, y: 12, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.15 }
      );
    }
  }, [showOptionsTypeProject]);

  useEffect(() => {
    if (modal) {
      gsap.fromTo(
        ".modal-container",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.15 }
      );
    }
  }, [modal]);

  const getRelevantFrameworks = () => {
    return frameworks.reduce((acc, item) => {
      const relevantFrameworks = item.frameworks.filter((framework) =>
        language.some((lang) => item.language.includes(lang))
      );
      return [...acc, ...relevantFrameworks];
    }, []);
  };
  const hasFrameworks = () => {
    return getRelevantFrameworks().length > 0;
  };

  function criarProjeto() {
    if (language.length > 0 && tituloProjeto && backgroundColor) {
      setProjects([
        ...projects,
        {
          id: Date.now(),
          languages: language,
          title: tituloProjeto,
          background: backgroundColor,
          type: tipoProjeto,
          frameworks: framework ?? "",
          databases: selectedDatabases ?? ""
        },
      ]);
      const tl = gsap.timeline();
      tl.to(".modal-projeto", {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
      });
      tl.to(".modal-container", {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
        onComplete: () => setModal(false),
      });
    }
    
  }

  useEffect(()=>{
    gsap.fromTo("[data-animate='projetos']", {opacity: 0, x:-32}, {opacity: 1, x:0, stagger: .1})
  },[])
  return (
    <>
      <div className="relative w-[80%] mx-auto">
        <h1
          className="text-[4rem] text-dark-50 font-medium mt-[4rem] mb-[.8rem]"
          data-animate="projetos"
        >
          Projetos
        </h1>
        <p className="text-[1.5rem] text-dark-300" data-animate="projetos">
          Aqui é onde você organiza e gerencia seus projetos.
        </p>
        <div className="projetos-container mt-[4rem] grid grid-cols-5 gap-[2rem]">
          {/* <div className="projeto-card bg-gradient-to-tr from-purple-700 to-orange-700 p-[2.6rem] flex text-dark-50 rounded-md text-[2rem] font-semibold w-[260px] h-[160px] relative" data-animate="projetos">
            <span>Todo list</span>
             <Braces
              color="#333"
              strokeWidth={1.5}
              className="w-20 h-20 rounded-full absolute -left-8 -top-8 bg-dark-100 p-[1rem]"
            /> 
            <div className="ml-auto mt-auto flex gap-[.4rem]">
              <UserRoundPlus color="#fff" strokeWidth={1.5} />
              <Star color="#fff" strokeWidth={1.5} />
            </div>
          </div> */}

          <div
            className="projeto-card bg-[#222222] flex justify-center items-center text-dark-50 rounded-md text-[1.7rem] font-semibold w-[260px] h-[160px] cursor-pointer"
            data-animate="projetos"
            onClick={() => {
              setModal(true);
              setStep(1);
              setTipoProjeto("");
              setTituloProjeto("");
              setSelectedDatabases([]);
              setFramework([]);
              setLanguage([]);
            }}
          >
            <span>Criar projeto</span>
          </div>
          {projects.sort((a, b)=> b.id - a.id).map((proj, index) => {
            return (
              <div
                key={index}
                className={`projeto-card bg-gradient-to-tr ${
                  backgroundColors[proj.background].class
                } p-[2.6rem] flex flex-col text-dark-50 rounded-md font-semibold min-w-[260px] h-[160px] relative`}
                data-animate="projetos"
              >
                <div>
                  <span className="text-[2.3rem]">{proj.title}</span>
                  <p className="mt-[.4rem] text-[1.3rem]">{proj.type}</p>
                </div>
                <div className="flex mt-[1rem] gap-[.4rem]">
                  {proj.languages.map((img, index) => {
                    return (
                      <img width={24} key={index} src={`/icons/${img}.svg`} />
                    );
                  })}
                  {proj.frameworks.map((img, index) => {
                    return (
                      <img width={24} key={index} src={`/icons/${img}.svg`} />
                    );
                  })}
                  {proj.databases.map((img, index) => {
                    return (
                      <img width={24} key={index} src={`/icons/${img}.svg`} />
                    );
                  })}
                  {/* <UserRoundPlus color="#fff" strokeWidth={1.5} />
                  <Star color="#fff" strokeWidth={1.5} /> */}
                </div>
                <button className="absolute right-4 top-2">
                  <Ellipsis width={20} />
                </button>
                <div className="modal-project-options bg-dark-900 border border-dark-500 border-opacity-50 p-[1rem] rounded-md absolute right-0">
                  <button className="text-[1.3rem] font-medium flex gap-[1rem] items-center hover:bg-dark-800 w-full p-[.6rem] rounded-md hover:bg-opacity-50 text-red-400">
                    <Trash2 width={18} />
                    Excluir projeto
                  </button>
                  <button className="text-[1.3rem] font-medium flex gap-[1rem] items-center hover:bg-dark-800 w-full p-[.6rem] rounded-md hover:bg-opacity-50 text-dark-300">
                    <Settings width={18} />
                    Configurações 
                  </button>
                  <button className="text-[1.3rem] font-medium flex gap-[1rem] items-center hover:bg-dark-800 w-full p-[.6rem] rounded-md hover:bg-opacity-50 text-dark-300">
                    <Share width={18} />
                    Convidar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && (
        <div className="bg-dark-900 bg-opacity-30 fixed left-0 top-0 z-3 w-[100vw] h-[100vh] flex justify-center items-center modal-container">
          <div
            className={`modal-projeto bg-dark-950 p-[2rem] rounded-lg border-dark-700 min-h-[47%] flex flex-col w-[25%] overflow-x-hidden relative`}
          >
            <button
              className="absolute right-8 p-[.4rem] hover:bg-dark-800 hover:bg-opacity-50 rounded-md"
              onClick={() => {
                const tl = gsap.timeline();
                tl.to(".modal-projeto", {
                  opacity: 0,
                  scale: 0.9,
                  duration: 0.15,
                });
                tl.to(".modal-container", {
                  opacity: 0,
                  scale: 0.9,
                  duration: 0.15,
                  onComplete: () => setModal(false),
                });
              }}
            >
              <X className="text-dark-300" />
            </button>
            <h1 className="text-[3rem] font-semibold text-dark-100 mb-[1.6rem]">
              Criar projeto
            </h1>
            {step === 1 && (
              <>
                <section className="step h-full mb-auto">
                  <div className="select-color mb-[2rem]">
                    <span className="text-dark-300 text-[1.5rem]">
                      Cor da área de trabalho
                    </span>
                    <div className="flex mt-[.8rem] gap-[1rem]">
                      {backgroundColors.map((bg, index) => {
                        return (
                          <label
                            key={index}
                            className={`w-16 h-16 bg-gradient-to-tr block rounded-md ${bg.class} cursor-pointer`}
                          >
                            <input
                              type="radio"
                              name="cor-fundo"
                              value={bg.index}
                              onChange={({ target }) =>
                                setBackgroundColor(target.value)
                              }
                              checked={backgroundColor == bg.index}
                              hidden
                            />
                            {bg.index != backgroundColor && (
                              <div className="bg-dark-950 bg-opacity-70 w-full h-full rounded-md"></div>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="select-title mb-[2rem]">
                    <label
                      htmlFor="title"
                      className="text-dark-300 text-[1.5rem] block mb-[.4rem]"
                    >
                      Título do projeto
                    </label>
                    <input
                      type="text"
                      value={tituloProjeto}
                      onChange={({ target }) => setTituloProjeto(target.value)}
                      className="p-[1rem] w-full bg-dark-800 bg-opacity-50 rounded-md outline-none text-[1.5rem] text-dark-100"
                    />
                  </div>
                  <div
                    className="type-project mb-[2rem] text-dark-300 text-[1.5rem] font-medium relative"
                    onClick={() => {
                      setShowOptionsTypeProject(!showOptionsTypeProject);
                    }}
                  >
                    <div className=" mt-[.8rem] flex items-center border border-dark-700 border-opacity-50 rounded-md p-[1rem] relative">
                      <span>
                        {tipoProjeto ? tipoProjeto : "Tipo do projeto"}
                      </span>
                      <ChevronDown
                        className={`text-dark-800 ml-auto ${
                          showOptionsTypeProject ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {showOptionsTypeProject && (
                      <div
                        className="options-project absolute z-[3] top-[120%] border w-full bg-dark-950 left-0 gap-[.4rem] border-dark-700 border-opacity-50 rounded-md p-[1rem] flex flex-col text-[1.6rem]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label
                          onClick={() => {
                            gsap.to(".options-project", {
                              opacity: 0,
                              scale: 0.9,
                              duration: 0.15,
                              onComplete: () =>
                                setShowOptionsTypeProject(false),
                            });
                          }}
                          className={`p-[1rem] h-16 hover:bg-dark-800 hover:bg-opacity-50 rounded-md flex items-center ${
                            tipoProjeto === "Front-end"
                              ? "bg-dark-800 bg-opacity-50"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipo-projeto"
                            value={"Front-end"}
                            onChange={({ target }) => {
                              setTipoProjeto(target.value);
                              setLanguage([]);
                            }}
                            id=""
                            hidden
                          />
                          Front-end
                          {tipoProjeto === "Front-end" && (
                            <Check
                              className="ml-auto"
                              width={20}
                              height={20}
                              strokeWidth={1.5}
                            />
                          )}
                        </label>
                        <label
                          onClick={() => {
                            gsap.to(".options-project", {
                              opacity: 0,
                              scale: 0.9,
                              duration: 0.15,
                              onComplete: () =>
                                setShowOptionsTypeProject(false),
                            });
                          }}
                          className={`p-[1rem] h-16 hover:bg-dark-800 hover:bg-opacity-50 rounded-md flex items-center ${
                            tipoProjeto === "Back-end"
                              ? "bg-dark-800 bg-opacity-50"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipo-projeto"
                            value={"Back-end"}
                            onChange={({ target }) => {
                              setTipoProjeto(target.value);
                              setLanguage([]);
                            }}
                            id=""
                            hidden
                          />
                          Back-end
                          {tipoProjeto === "Back-end" && (
                            <Check
                              className="ml-auto"
                              width={20}
                              height={20}
                              strokeWidth={1.5}
                            />
                          )}
                        </label>
                        <label
                          onClick={() => {
                            gsap.to(".options-project", {
                              opacity: 0,
                              scale: 0.9,
                              duration: 0.15,
                              onComplete: () =>
                                setShowOptionsTypeProject(false),
                            });
                          }}
                          className={`p-[1rem] h-16 hover:bg-dark-800 hover:bg-opacity-50 rounded-md flex items-center ${
                            tipoProjeto === "Fullstack"
                              ? "bg-dark-800 bg-opacity-50"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipo-projeto"
                            value={"Fullstack"}
                            onChange={({ target }) => {
                              setTipoProjeto(target.value);
                              setLanguage([]);
                            }}
                            id=""
                            hidden
                          />
                          Fullstack
                          {tipoProjeto === "Fullstack" && (
                            <Check
                              className="ml-auto"
                              width={20}
                              height={20}
                              strokeWidth={1.5}
                            />
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                  {tipoProjeto && (
                    <div className="select-language">
                      <label
                        htmlFor="title"
                        className="text-dark-300 text-[1.5rem] block mb-[.4rem]"
                      >
                        Linguagens utilizadas
                      </label>
                      <div className="select-languages flex flex-col max-h-[200px] overflow-y-scroll mb-[2rem]">
                        {programmingLanguages.map((p, index) => {
                          if (
                            tipoProjeto.toLowerCase() == p.type ||
                            tipoProjeto.toLowerCase() === "fullstack"
                          )
                            return (
                              <label
                                key={index}
                                className={`flex items-center gap-[1rem] text-[1.6rem] font-medium mt-[1rem] capitalize hover:bg-dark-800 hover:bg-opacity-50 p-[1rem] rounded-md text-dark-100 ${
                                  language.includes(p.icon.toLowerCase())
                                    ? "bg-dark-800 bg-opacity-50"
                                    : ""
                                }`}
                              >
                                <img
                                  src={`/icons/${p.icon}.svg`}
                                  width={32}
                                  key={index}
                                  alt=""
                                />
                                <input
                                  type="checkbox"
                                  name="language"
                                  checked={p.icon === language}
                                  value={p.icon}
                                  onChange={({ target }) => {
                                    if (
                                      !language.includes(
                                        target.value.toLowerCase()
                                      )
                                    ) {
                                      setLanguage([
                                        ...language,
                                        target.value.toLowerCase(),
                                      ]);
                                    }
                                    if (
                                      language.includes(
                                        target.value.toLowerCase()
                                      )
                                    ) {
                                      const languagesSort = language.filter(
                                        (i) => i != target.value.toLowerCase()
                                      );
                                      setLanguage(languagesSort);
                                    }
                                  }}
                                  hidden
                                />
                                {p.label}
                                {language.includes(p.icon.toLowerCase()) && (
                                  <Check
                                    strokeWidth={2}
                                    className="ml-auto mr-4"
                                  />
                                )}
                              </label>
                            );
                        })}
                      </div>
                    </div>
                  )}
                </section>
              </>
            )}

            {step == 2 && (
              <>
                <section className="step h-full mb-auto">
                  {hasFrameworks() && (
                    <div className="select-framework">
                      <label
                        htmlFor="title"
                        className="text-dark-300 text-[1.5rem] block mb-[.4rem]"
                      >
                        Frameworks utilizados
                      </label>
                      <div className="select-languages flex flex-col max-h-[200px] overflow-y-scroll mb-[2rem]">
                        {frameworks.map((f) => {
                          if (
                            f.language.some((item) => language.includes(item))
                          )
                            return f.frameworks.map((frame, index) => {
                              return (
                                <label
                                  key={index}
                                  className={`flex items-center gap-[1rem] text-[1.6rem] font-medium mt-[1rem] capitalize hover:bg-dark-800 hover:bg-opacity-50 p-[1rem] rounded-md text-dark-100 ${
                                    framework.includes(frame)
                                      ? "bg-dark-800 bg-opacity-50"
                                      : ""
                                  }`}
                                >
                                  <img
                                    src={`/icons/${frame}.svg`}
                                    width={32}
                                    key={index}
                                    alt=""
                                  />
                                  {frame}
                                  <input
                                    hidden
                                    checked={framework.includes(frame)}
                                    value={frame}
                                    onChange={({ target }) => {
                                      if (
                                        !framework.includes(
                                          target.value.toLowerCase()
                                        )
                                      ) {
                                        setFramework([
                                          ...framework,
                                          target.value.toLowerCase(),
                                        ]);
                                      } else {
                                        const sortedArray = framework.filter(
                                          (i) => i != target.value.toLowerCase()
                                        );
                                        setFramework(sortedArray);
                                      }
                                    }}
                                    type="checkbox"
                                    name="framework"
                                    id=""
                                  />
                                  {framework.includes(frame) && (
                                    <Check
                                      strokeWidth={2}
                                      className="ml-auto mr-4"
                                    />
                                  )}
                                </label>
                              );
                            });
                        })}
                      </div>
                    </div>
                  )}
                  <div className="select-framework">
                    <label
                      htmlFor="title"
                      className="text-dark-300 text-[1.5rem] block mb-[.4rem]"
                    >
                      Bancos de dados utilizados
                    </label>
                    <div className="select-languages flex flex-col max-h-[200px] overflow-y-scroll mb-[2rem]">
                      {databases.map((p, index) => {
                        return (
                          <label
                            key={index}
                            className={`flex items-center gap-[1rem] text-[1.6rem] font-medium mt-[1rem] capitalize hover:bg-dark-800 hover:bg-opacity-50 p-[1rem] rounded-md text-dark-100 ${
                              selectedDatabases.includes(p.icon.toLowerCase())
                                ? "bg-dark-800 bg-opacity-50"
                                : ""
                            }`}
                          >
                            <img
                              src={`/icons/${p.icon}.svg`}
                              width={32}
                              key={index}
                              alt=""
                            />
                            <input
                              checked={selectedDatabases.includes(p.label)}
                              value={p.icon.toLowerCase()}
                              onChange={({ target }) => {
                                if (!selectedDatabases.includes(target.value)) {
                                  setSelectedDatabases(() => [
                                    ...selectedDatabases.filter(
                                      (i) => i != "nenhum"
                                    ),
                                    target.value,
                                  ]);
                                } else {
                                  setSelectedDatabases(() =>
                                    selectedDatabases.filter(
                                      (i) => i != p.icon.toLowerCase()
                                    )
                                  );
                                }
                                if (target.value === "nenhum") {
                                  setSelectedDatabases(["nenhum"]);
                                }
                              }}
                              type="checkbox"
                              name="language"
                              hidden
                            />
                            {p.label}
                            {selectedDatabases.includes(
                              p.icon.toLowerCase()
                            ) && (
                              <Check
                                className="ml-auto"
                                width={20}
                                height={20}
                                strokeWidth={1.5}
                              />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            <div className="steps-action flex justify-between mt-auto">
              {step > 1 && (
                <button
                  onClick={animateStep}
                  className="bg-dark-50 text-dark-900 text-[1.5rem] p-[1.5rem] rounded-md font-semibold"
                >
                  Voltar
                </button>
              )}
              <button
                onClick={step == 2 ? criarProjeto : animateStep}
                className="bg-dark-50 text-dark-900 text-[1.5rem] p-[1.5rem] rounded-md font-semibold ml-auto"
              >
                {step == 2 ? "Criar projeto" : "Avançar"}
              </button>
            </div>
          </div>
        </div>
      )}
      {message && (
        <Message {...message} message={message} setMessage={setMessage} />
      )}
    </>
  );
};

export default Projetos;
