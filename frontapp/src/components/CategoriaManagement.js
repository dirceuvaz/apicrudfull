import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// URL da API
const API_URL = 'https://apicrudfull-0e4zyy7o.b4a.run/categorias'; // Endpoint correto da API

const CategoriaManagementContainer = styled.div`
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

const CategoriaTable = styled.table`
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

const CategoriaManagement = () => {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nome: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Função para buscar categorias da API
  const fetchCategorias = async () => {
    try {
      const response = await axios.get(`${API_URL}?t=${new Date().getTime()}`); // Adiciona um timestamp para evitar cache
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // Função para lidar com o envio do formulário (criar/atualizar categoria)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Atualizar categoria
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        // Criar nova categoria
        await axios.post(API_URL, form);
      }
      // Atualizar a lista de categorias após operação
      fetchCategorias();
      // Resetar o formulário
      setForm({ nome: '' });
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar categoria:', error.response ? error.response.data : error.message);
      setErrorMessage('Erro ao salvar categoria.');
      setShowModal(true);
    }
  };

  // Função para lidar com a edição da categoria
  const handleEdit = (id) => {
    const categoria = categorias.find(c => c.id === id);
    setForm(categoria);
    setEditId(id);
  };

  // Função para lidar com a exclusão da categoria
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Atualiza a lista de categorias após exclusão
      fetchCategorias();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      setErrorMessage('Erro ao excluir categoria.');
      setShowModal(true);
    }
  };

  return (
    <CategoriaManagementContainer>
      <FormContainer>
        <h2>{editId ? 'Editar Categoria' : 'Adicionar Categoria'}</h2>
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
          <button type="submit">
            {editId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
      </FormContainer>
      <CategoriaTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(categoria => (
            <tr key={categoria.id}>
              <td>{categoria.nome}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(categoria.id)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(categoria.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </CategoriaTable>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{errorMessage}</h2>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
    </CategoriaManagementContainer>
  );
};

export default CategoriaManagement;
