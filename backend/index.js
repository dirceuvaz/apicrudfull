import express from "express"
import userRoutes from "./routes/users.js"
import cors from "cors"
import { loginUser } from "./controllers/user.js";

const app = express()

app.use(express.json())
app.use(cors({
  origin: "*"  // origin: '*' // Permite todas as origens (não recomendado para produção)
}))

app.use("/", userRoutes)
app.post("/login", loginUser);

// Inicie o servidor
app.listen(8800, () => {
    console.log("Servidor rodando na porta 8800");
  });