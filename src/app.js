import express from "express";
import morgan from "morgan";
import path from "path";
import usuarioRoutes from "./routes/usuario.routes";
import categoriasRoutes from "./routes/categorias.routes";
import cursosRoutes from "./routes/cursos.routes";
import instructorRoutes from "./routes/instructor.routes";
import authRoutes from "./authRoutes";
import { verifyToken } from "./auth";

const app = express();

// Settings
app.set("port", 4000);

// Middleware para servir archivos estáticos desde la carpeta pages
app.use(express.static(path.join(__dirname, '../pages')));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/usuario", usuarioRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/instructor", instructorRoutes);
app.use('/auth', authRoutes);

// Rutas protegidas
app.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Acceso autorizado' });
});

export default app;
