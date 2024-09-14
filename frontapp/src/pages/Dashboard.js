import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarDash from "../components/NavbarDash";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  margin-right: 10px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
   width: 300px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const UserGrid = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color:#eeeee4;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({
    nome: "",
    email: "",
    senha: "",
    fone: "",
    data_nascimento: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://apicrudfull-0e4zyy7o.b4a.run");
      setUsers(res.data);
    } catch (error) {
      toast.error("Erro ao carregar usuários.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`https://apicrudfull-0e4zyy7o.b4a.run/${editingId}`, userDetails);
        toast.success("Usuário atualizado com sucesso.");
      } else {
        await axios.post("https://apicrudfull-0e4zyy7o.b4a.run", userDetails);
        toast.success("Usuário criado com sucesso.");
      }
      fetchUsers();
      setUserDetails({
        nome: "",
        email: "",
        senha: "",
        fone: "",
        data_nascimento: "",
      });
      setEditingId(null);
    } catch (error) {
      toast.error("Erro ao salvar usuário.");
    }
  };

  const handleEdit = (user) => {
    setUserDetails(user);
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://apicrudfull-0e4zyy7o.b4a.run/${id}`);
      toast.success("Usuário excluído com sucesso.");
      fetchUsers();
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
    }
  };

  return (
     <Wrapper>      
      <Container>
      <NavbarDash />
        <Title>Editar Usuários</Title>
        <p>Caso trave - Atualizar a página (f5)</p>
        <FormContainer onSubmit={handleSubmit}>
          <InputArea>
            <Label>Nome</Label>
            <Input
              type="text"
              value={userDetails.nome}
              onChange={(e) => setUserDetails({ ...userDetails, nome: e.target.value })}
            />
          </InputArea>
          <InputArea>
            <Label>E-mail</Label>
            <Input
              type="email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
          </InputArea>
          <InputArea>
            <Label>Senha</Label>
            <Input
              type="password"
              value={userDetails.senha}
              onChange={(e) => setUserDetails({ ...userDetails, senha: e.target.value })}
            />
          </InputArea>
          <InputArea>
            <Label>Telefone</Label>
            <Input
              type="text"
              value={userDetails.fone}
              onChange={(e) => setUserDetails({ ...userDetails, fone: e.target.value })}
            />
          </InputArea>
          <InputArea>
            <Label>Data de Nascimento</Label>
            <Input
              type="date"
              value={userDetails.data_nascimento}
              onChange={(e) => setUserDetails({ ...userDetails, data_nascimento: e.target.value })}
            />
          </InputArea>
          <Button type="submit">Salvar</Button>
        </FormContainer>
        <UserGrid>
          {users.map((user) => (
            <UserRow key={user.id}>
              <div>{user.nome}</div>
              <div>{user.email}</div>
              <div>{user.fone}</div>
              <div>{user.data_nascimento}</div>
              <div>
                <Button onClick={() => handleEdit(user)}>Editar</Button>
                <Button onClick={() => handleDelete(user.id)}>Excluir</Button>
              </div>
            </UserRow>
          ))}
        </UserGrid>
        <ToastContainer />
      </Container>
    </Wrapper>
  );
};

export default Dashboard;
