process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Importaciones

import dotenv from 'dotenv';
import { initServer } from './config/app.js';

dotenv.config();

process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

//Iniciar el servidor
console.log('Iniciando el servidor de Agenda Web node... ');
initServer();