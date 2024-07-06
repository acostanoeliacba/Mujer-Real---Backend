import { getConnection } from "./../database/connections/Mysql";

const getAllInstructores = async (req, res) => {
    try {
        const connection = await getConnection();
        connection.query("SELECT id, nombre, curso_id, anos_oficio FROM instructor", (error, results) => {
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


const getInstructor = async (req, res) => {
    try {
        const connection = await getConnection();
        connection.query("SELECT id, nombre, curso_id, anos_oficio FROM instructor", [id], (error, results) => {
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


const addInstructor = async (req, res) => {
    try {
        const { nombre, curso_id, anos_oficio } = req.body;

        if (!nombre === undefined || !curso_id === undefined || !anos_oficio === undefined) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const instructor = { nombre, curso_id, anos_oficio };
        const connection = await getConnection();
        connection.query("INSERT INTO instructor SET ?", instructor, (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json({ message: "Instructor agregado" });
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, curso_id, anos_oficio } = req.body;

        if (!id || !nombre || !curso_id || !anos_oficio) {
            return res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const instructor = { nombre, curso_id, anos_oficio };
        const connection = await getConnection();
        connection.query("UPDATE instructor SET ? WHERE id = ?", [instructor, id], (error, results) => {
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

const deleteInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        connection.query("DELETE FROM instructor WHERE id = ?", [id], (error, results) => {
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
    getAllInstructores,
    getInstructor,
    addInstructor,
    updateInstructor,
    deleteInstructor
};