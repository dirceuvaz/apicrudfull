import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import categoriasAnimaisRoutes from './routes/categoriasAnimais.js'; // Importa as rotas de categorias de animais
import { loginUser } from './controllers/user.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'  // Permite todas as origens (não recomendado para produção)
}));

// Rotas de usuários
app.use('/', userRoutes);
app.post('/login', loginUser);

// Rotas de categorias de animais
app.use('/categorias', categoriasAnimaisRoutes);  // Prefixo para as rotas de categorias de animais

// Inicie o servidor
app.listen(8800, () => {
  console.log('Servidor rodando na porta 8800');
});
