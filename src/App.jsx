import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Projetos from "./views/Projetos";
import Container from "./components/Container";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/projetos" element={<Projetos />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
