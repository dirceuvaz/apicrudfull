import express from 'express';
import cors from 'cors';
import compression from 'compression';

// Imports para rotas
import { loginUser } from './controllers/user.js';
import userRoutes from './routes/users.js'; // usuários
import categoriasAnimaisRoutes from './routes/categoriasAnimais.js'; // categorias
import animaisRoutes from './routes/animais.js'; // animais
import voluntariosRoutes from './routes/voluntarios.js'; // voluntários
import pedidoRoutes from './routes/pedidoRoutes.js'; // pedidos

const app = express();
app.use(compression()); // compressão de pacotes
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'https://apicrudfull.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem origem 
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // Usando cookies ou outros tipos de autenticação
  credentials: true,
}));

app.use('/', userRoutes);  // Rota para usuários
app.post('/login', loginUser);

app.use('/categorias', categoriasAnimaisRoutes); // Rota para categorias

app.use('/animais', animaisRoutes); // Rota para animais

app.use('/voluntarios', voluntariosRoutes);// Rota para voluntários

app.use('/pedidos', pedidoRoutes);  // Rota para pedidos

// Start Server
app.listen(8800, () => {
  console.log('Servidor rodando na porta 8800');
});
