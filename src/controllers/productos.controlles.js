import producto, { createProducto, obtProducto, actProducto } from "../models/Producto.js";
import CantidadVolumen from "../models/CantidadVolumen.js";
import { createBitacora } from "./bitacora.controllers.js";

export const registrarProducto = async (req, res) => {
    // const {Nombre,Precio,Volumen,Marca,Estante,CategoriaID}=req.body
    console.log(req.body)
    try {
        const produc = await createProducto(req.body.data)
        await createBitacora({UsuarioID:req.user.id,message:"registro un nuevo producto"},res);
        res.status(200).json({ msj: "siuuuuu" })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}


// Función para registrar un producto con sus volúmenes asociados
export const registerProducto = async (req, res) => {
    console.log(req.body.data);
    const { Nombre, Precio, Marca, Estante, Categoria, Volumen } = req.body.data;
    const UsuarioID = req.user.id; // Obtener el ID del usuario logueado

    try {
        // Validar que todos los campos necesarios están presentes
        if (!Nombre || !Precio || !Marca || !Estante || !Categoria || !Volumen) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Crear el nuevo producto
        const newProducto = await producto.create({
            Nombre,
            Precio: parseFloat(Precio), // Convertir el precio a número
            MarcaID: parseInt(Marca), // Convertir a número
            EstanteID: parseInt(Estante),
            CategoriaID: parseInt(Categoria),
            Estado: 1 // Estado activo por defecto
        });

        // Asociar el volumen con el producto en la tabla intermedia CantidadVolumen
        await CantidadVolumen.create({
            ProductoID: newProducto.ProductoID,
            VolumenID: parseInt(Volumen) // Convertir a número
        });

        // Registrar el evento en la bitácora
        const message = `Producto reg: ${newProducto.ProductoID},Name: ${Nombre}`;
        await createBitacora({ UsuarioID, message });

        res.status(201).json({
            message: 'Producto registrado exitosamente.',
            producto: newProducto
        });
    } catch (error) {
        console.error('Error al registrar el producto:', error);
        res.status(500).json({ message: 'Error al registrar el producto.' });
    }
};


export const getProducto = async (req, res) => {
    // const {Nombre,Precio,MarcaID,Estante,Categoria,Volumen}=req.body
    console.log(req.body)
    try {
        const productos = await obtProducto()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

export const updateProducto = async (req, res) => {
    console.log(req.body.data)
    try {
        const productos = await actProducto(req.body.data)
        await createBitacora({UsuarioID:req.user.id,message:`actualizo el producto con ID ${req.body.data.id}`},res);
        res.status(200).json({ msg: "ACtualizacion exitosa" })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

export const deleteproducto = async (req, res) => {
    try {
        // Verifica si req.body.data contiene los datos esperados
        console.log(req.body.data);
        
        const { id } = req.body.data;
        
        // Encuentra el producto
        const existProd = await producto.findOne({ where: { ProductoID: Number(id) } });
        
        // Si el producto no existe, retorna un error 404
        if (!existProd) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        
        console.log("Producto encontrado, actualizando...");
        
        // Actualiza el estado del producto a false (eliminado)
        await existProd.update({ Estado: false });
        await createBitacora({UsuarioID:req.user.id,message:`elimino el producto con ID ${req.data.id}`},res);
        console.log("Producto actualizado con éxito");
        
        // Responde con éxito
        res.status(200).json({ msg: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        // En caso de error, responde con un código de error 500
        res.status(500).json({ msg: "Ocurrió un error al intentar eliminar el producto" });
    }
};


