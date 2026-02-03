import Contact from "./contact.model.js"
 

export const getContact = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
 
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
 
        const contacts = await Contact.find()
            .limit(limitNum)
            .skip((pageNum - 1) * limitNum)
            .sort({ contactName: 1 });
 
        const total = await Contact.countDocuments();
 
        res.status(200).json({
            success: true,
            data: contacts,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalRecords: total,
                limit: limitNum
            }
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los contactos',
            error: error.message
        });
    }
};
 
/**
 * POST - Crear contacto
 */
export const createContact = async (req, res) => {
    try {
        const contactData = req.body;
 
        // MISMA LÓGICA QUE FIELD
        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const fileName = req.file.filename;
 
            const relativePath = fileName.substring(
                fileName.indexOf('contact/')
            );
 
            contactData.photo = `${relativePath}.${extension}`;
        } else {
            contactData.photo = 'contact/agenda_web_nyvxo5';
        }
 
        const contact = new Contact(contactData);
        await contact.save();
 
        res.status(201).json({
            success: true,
            message: 'Contacto creado exitosamente',
            data: contact
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el contacto',
            error: error.message
        });
    }
};
 
/**
 * PUT - Actualizar contacto
 * 
export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
 
        // MISMA LÓGICA QUE FIELD
        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const fileName = req.file.filename;
 
            const relativePath = fileName.substring(
                fileName.indexOf('contact/')
            );
 
            updateData.photo = `${relativePath}.${extension}`;
        }
 
        const contact = await Contact.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
 
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }
 
        res.status(200).json({
            success: true,
            message: 'Contacto actualizado correctamente',
            data: contact
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el contacto',
            error: error.message
        });
    }
};
 
// DELETE - Eliminar contacto

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
 
        const contact = await Contact.findByIdAndDelete(id);
 
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }
 
        res.status(200).json({
            success: true,
            message: 'Contacto eliminado correctamente'
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el contacto',
            error: error.message
        });
    }
};

*/