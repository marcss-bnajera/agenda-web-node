'use strict';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';

//Rutas
import contactRoutes from '../src/contact/contact.routes.js';
import { dbConnection } from './db.js';

const BASE_URL = '/agendaWeb/v1';

const Middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb'}));
    app.use(express.json({ limit: '10mb'}));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
};

//Integracion de todas las rutas
const routes = (app) => {
    app.use(`${BASE_URL}/contact`, contactRoutes);
};

const initServer = async (app) => {

    app = express();

    const PORT = process.env.PORT || 3001;

    try {
        dbConnection();
        Middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`URL BASE: http://localhost:${PORT}${BASE_URL}`);
        });

        app.get(`${BASE_URL}/prueba`, (req, res) => {
            res.status(200).json(
                { 
                    status: 'ok',
                    service: 'Agenda Web',
                    version: '1.0.0',
                }
            );
        });

    } catch (error) {
        
        console.log(error);

    }
}

export { initServer };