import mysql from 'mysql2';
import config from '../config/mysql.config.js';

console.log("Config:", config);

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conectado a la base de datos');
        connection.release();
    }
});

// Función para obtener una conexión de la pool
export async function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error al obtener conexión:', err);
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

// Clase para manejar la conexión MySQL
export default class Mysql {
    constructor() {
        this.connection = pool;
        this.tryConnection();
    }

    tryConnection() {
        this.connection.getConnection((err, connection) => {
            if (err) {
                console.error('No se pudo conectar a la DATABASE', err);
            } else {
                console.log('Conectado a la DATABASE');
                connection.release(); // Liberar la conexión obtenida
            }
        });
    }
}
