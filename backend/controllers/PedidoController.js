import { db } from '../db.js';

export const getPedidos = (_, res) => {
    const q = `
      SELECT 
        p.id,
        p.data_pedido,
        a.nome AS animal_nome,
        u.nome AS usuario_nome
      FROM
        pedidos p
      INNER JOIN animais a
        ON p.animal_id = a.id
      INNER JOIN usuarios u
        ON u.id = p.usuario_id
    `;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
  
      return res.status(200).json(data);
    });
};

export const addPedido = (req, res) => {
  const { usuario_id, animal_id, data_pedido } = req.body;

  if (!usuario_id || !animal_id  || !data_pedido) {
    return res.status(400).json("Os campos userId, animalId e dataPedido são obrigatórios.");
  }

  const q = "INSERT INTO pedidos (usuario_id, animal_id, data_pedido) VALUES (?, ?, ?)";
  const values = [usuario_id, animal_id, data_pedido];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(201).json({ id: result.insertId });
  });
};


export const updatePedido = (req, res) => {
  const { id } = req.params;
  const { data_pedido } = req.body;

  if (!data_pedido) {
    return res.status(400).json("O campo dataPedido é obrigatório.");
  }

  const q = "UPDATE pedidos SET data_pedido = ? WHERE id = ?";
  const values = [data_pedido, id];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json("Pedido de adoção não encontrado.");
    }

    return res.status(200).json("Pedido de adoção atualizado com sucesso.");
  });
};

export const deletePedido = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM pedidos WHERE id = ?";

  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json("Pedido de adoção não encontrado.");
    }

    return res.status(200).json("Pedido de adoção deletado com sucesso.");
  });
};
