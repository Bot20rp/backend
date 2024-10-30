import Proveedor from "../models/Proveedor.js";
import FacturaCompra from "../models/FacturaCompra.js";
import Almacenamiento from "../models/Almacenamiento.js";
import { db } from "../config/dbConfig.js"; // Asegúrate de importar correctamente la configuración

export const registrarCompra = async (req, res) => {
    const { NroFactura, Fecha, CodigoAutorizacion, CodigoControl, ProveedorID, TotalInteres, TotalPagar, productos } = req.body.data;
    
    // Obtener ID del administrador desde el token o sesión
    // const administradorID = req.user?.id;

    // if (!administradorID) {
    //     return res.status(401).json({ error: "Administrador no autorizado" });
    // }

    // Iniciar una transacción para asegurar la consistencia
    const t = await db.transaction();
    
    try {
        // Crear la entrada en FacturaCompra
        const factura = await FacturaCompra.create({
            Fecha,
            NIT: NroFactura,
            CodigoDeAutorizacion: CodigoAutorizacion,
            CodigoControl,
            TotalInteres,
            ProveedorID,
            AdministradorID: administradorID,
        }, { transaction: t });

        // Recorrer los productos y crear cada registro en Almacenamiento
        for (const producto of productos) {
            const { ProductoID, cantidad, precioUnitario } = producto;

            await Almacenamiento.create({
                cantidad,
                precioUnitario,
                FacturaComID: factura.FacturaComID,
                ProductoID,
            }, { transaction: t });
        }

        // Confirmar la transacción
        await t.commit();

        res.status(201).json({ message: "Compra registrada con éxito", factura });

    } catch (error) {
        // Revertir la transacción en caso de error
        await t.rollback();
        console.error(error);
        res.status(500).json({ error: "Error al registrar la compra" });
    }
};

