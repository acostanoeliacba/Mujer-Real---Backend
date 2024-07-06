import { getConnection } from "./../database/connections/Mysql";

const getAllUsuarios = async (req, res) => {
    try {
        const connection = await getConnection();
        connection.query("SELECT id, nombre, edad, email, pais FROM usuario", (error, results) => {
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

const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        connection.query("SELECT id, nombre, edad, email, pais FROM usuario WHERE id = ?", [id], (error, results) => {
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

const addUsuario = async (req, res) => {
    try {
        const { nombre, edad, email, pais } = req.body;

        if (!nombre || !edad || !email || !pais) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const usuario = { nombre, edad, email, pais };
        const connection = await getConnection();
        connection.query("INSERT INTO usuario SET ?", usuario, (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json({ message: "Usuario agregado" });
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, email, pais } = req.body;

        if (!id || !nombre || !edad || !email || !pais) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const usuario = { nombre, edad, email, pais };
        const connection = await getConnection();
        connection.query("UPDATE usuario SET ? WHERE id = ?", [usuario, id], (error, results) => {
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

const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        connection.query("DELETE FROM usuario WHERE id = ?", [id], (error, results) => {
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
    getAllUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
};
