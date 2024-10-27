import Combo from '../models/Combo.js';
import DetalleCombo from '../models/DetalleCombo.js';
import Producto from '../models/Producto.js'; // Asegúrate de importar el modelo Producto

// Función para insertar un nuevo combo con sus productos
export const createCombo = async (req, res) => {
    const { Descripcion, FechaInicio, FechaFin, Precio, Estado, productos } = req.body;
    // Dentro de createCombo
console.log('Solicitud recibida en /api/combos');

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

export const getCombos = async (req, res) => {
    try {
        const combos = await Combo.findAll({
            include: [
                {
                    model: DetalleCombo,
                    include: [
                        {
                            model: Producto,
                            attributes: ['ProductoID', 'Nombre', 'Precio']
                        }
                    ],
                    attributes: [] // Opcional
                }
            ],
            attributes: ['ComboID', 'Descripcion', 'FechaInicio', 'FechaFin', 'Precio', 'Estado']
        });

        if (!combos.length) {
            return res.status(404).json({ message: 'No se encontraron combos.' });
        }

        return res.status(200).json(combos);
    } catch (error) {
        console.error("Error al obtener los combos:", error); // Muestra el error detallado
        return res.status(500).json({ message: 'Error al obtener los combos.' });
    }
};

export const updateCombo = async (req, res) => {
    try {
        const { id, FechaFin, Estado, Precio } = req.body; // Ahora el ID se obtiene del cuerpo de la solicitud

        // Verifica que se proporcione el ID
        if (!id) {
            return res.status(400).json({ message: "El ID del combo es requerido." });
        }

        // Crea un objeto vacío y agrega solo los campos que fueron enviados
        const updateData = {};
        if (FechaFin !== undefined) updateData.FechaFin = FechaFin;
        if (Estado !== undefined) updateData.Estado = Estado;
        if (Precio !== undefined) updateData.Precio = Precio;

        // Verifica que haya al menos un campo para actualizar, excluyendo el ID
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No se ha proporcionado ningún campo para actualizar." });
        }

        // Realiza la actualización en la base de datos
        const [updatedRows] = await Combo.update(updateData, { where: { ComboID: id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Combo no encontrado." });
        }

        return res.status(200).json({ message: "Combo actualizado exitosamente." });
    } catch (error) {
        console.error("Error al actualizar el combo:", error);
        return res.status(500).json({ message: "Error al actualizar el combo." });
    }
};
