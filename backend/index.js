import express from 'express';
import cors from 'cors';
import compression from 'compression';

//Imports para rotas

import userRoutes from './routes/users.js'; //usuarios
import categoriasAnimaisRoutes from './routes/categoriasAnimais.js'; //categoria
import animaisRoutes from './routes/animais.js'; //animais
import voluntariosRoutes from './routes/voluntarios.js'; //voluntários
import pedidoRoutes from './routes/pedidoRoutes.js'; //pedidos


const app = express();
app.use(compression()); // compressão dos tamanhos dos pacotes
app.use(express.json());
app.use(cors({
  origin: '108.139.113.77',
}));

app.use('/', userRoutes);  // Rota para usuários

app.use('/categorias', categoriasAnimaisRoutes); // Rota para usuários

app.use('/animais', animaisRoutes); // Rota para animais

app.use('/voluntarios', voluntariosRoutes);// Rota para voluntários

app.use('/pedidos', pedidoRoutes);  // Rota para pediodos

// Start Server
app.listen(8800, () => {
  console.log('Servidor rodando na porta 8800');
});

