import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const authRoutes = require('./authRoutes');
const { verifyToken } = require('./auth');

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();