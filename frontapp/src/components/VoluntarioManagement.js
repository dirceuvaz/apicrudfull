import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// URL da API de voluntários
const VOLUNTARIOS_API_URL = 'https://apicrudfull-0e4zyy7o.b4a.run/voluntarios';

const VoluntarioManagementContainer = styled.div`
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

const VoluntarioTable = styled.table`
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

const VoluntarioManagement = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [form, setForm] = useState({ nome: '', contato: '', email: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchVoluntarios();
  }, []);

  // Função para buscar voluntários da API
  const fetchVoluntarios = async () => {
    try {
      const response = await axios.get(`${VOLUNTARIOS_API_URL}?t=${new Date().getTime()}`); // Adiciona um timestamp para evitar cache
      setVoluntarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar voluntários:', error);
    }
  };

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // Função para lidar com o envio do formulário (criar/atualizar voluntário)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', form); // Adicione este log para depuração

    try {
      if (editId) {
        // Atualizar voluntário
        await axios.put(`${VOLUNTARIOS_API_URL}/${editId}`, form);
      } else {
        // Criar novo voluntário
        await axios.post(VOLUNTARIOS_API_URL, form);
      }
      // Atualizar a lista de voluntários após operação
      fetchVoluntarios();
      // Resetar o formulário
      setForm({ nome: '', contato: '', email: '' });
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar voluntário:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data : 'Erro ao salvar voluntário.');
      setShowModal(true);
    }
  };

  // Função para lidar com a edição do voluntário
  const handleEdit = (id) => {
    const voluntario = voluntarios.find(v => v.id === id);
    setForm(voluntario);
    setEditId(id);
  };

  // Função para lidar com a exclusão do voluntário
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${VOLUNTARIOS_API_URL}/${id}`);
      // Atualiza a lista de voluntários após exclusão
      fetchVoluntarios();
    } catch (error) {
      console.error('Erro ao excluir voluntário:', error);
      setErrorMessage('Erro ao excluir voluntário.');
      setShowModal(true);
    }
  };

  return (
    <VoluntarioManagementContainer>
      <FormContainer>
        <h2>{editId ? 'Editar Voluntário' : 'Adicionar Voluntário'}</h2>
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
            <label>Contato:</label>
            <input
              type="text"
              name="contato"
              value={form.contato || ''}
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
          <button type="submit">
            {editId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
      </FormContainer>
      <VoluntarioTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {voluntarios.map(voluntario => (
            <tr key={voluntario.id}>
              <td>{voluntario.nome}</td>
              <td>{voluntario.contato}</td>
              <td>{voluntario.email}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(voluntario.id)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(voluntario.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </VoluntarioTable>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{errorMessage}</h2>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
    </VoluntarioManagementContainer>
  );
};

export default VoluntarioManagement;
