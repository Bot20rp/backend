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