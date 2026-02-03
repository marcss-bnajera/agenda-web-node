'use strict';

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del contacto no puede exceder los 100 caracteres']
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
        maxLength: [11, 'El teléfono no puede exceder los 11 caracteres']
    },
    photo: {
        type: String,
        default: 'contact/agenda_web_nyvxo5',
    },
});

contactSchema.index({ contactName: 1 });
contactSchema.index({ contactNumber: 1 });

export default mongoose.model('Contact', contactSchema);