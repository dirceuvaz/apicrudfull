import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// URL da API de animais e categorias
const ANIMAIS_API_URL = 'https://apicrudfull-0e4zyy7o.b4a.run/animais';
const CATEGORIAS_API_URL = 'https://apicrudfull-0e4zyy7o.b4a.run/categorias'; 

const AnimalManagementContainer = styled.div`
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

  input, select {
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

const AnimalTable = styled.table`
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

const AnimalManagement = () => {
  const [animais, setAnimais] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nome: '', idade: '', categoria_id: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAnimais();
    fetchCategorias();
  }, []);

  // Função para buscar animais da API
  const fetchAnimais = async () => {
    try {
      const response = await axios.get(`${ANIMAIS_API_URL}?t=${new Date().getTime()}`); // Adiciona um timestamp para evitar cache
      setAnimais(response.data);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  };

  // Função para buscar categorias da API
  const fetchCategorias = async () => {
    try {
      const response = await axios.get(CATEGORIAS_API_URL);
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

  // Função para lidar com o envio do formulário (criar/atualizar animal)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Atualizar animal
        await axios.put(`${ANIMAIS_API_URL}/${editId}`, form);
      } else {
        // Criar novo animal
        await axios.post(ANIMAIS_API_URL, form);
      }
      // Atualizar a lista de animais após operação
      fetchAnimais();
      // Resetar o formulário
      setForm({ nome: '', idade: '', categoria_id: '' });
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar animal:', error.response ? error.response.data : error.message);
      setErrorMessage('Erro ao salvar animal.');
      setShowModal(true);
    }
  };

  // Função para lidar com a edição do animal
  const handleEdit = (id) => {
    const animal = animais.find(a => a.id === id);
    setForm(animal);
    setEditId(id);
  };

  // Função para lidar com a exclusão do animal
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ANIMAIS_API_URL}/${id}`);
      // Atualiza a lista de animais após exclusão
      fetchAnimais();
    } catch (error) {
      console.error('Erro ao excluir animal:', error);
      setErrorMessage('Erro ao excluir animal.');
      setShowModal(true);
    }
  };

  return (
    <AnimalManagementContainer>
      <FormContainer>
        <h2>{editId ? 'Editar Animal' : 'Adicionar Animal'}</h2>
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
            <label>Idade:</label>
            <input
              type="number"
              name="idade"
              value={form.idade || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Categoria:</label>
            <select
              name="categoria_id"
              value={form.categoria_id || ''}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">
            {editId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
      </FormContainer>
      <AnimalTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animais.map(animal => (
            <tr key={animal.id}>
              <td>{animal.nome}</td>
              <td>{animal.idade}</td>
              <td>{categorias.find(c => c.id === animal.categoria_id)?.nome || 'Desconhecida'}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(animal.id)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(animal.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </AnimalTable>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{errorMessage}</h2>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
    </AnimalManagementContainer>
  );
};

export default AnimalManagement;
