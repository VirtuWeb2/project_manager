import { Mail } from "lucide-react";
import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { useRef } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import gsap from "@utils/gsap";
import { useEffect } from "react";
const CriarConta = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function criarConta(e) {
    e.preventDefault();
    const userSchema = Joi.object({
      name: Joi.string().min(1).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    });
    const user = { name, email };
    const { error } = userSchema.validate(user);
    if (error && error.message.includes("email")) {
      return setMessage({
        type: "error",
        title: "Email inválido",
        text: "Verifique o email digitado",
      });
    }
    if (error && error.message.includes("email")) {
      return setMessage({
        type: "error",
        title: "Nome inválido",
        text: "Verifique o nome digitado",
      });
    }
    if (!error) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_DEVELOPMENT}/create-account`,
          { user }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    gsap.fromTo(
      "[data-animate='criar-conta']",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 2, stagger: 0.15, ease: "elastic.out" }
    );
  },[]);


  return (
    <section id="login">
      <div className="max-w-[80%] mx-auto mt-[20rem]">
        {/* <div className="max-w-[30%]"> */}
        <h1
          className="text-dark-50 text-[4rem] font-bold max-w-[20vw] leading-[1.2] mx-auto  text-center"
          data-animate="criar-conta"
        >
          Crie sua conta DevPlannr
        </h1>
        <form onSubmit={criarConta}>
          <div
            className="flex flex-col w-[30%] mx-auto items-center mt-[4rem]"
            data-animate="criar-conta"
          >
            <label
              htmlFor="name"
              className="text-dark-300 mr-auto text-[1.8rem] mb-[.4rem]"
            >
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
              className="w-full p-[1rem] rounded-md bg-dark-900 bg-opacity-50 text-[1.5rem] border border-dark-800 outline-none text-dark-100 focus:bg-dark-800 focus:border-dark-300 focus:border-opacity-50 focus:bg-opacity-35 ease-in-out duration-300"
            />
          </div>
          {name.length > 0 && (
            <div
              className="flex flex-col w-[30%] mx-auto items-center mt-[2rem]"
              data-animate="criar-conta"
            >
              <label
                htmlFor="name"
                className="text-dark-300 mr-auto text-[1.8rem] mb-[.4rem]"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                className="w-full p-[1rem] rounded-md bg-dark-900 bg-opacity-50 text-[1.5rem] border border-dark-800 outline-none text-dark-100 focus:bg-dark-800 focus:border-dark-300 focus:border-opacity-50 focus:bg-opacity-35 ease-in-out duration-300"
              />
            </div>
          )}
          {name && email && (
            <button
              className="bg-dark-50 p-[1.6rem] text-[1.8rem] w-[30%] font-semibold rounded-md mt-[2rem] flex gap-[1rem] mx-auto justify-center items-center text-dark-900"
              data-animate="criar-conta"
            >
              Criar conta
            </button>
          )}
          <Link
            to={"/criar-conta"}
            data-animate="criar-conta"
            className="text-dark-300 max-w-[30%] mx-auto block mt-[1.2rem] text-[1.4rem]"
          >
            Ainda não criou sua conta?{" "}
            <span className="font-semibold text-dark-100">Criar agora</span>
          </Link>
        </form>
        {/* </div> */}
      </div>
      {message && (
        <Message
          {...message}
          message={message}
          setMessage={setMessage}
          time={3000}
        />
      )}
      {isLoading && <Loader />}
    </section>
  );
};

export default CriarConta;
