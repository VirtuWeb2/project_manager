import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Projetos from "../views/Projetos";
import Container from "../components/Container";
import Header from "../components/Header";
import Home from "../views/Home";
import Login from "../views/Login";
import CriarConta from "../views/CriarConta";

function Main() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route path="/:userId/*" element={<Container><Projetos/></Container>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Main;
