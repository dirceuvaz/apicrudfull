import express from 'express';
import {
  getCategoriasAnimais,
  addCategoriaAnimal,
  updateCategoriaAnimal,
  deleteCategoriaAnimal
} from '../controllers/categoriasAnimais.js';

const router = express.Router();

router.get('/', getCategoriasAnimais);
router.post('/', addCategoriaAnimal);
router.put('/:id', updateCategoriaAnimal);
router.delete('/:id', deleteCategoriaAnimal);

export default router;
