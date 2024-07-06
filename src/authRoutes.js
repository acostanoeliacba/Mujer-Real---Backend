import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getConnection } from './database/connections/Mysql';
import { generateToken } from './auth';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { nombre, edad, email, pais, password } = req.body;

    if (!nombre || !edad || !email || !pais || !password) {
        return res.status(400).json({ message: 'Solicitud incorrecta. Por favor llena todos los espacios.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = { nombre, edad, email, pais, password: hashedPassword };
    try {
        const connection = await getConnection();
        const [results] = await connection.query('INSERT INTO usuario SET ?', usuario);
        const token = generateToken({ id: results.insertId });
        res.status(201).send({ auth: true, token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, llena todos los campos.' });
    }

    try {
        const connection = await getConnection();
        const [results] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send({ auth: false, token: null, message: 'Contraseña incorrecta' });
        }

        const token = generateToken(user);
        res.status(200).send({ auth: true, token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
