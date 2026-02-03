//Importar las dependencias

import { Router } from 'express';
import { getContact, createContact } from "./contact.controller.js";
import {  validateCreateContact } from '../../middlewares/contact-validators.js';
import {  uploadContactImage } from "../../middlewares/contact-uploader.js";

const router = Router();

//Rutas GET
router.get('/', getContact);

//Rutas POST
router.post('/', uploadContactImage.single('image'), validateCreateContact, createContact);

//Rutas PUT

//Rutas DELETE

export default router;