import { getConnection } from "./../database/connections/Mysql";

const getAllCursos = async (req, res) => {
    try {
        const connection = await getConnection();
        connection.query("SELECT id, nombre, categoria_id, cursada, precio, fecha_inicio, imagen FROM cursos", (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const getCursos = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        connection.query("SELECT id, nombre, categoria_id, cursada, precio, fecha_inicio, imagen FROM cursos", [id], (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const addCursos = async (req, res) => {
    try {
        const { nombre, categoria_id, cursada, precio, fecha_inicio, imagen } = req.body;

        if (!nombre === undefined || !categoria_id === undefined || !cursada === undefined || !precio === undefined || !fecha_inicio === undefined || !imagen === undefined) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const curso = { nombre, categoria_id, cursada, precio, fecha_inicio, imagen };
        const connection = await getConnection();
        connection.query("INSERT INTO cursos SET ?", cursos, (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json({ message: "Curso agregado" });
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateCursos = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria_id, cursada, precio, fecha_inicio, imagen } = req.body;

        if (!id || !nombre || !categoria_id || !cursada || !precio || !fecha_inicio || !imagen) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const cursos = { nombre, categoria_id, cursada, precio, fecha_inicio, imagen };
        const connection = await getConnection();
        connection.query("UPDATE cursos SET ? WHERE id = ?", [cursos, id], (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteCursos = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        connection.query("DELETE FROM cursos WHERE id = ?", [id], (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getAllCursos,
    getCursos,
    addCursos,
    updateCursos,
    deleteCursos
};
