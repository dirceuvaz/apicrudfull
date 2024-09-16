import { db } from '../db.js';

// Função para obter todas as categorias de animais
export const getCategoriasAnimais = (_, res) => {
  const q = "SELECT * FROM categoria_animais";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json(data);
  });
};

// Função para adicionar uma nova categoria de animal
export const addCategoriaAnimal = (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json("Nome é obrigatório.");
  }

  const q = "INSERT INTO categoria_animais (nome) VALUES (?)";
  const values = [nome];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(201).json({ id: result.insertId });
  });
};


// Função para atualizar uma categoria de animal
export const updateCategoriaAnimal = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json("Nome é obrigatório.");
  }

  const q = "UPDATE categoria_animais SET nome = ? WHERE id = ?";
  const values = [nome, id];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json("Categoria de animal não encontrada.");
    }

    return res.status(200).json("Categoria de animal atualizada com sucesso.");
  });
};

// Função para deletar uma categoria de animal
export const deleteCategoriaAnimal = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM categoria_animais WHERE id = ?";

  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json("Categoria de animal não encontrada.");
    }

    return res.status(200).json("Categoria de animal deletada com sucesso.");
  });
};
