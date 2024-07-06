import { getConnection } from "./../database/connections/Mysql";

const getAllCategorias = async (req, res) => {
    try {
        const connection = await getConnection();
        connection.query("SELECT id, nombre, director, estado FROM categorias", (error, results) => {
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


const getCategorias = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        connection.query("SELECT id, nombre, director, estado FROM categorias", [id], (error, results) => {
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


const addCategorias = async (req, res) => {
    try {
        const { nombre, director, estado } = req.body;

        if (!nombre === undefined || !director === undefined || !estado === undefined) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const categoria = { nombre, director, estado };
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

const updateCategorias = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, director, estado } = req.body;

        if (!id || !nombre || !director || !estado) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const categoria = { nombre, director, estado };
        const connection = await getConnection();
        connection.query("UPDATE categoria SET ? WHERE id = ?", [categoria, id], (error, results) => {
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

const deleteCategorias = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        connection.query("DELETE FROM categorias WHERE id = ?", [id], (error, results) => {
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
    getAllCategorias,
    getCategorias,
    addCategorias,
    updateCategorias,
    deleteCategorias
};