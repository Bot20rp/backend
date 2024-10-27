import Combo from '../models/Combo.js';
import DetalleCombo from '../models/DetalleCombo.js';
import Producto from '../models/Producto.js'; // Asegúrate de importar el modelo Producto

// Función para insertar un nuevo combo con sus productos
export const createCombo = async (req, res) => {
    const { Descripcion, FechaInicio, FechaFin, Precio, Estado, productos } = req.body;

    try {
        // Validar que los campos obligatorios estén presentes
        if (!Descripcion || !FechaInicio || !FechaFin || !Precio || !productos || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios, incluyendo al menos un producto.' });
        }

        // Crear el nuevo combo
        const newCombo = await Combo.create({
            Descripcion,
            FechaInicio,
            FechaFin,
            Precio,
            Estado: Estado || 1 // Usa 1 como valor por defecto si no se proporciona
        });

        // Insertar productos en DetalleCombo
        const detalles = productos.map(productoID => ({
            ComboID: newCombo.ComboID,
            ProductoID: productoID
        }));

        await DetalleCombo.bulkCreate(detalles);

        // Devolver la respuesta
        return res.status(201).json({
            message: 'Combo y productos asociados creados exitosamente.',
            combo: newCombo,
            productos: detalles
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el combo y sus productos.' });
    }
};
