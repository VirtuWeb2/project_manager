import { useState } from "react";
import Joi from "joi";
import axios from "axios";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import Message from "@components/Message";
import Loader from "@components/Loader";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import gsap from "@utils/gsap";
const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [codeUser, setCodeUser] = useState("");
  const { signed, setSigned, setUser, loadingData } = useContext(UserContext);
  const codigos = [0, 1, 2, 3, 4, 5];
  async function fazerLogin(e) {
    e.preventDefault();
    const userSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    });
    const user = { email };
    const { error } = userSchema.validate(user);
    if (error && error.message.includes("email")) {
      return setMessage({
        type: "error",
        title: "Email inválido",
        text: "Verifique o email digitado",
      });
    }

    if (!error) {
      setIsLoading(true);
      try {
        const response = await (
          await axios.post(`${import.meta.env.VITE_API_DEVELOPMENT}/login`, {
            user,
          })
        ).data;
        setMessage({
          type: "success",
          title: "Email enviado",
          text: "Enviamos para você um email com um código de login",
        });
        setEmailSent(true);
        setSigned(true);
        setUser(response.user);
        Cookies.set("authToken", response.data.token, { expires: 7 });
      } catch (error) {
        setMessage({
          type: "error",
          title: "Erro ao validar email",
          text: "Ocorreu um erro ao validar seu email, verifique o email digitado e tente novamente",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  const inputsRef = useRef([]);
  const updateCodeUser = () => {
    // Concatena todos os valores dos campos de entrada em uma única string
    const values = inputsRef.current.map((input) => input.value || "").join("");
    setCodeUser(values);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    // Verifica se o valor é um único número ou está vazio
    if (/^\d?$/.test(value)) {
      // Atualiza o valor do campo
      e.target.value = value;
      if (value === "" && index > 0) {
        // Se o valor está vazio, move o foco para o campo anterior
        inputsRef.current[index - 1].focus();
      } else if (value !== "" && index < inputsRef.current.length - 1) {
        // Se o valor é válido e não é o último campo, move o foco para o próximo campo
        inputsRef.current[index + 1].focus();
      }
      updateCodeUser();
    } else {
      // Se o valor não é válido, remove o último caractere
      e.target.value = e.target.value.slice(0, -1);
    }
  };
  async function confirmarCodigo(e) {
    e.preventDefault();
    const codeSchema = Joi.object({
      code: Joi.string().min(6).max(6),
    });
    const { error } = codeSchema.validate({ code: codeUser });
    if (!error) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_DEVELOPMENT}/login/validar-token`
        );
        console.log(response);
        setMessage({
          type: "success",
          title: "Usuário autenticado",
          text: "Você será redirecionado para os seus projetos",
        });
      } catch (error) {
        setMessage({
          type: "error",
          title: "Token inválido",
          text: "Verifique se o token foi inserido corretamente ou se já expirou",
        });
      }
      setIsLoading(false);
    } else {
      setMessage({
        type: "error",
        title: "Token inválido",
        text: "Você precisa preencher todos os campos de código.",
      });
    }
  }

  useEffect(() => {
    gsap.fromTo(
      "[data-animate='login']",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.15, ease: "elastic.out", duration: 2 }
    );
  }, []);

  if (loadingData) return null;
  if (loadingData === false) return <Navigate to={"/projetos"} />;
  if (loadingData === false && !signed) return (
      <section id="login">
        <div className="max-w-[80%] mx-auto mt-[20rem]">
          {!emailSent && (
            <>
              {/* <div className="max-w-[30%]"> */}
              <h1
                className="text-dark-50 text-[4rem] font-bold max-w-[20vw] leading-[1.2] mx-auto text-center"
                data-animate="login"
              >
                Acesse sua conta DevPlannr
              </h1>
              <form onSubmit={fazerLogin}>
                <div
                  className="flex flex-col w-[30%] mx-auto items-center mt-[4rem]"
                  data-animate="login"
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
                {email && (
                  <button
                    data-animate="login"
                    className="bg-dark-50 p-[1.6rem] text-[1.8rem] w-[30%] font-semibold rounded-md mt-[2rem] flex gap-[1rem] mx-auto justify-center items-center text-dark-900"
                  >
                    Entrar
                  </button>
                )}
                <Link
                  to={"/criar-conta"}
                  data-animate="login"
                  className="text-dark-300 max-w-[30%] mx-auto block mt-[1.2rem] text-[1.4rem]"
                >
                  Já possui uma conta ?{" "}
                  <span className="font-semibold text-dark-100">
                    Entrar agora
                  </span>
                </Link>
              </form>
              {/* </div> */}
            </>
          )}
          {emailSent && (
            <>
              {/* <Mails strokeWidth={1.5} className="text-dark-50 mx-auto w-[12.8rem] h-[12.8rem]" /> */}
              <div className="mx-auto text-dark-50 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={100}
                  height={100}
                  fill={"none"}
                  className=""
                >
                  <path
                    d="M2 5L8.91302 8.92462C11.4387 10.3585 12.5613 10.3585 15.087 8.92462L22 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 19.5C12 19.5 10.0691 19.4878 9.09883 19.4634C5.95033 19.3843 4.37608 19.3448 3.24496 18.2094C2.11383 17.0739 2.08114 15.5412 2.01577 12.4756C1.99475 11.4899 1.99474 10.5101 2.01576 9.52438C2.08114 6.45885 2.11382 4.92608 3.24495 3.79065C4.37608 2.65521 5.95033 2.61566 9.09882 2.53656C11.0393 2.48781 12.9607 2.48781 14.9012 2.53657C18.0497 2.61568 19.6239 2.65523 20.7551 3.79066C21.8862 4.92609 21.9189 6.45886 21.9842 9.52439C21.9947 10.0172 22 10.5086 22 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 17V14.5C20 14.5 18.5 13.5 18.5 13.5C18.5 13.5 17 14.5 15 14.5V17C15 20.5 18.5 21.5 18.5 21.5C18.5 21.5 22 20.5 22 17Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[4rem] font-semibold text-dark-50 mx-auto max-w-[30vw] text-center">
                Email com código de autenticação enviado
              </h1>
              <form
                className="w-[30%] mx-auto mt-[3rem]"
                onSubmit={confirmarCodigo}
              >
                <div className="grid grid-cols-6 gap-[1rem]">
                  <label className="text-[1.8rem] text-dark-300 mb-[.4rem] col-span-full">
                    Insira o código de 6 dígitos abaixo
                  </label>
                  {codigos.map((cod, index) => (
                    <input
                      key={index}
                      type="number"
                      className="w-full p-[1rem] rounded-md bg-dark-900 bg-opacity-50 text-[1.8rem] border border-dark-800 outline-none text-dark-100 focus:bg-dark-800 focus:border-dark-300 focus:border-opacity-50 focus:bg-opacity-35 ease-in-out duration-300 text-center"
                      ref={(el) => (inputsRef.current[index] = el)} // Armazena a referência do campo
                      onChange={(e) => handleChange(e, index)}
                      maxLength={1} // Define o comprimento máximo do campo como 1
                    />
                  ))}
                  <button className="col-span-full bg-dark-50 p-[1.6rem] rounded-md text-[1.8rem] font-semibold">
                    Confirmar código
                  </button>
                </div>
              </form>
            </>
          )}
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

export default Login;
