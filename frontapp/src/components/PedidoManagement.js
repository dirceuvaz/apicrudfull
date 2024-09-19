import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// URL da API
const API_URL = 'https://apicrudfull-0e4zyy7o.b4a.run/pedidos'; // Endpoint correto da API

const PedidoManagementContainer = styled.div`
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

const PedidoTable = styled.table`
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

const PedidoManagement = () => {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({ usuario_id: '', animal_id: '', data_pedido: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPedidos();
  }, []);

  // Função para buscar pedidos da API
  const fetchPedidos = async () => {
    try {
      const response = await axios.get(`${API_URL}?t=${new Date().getTime()}`); // Adiciona um timestamp para evitar cache
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // Função para lidar com o envio do formulário (criar/atualizar pedido)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Atualizar pedido
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        // Criar novo pedido
        await axios.post(API_URL, form);
      }
      // Atualizar a lista de pedidos após operação
      fetchPedidos();
      // Resetar o formulário
      setForm({ usuario_id: '', animal_id: '', data_pedido: '' });
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar pedido:', error.response ? error.response.data : error.message);
      setErrorMessage('Erro ao salvar pedido.');
      setShowModal(true);
    }
  };

  // Função para lidar com a edição do pedido
  const handleEdit = (id) => {
    const pedido = pedidos.find(p => p.id === id);
    setForm({
      usuario_id: pedido.usuario_id,
      animal_id: pedido.animal_id,
      data_pedido: pedido.data_pedido
    });
    setEditId(id);
  };

  // Função para lidar com a exclusão do pedido
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Atualiza a lista de pedidos após exclusão
      fetchPedidos();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      setErrorMessage('Erro ao excluir pedido.');
      setShowModal(true);
    }
  };

  return (
    <PedidoManagementContainer>
      <FormContainer>
        <h2>{editId ? 'Editar Pedido' : 'Adicionar Pedido'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuário ID:</label>
            <input
              type="number"
              name="usuario_id"
              value={form.usuario_id || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Animal ID:</label>
            <input
              type="number"
              name="animal_id"
              value={form.animal_id || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Data do Pedido:</label>
            <input
              type="date"
              name="data_pedido"
              value={form.data_pedido || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {editId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
      </FormContainer>
      <PedidoTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data do Pedido</th>
            <th>Nome do Animal</th>
            <th>Nome do Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.data_pedido}</td>
              <td>{pedido.animal_nome}</td>
              <td>{pedido.usuario_nome}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(pedido.id)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(pedido.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </PedidoTable>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{errorMessage}</h2>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
    </PedidoManagementContainer>
  );
};

export default PedidoManagement;
