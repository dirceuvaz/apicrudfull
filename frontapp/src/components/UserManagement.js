import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// URL da API
const API_URL = 'https://apicrudfull-0e4zyy7o.b4a.run/';

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
    gap: 20px;
  }

  label {
    font-size: 16px;
    color: #333;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #2c6b2f;
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
    margin-right: 10px;

    &.edit {
      background-color: #ffa000;
      &:hover {
        background-color: #ff6f00;
      }
    }

    &.delete {
      background-color: #f44336;
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
    background-color: #f44336;
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
  const [editId, setEditId] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers(); // Fetch initial users
    const intervalId = setInterval(fetchUsers, 2000); // Fetch every 2 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
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
    return users.some(user => user.email === email && user.id !== editId);
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
      if (editId) {
        // Atualizar usuário
        await axios.put(`${API_URL}${editId}`, form);
      } else {
        // Criar novo usuário
        await axios.post(API_URL, form);
      }
      // Atualizar a lista de usuários após operação
      await fetchUsers(); // Atualiza os usuários imediatamente
      // Resetar o formulário
      setForm({
        nome: '',
        email: '',
        senha: '',
        fone: '',
        data_nascimento: ''
      });
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error.response ? error.response.data : error.message);
    }
  };

  // Função para lidar com a edição do usuário
  const handleEdit = (id) => {
    const user = users.find(u => u.id === id);
    setForm(user);
    setEditId(id);
  };

  // Função para lidar com a exclusão do usuário
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      // Atualiza a lista de usuários após exclusão
      await fetchUsers(); // Atualiza os usuários imediatamente
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <UserManagementContainer>
      <FormContainer>
        <h2>{editId ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={form.nome || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={form.senha || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              type="text"
              name="fone"
              value={form.fone || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {editId ? 'Atualizar' : 'Adicionar'}
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.fone}</td>
              <td>{user.data_nascimento}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(user.id)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Excluir</button>
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
