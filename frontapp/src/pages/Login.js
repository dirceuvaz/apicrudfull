import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    margin: 10px;
    padding: 10px;
  }
`;

const AvisoLogin = styled.h4`{ 
  text-align: center;   
  margin: 40px auto;
  padding: 20px 15px;   

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
}
`;

const Voltar = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #03a64a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #003d1a;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #154a89;
    transform: translateY(0px);
  }
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 12px;
  cursor: pointer;
  background-color: #03a64a;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #003d1a;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Title = styled.h1`
  color: black;
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  padding: 20px 15px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    margin: 10px;
    padding: 10px;
  }
`;

const Title2 = styled.h2`
  color: black;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    height: auto;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://apicrudfull-0e4zyy7o.b4a.run/login", {
        email,
        senha,
      });
      console.log("Login successful:", response.data);
      toast.success(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message,
      );
      toast.error(error.response?.data || "Erro no login!");
    }
  };

  return (
    <Container>
      <Title>Patas do Amanhã</Title>
      <FormContainer onSubmit={handleLogin}>
        <Title2>Para Acessar</Title2>
        <br />
        <AvisoLogin>
          Email: demo@gmail.com
          <br/>
          Senha: demo
          </AvisoLogin>        
        <br />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </FormContainer>
      <Voltar onClick={() => navigate("/")}>Voltar</Voltar>
      <Footer>Patas do Amanhã - Desenvolvido pelo Grupo 25</Footer>
    </Container>
  );
};

export default Login;