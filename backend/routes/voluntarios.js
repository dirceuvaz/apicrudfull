import express from 'express';
import {
  getVoluntarios,
  addVoluntario,
  updateVoluntario,
  deleteVoluntario
} from '../controllers/voluntarios.js';

const router = express.Router();


router.get('/', getVoluntarios);
router.post('/', addVoluntario);
router.put('/:id', updateVoluntario);
router.delete('/:id', deleteVoluntario);

export default router;
