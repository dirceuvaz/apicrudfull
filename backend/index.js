import express from 'express';
import cors from 'cors';
import compression from 'compression';

//Imports para rotas
import { loginUser } from './controllers/user.js';
import userRoutes from './routes/users.js'; //usuarios
import categoriasAnimaisRoutes from './routes/categoriasAnimais.js'; //categoria
import animaisRoutes from './routes/animais.js'; //animais
import voluntariosRoutes from './routes/voluntarios.js'; //voluntários
import pedidoRoutes from './routes/pedidoRoutes.js'; //pedidos


const app = express();
app.use(compression()); // Habilita compressão para todas as respostas
app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.use('/', userRoutes);  // Rota para usuários
app.post('/login', loginUser);

app.use('/categorias', categoriasAnimaisRoutes); // Rota para usuários

app.use('/animais', animaisRoutes); // Rota para animais

app.use('/voluntarios', voluntariosRoutes);// Rota para voluntários

app.use('/pedidos', pedidoRoutes);  // Rota para pediodos

// Start Server
app.listen(8800, () => {
  console.log('Servidor rodando na porta 8800');
});
