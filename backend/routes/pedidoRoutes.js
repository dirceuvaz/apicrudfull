import express from 'express';
import { 
    getPedidos, 
    addPedido, 
    updatePedido, 
    deletePedido 
} from '../controllers/PedidoController.js';

const router = express.Router();

router.get('/', getPedidos);  
router.post('/', addPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

export default router;