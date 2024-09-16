import express from 'express';
import {
  getCategoriasAnimais,
  addCategoriaAnimal,
  updateCategoriaAnimal,
  deleteCategoriaAnimal
} from '../controllers/categoriasAnimais.js';

const router = express.Router();

// Rota para obter todas as categorias de animais
router.get('/', getCategoriasAnimais);

// Rota para adicionar uma nova categoria de animal
router.post('/', addCategoriaAnimal);

// Rota para atualizar uma categoria de animal existente
router.put('/:id', updateCategoriaAnimal);

// Rota para deletar uma categoria de animal
router.delete('/:id', deleteCategoriaAnimal);

export default router;
