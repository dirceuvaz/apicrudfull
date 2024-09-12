import { db } from '../db.js';

export const loginUser = (req, res) => {
  const { email, senha } = req.body; 
  if (!email || !senha) {
    return res.status(400).json("Email e senha são obrigatórios.");
  }

  const q = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(q, [email, senha], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(401).json("Email ou senha incorretos.");
    }

    
    return res.status(200).json("Login bem-sucedido!");
  });
};

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`, `email`, `senha`, `fone`, `data_nascimento`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.senha,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err.message); 
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
