import express from 'express';
import { getAnimais, addAnimais, updateAnimais, deleteAnimais } from '../controllers/animais.js'; 
const router = express.Router();

router.get('/', getAnimais);
router.post('/', addAnimais);
router.put('/:id', updateAnimais);
router.delete('/:id', deleteAnimais);

export default router;
