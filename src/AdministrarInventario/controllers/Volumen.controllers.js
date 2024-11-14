import Volumen from "../models/Volumen.js";

export const getVolumen = async (req, res) => {
    try {
        // Obtener todos los volúmenes de la base de datos
        const volumenes = await Volumen.findAll();

        // Verificar si existen registros
        if (volumenes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron volúmenes.' });
        }

        res.status(200).json({
            message: 'Volúmenes obtenidos exitosamente.',
            data: volumenes
        });
    } catch (error) {
        console.error("Error al obtener volúmenes:", error);
        res.status(500).json({ message: 'Error al obtener volúmenes.' });
    }
};

export const registrarVolumen = async (req, res) => {
    const { Descripcion } = req.body.data;

    // Validar que el campo Descripcion esté presente
    if (!Descripcion) {
        return res.status(400).json({ message: 'La descripción es obligatoria.' });
    }

    try {
        // Crear el nuevo volumen en la base de datos
        const nuevoVolumen = await Volumen.create({ Descripcion });

        res.status(201).json({
            message: 'Volumen registrado exitosamente.',
            data: nuevoVolumen
        });
    } catch (error) {
        console.error("Error al registrar el volumen:", error);
        res.status(500).json({ message: 'Error al registrar el volumen.' });
    }
};

