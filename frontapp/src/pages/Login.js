import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #2c73d2;
  color: white;
  border: none;
  border-radius: 5px;
`;

const Title = styled.h1`
color: black;
display: flex;
text-align: center;

`
const Container = styled.div`
display: flex;
align-items: center;
height: 50vh;
justify-content: center;
flex-direction: column;
padding: 3rem;
`

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 14px;
  
  // Estilos para links dentro do footer
  a {
    color: #f39c12;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/login", { email, senha });
      console.log("Login successful:", response.data);
      toast.success(response.data);
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      toast.error(error.response?.data || "Erro no login!");
    }
  };

  return (
    <Container>
    <Title>LOGIN</Title>
    <FormContainer onSubmit={handleLogin}>
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
    <Footer>Projeto CRUD React</Footer>
    </Container>
  );
};

export default Login;
