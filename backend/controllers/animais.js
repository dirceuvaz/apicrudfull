import { db } from '../db.js';

const getAnimais = (_, res) => {
    const q = "SELECT * FROM animais";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json(data);
    });
};

const addAnimais = (req, res) => {
    const q = "INSERT INTO animais (nome, idade, categoria_id) VALUES (?)";

    const values = [
        req.body.nome,
        req.body.idade,
        req.body.categoria_id,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(201).json("Animal adicionado com sucesso.");
    });
}

const updateAnimais = (req, res) => {
    const q = "UPDATE animais SET nome = ?, idade = ?, categoria_id = ? WHERE id = ?";

    const values = [
        req.body.nome,
        req.body.idade,
        req.body.categoria_id,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json("Animal atualizado com sucesso.");
    });
};

const deleteAnimais = (req, res) => {
    const q = "DELETE FROM animais WHERE id = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json("Animal deletado com sucesso.");
    });
};

export { getAnimais, addAnimais, updateAnimais, deleteAnimais };
