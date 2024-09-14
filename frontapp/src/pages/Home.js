import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const ScreenSize = styled.p`
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 14px;

  a {
    color: #f39c12;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
  }
`;

function Home() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <h2>Bem-vindo ao Patas do Amanhã - Controle de Doações</h2>
        <p>Essa aplicação utiliza uma API RestFull desenvolvida em Node.js.</p>
        <p>
          Projeto realizado pelo <b>Grupo 25 do Curso de ADS - Unifor.</b>
        </p>
        <br />
        <p>
          <i>Versão 1.00</i>
        </p>
      </Container>
      <Footer>Patas do Amanhã - Desenvolvido por Grupo 25</Footer>
    </>
  );
}

export default Home;
