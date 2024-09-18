import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import categoriasAnimaisRoutes from './routes/categoriasAnimais.js'; //categoria
import { loginUser } from './controllers/user.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'  // Permite todas as origens (não recomendado para produção)
}));

// Rotas de usuários
app.use('/', userRoutes);
app.post('/login', loginUser);

app.use('/categorias', categoriasAnimaisRoutes); // Rota para categorias

// Inicie o servidor
app.listen(8800, () => {
  console.log('Servidor rodando na porta 8800');
});
