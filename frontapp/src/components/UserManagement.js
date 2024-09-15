import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// URL da API
const API_URL = 'https://apicrudfull-0e4zyy7o.b4a.run'; // Base URL da API

const UserManagementContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
`;

const FormContainer = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Adiciona espaço entre os campos do formulário */
  }

  label {
    font-size: 16px;
    color: #333;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%; /* Faz com que o campo de entrada ocupe toda a largura disponível */
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #2c6b2f; /* Verde escuro */
    color: #fff;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #1b5bab;
    }
  }
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    margin-right: 10px; /* Adiciona espaço entre os botões */

    &.edit {
      background-color: #ffa000; /* Amber */
      &:hover {
        background-color: #ff6f00;
      }
    }

    &.delete {
      background-color: #f44336; /* Red */
      &:hover {
        background-color: #d32f2f;
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;

  h2 {
    margin-bottom: 15px;
  }

  button {
    margin-top: 10px;
    background-color: #f44336; /* Red */
    &:hover {
      background-color: #d32f2f;
    }
  }
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    fone: '',
    data_nascimento: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // Função para verificar se o email já existe
  const emailExists = (email) => {
    return users.some(user => user.email === email);
  };

  // Função para lidar com o envio do formulário (criar/atualizar usuário)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailExists(form.email)) {
      setEmailError('Email já cadastrado. Por favor, insira outro.');
      setShowModal(true);
      return;
    }

    try {
      if (editIndex !== null) {
        // Atualizar usuário
        const userId = users[editIndex].id;
        const response = await axios.put(`${API_URL}/${userId}`, form);
        const updatedUsers = [...users];
        updatedUsers[editIndex] = { ...response.data, id: userId };
        setUsers(updatedUsers);
        setEditIndex(null);
      } else {
        // Criar novo usuário
        const response = await axios.post(`${API_URL}/`, form);
        setUsers([...users, response.data]);
      }
      // Resetar o formulário
      setForm({
        nome: '',
        email: '',
        senha: '',
        fone: '',
        data_nascimento: ''
      });
    } catch (error) {
      console.error('Erro ao salvar usuário:', error.response ? error.response.data : error.message);
    }
  };

  // Função para lidar com a edição do usuário
  const handleEdit = (index) => {
    setForm(users[index]);
    setEditIndex(index);
  };

  // Função para lidar com a exclusão do usuário
  const handleDelete = async (index) => {
    try {
      const userId = users[index].id;
      await axios.delete(`${API_URL}/${userId}`);
      setUsers(users.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <UserManagementContainer>
      <FormContainer>
        <h2>{editIndex !== null ? 'Editar Usuário' : 'Criar Usuário'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              type="text"
              name="fone"
              value={form.fone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {editIndex !== null ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </FormContainer>
      <UserTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.fone}</td>
              <td>{user.data_nascimento}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(index)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(index)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </UserTable>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{emailError}</h2>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
    </UserManagementContainer>
  );
};

export default UserManagement;
