import { db } from '../db.js';

export const getVoluntarios = (_, res) => {
  const q = "SELECT * FROM voluntarios";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json(data);
  });
};


export const addVoluntario = (req, res) => {
    const { nome, contato, email } = req.body;
  
    if (!nome || !contato || !email) {
      return res.status(400).json("Nome, contato e email são obrigatórios.");
    }
  
    const q = "INSERT INTO voluntarios (nome, contato, email) VALUES (?, ?, ?)";
    const values = [nome, contato, email];
  
    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      return res.status(201).json({ id: result.insertId });
    });
  };
  

  export const updateVoluntario = (req, res) => {
    console.log('Dados recebidos para atualização:', req.body); //log
  
    const { id } = req.params;
    const { nome, contato, email } = req.body;
  
    if (!nome || !contato || !email) {
      return res.status(400).json("Nome, contato e email são obrigatórios.");
    }
  
    const q = "UPDATE voluntarios SET nome = ?, contato = ?, email = ? WHERE id = ?";
    const values = [nome, contato, email, id];
  
    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (result.affectedRows === 0) {
        return res.status(404).json("Voluntário não encontrado.");
      }
  
      return res.status(200).json("Voluntário atualizado com sucesso.");
    });
  };
  

export const deleteVoluntario = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM voluntarios WHERE id = ?";

  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json("Voluntário não encontrado.");
    }

    return res.status(200).json("Voluntário deletado com sucesso.");
  });
};
