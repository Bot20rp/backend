import Categoria from '../models/Categoria.js'; 
import { createBitacora } from './bitacora.controllers.js';

 export const insertarCategoriaPadre = async (req, res) => {
    console.log(req.body)
    const { nombre } = req.body.data;
    const UsuarioID = req.user.id;
    // Validar que el campo necesario esté presente
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
    }
    try {
      // Crear la categoría padre
      const nuevaCategoria = await Categoria.create({
        Nombre: nombre,
        CategoriaPadreID: null, // No tiene categoría padre
      });
      // Registro en la bitácora
      const message = `Categoria padre creada con ID: ${nuevaCategoria.CategoriaID}`;
      await createBitacora({ UsuarioID, message }, res);

      
      res.status(201).json({
        message: 'Categoría padre registrada exitosamente',
        categoria: nuevaCategoria,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar la categoría' });
    }
  };


  export const insertarCategoriaHija = async (req, res) => {
    console.log(req.body)
    const { nombre, categoria } = req.body.data; // Cambiar CategoriaPadreID por NombreCategoriaPadre
    const UsuarioID = req.user.id; 
    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !categoria) {
      return res.status(400).json({ message: 'El nombre y la categoría padre son obligatorios' });
    }
  
    try {
      // Buscar la categoría padre por su nombre
      const categoriaPadre = await Categoria.findOne({
        where: { Nombre: categoria },
      });
  
      if (!categoriaPadre) {
        return res.status(400).json({ message: 'La categoría padre no existe' });
      }
  
      // Crear la categoría hija
      const nuevaCategoriaHija = await Categoria.create({
        Nombre: nombre,
        CategoriaPadreID: categoriaPadre.CategoriaID, // Usar el ID de la categoría padre encontrada
      });
      
      const message = `Categoría hija creada con ID: ${nuevaCategoriaHija.CategoriaID}, bajo la categoría padre: ${categoriaPadre.Nombre}`;
      await createBitacora({ UsuarioID, message }, res);
  
      res.status(201).json({
        message: 'Categoría hija registrada exitosamente',
        categoria: nuevaCategoriaHija,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar la categoría hija' });
    }
  };



  export const modificarCategoriaPorNombre = async (req, res) => {
    const { nombreActual, nuevoNombre } = req.body; // Recibimos el nombre actual y el nuevo nombre
    const UsuarioID = req.user.id;
    try {
      // Buscar la categoría por su nombre actual
      const categoria = await Categoria.findOne({
        where: { Nombre: nombreActual },
      });
  
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
  
      // Si se proporciona NombreCategoriaPadre, buscar la categoría padre por su nombre
      // Actualizar el nombre de la categoría
      categoria.Nombre = nuevoNombre;
  
      // Guardar los cambios en la base de datos
      await categoria.save();
  
      const message = `Categoría modificada: ${nombreActual} a ${nuevoNombre}`;
      await createBitacora({ UsuarioID, message }, res);

      res.status(200).json({
        message: 'Categoría modificada exitosamente',
        categoria,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al modificar la categoría' });
    }
  };
  
  export const obtenerCategorias = async (req, res) => {
    try {
      // Obtener todas las categorías que no tienen una categoría padre (parentId es null)
      const categoriasPadres = await Categoria.findAll({
        where: {
          CategoriaPadreID: null, // Filtrar solo las categorías que no tienen un parentId
        },
      });
  
      res.status(200).json(categoriasPadres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las categorías' });
    }
  };
  
  export const eliminarCategoriaPorNombre = async (req, res) => {
    console.log(req.body.nombre)
    const { nombre } = req.body;  // Recibimos el nombre de la categoría a eliminar
    const UsuarioID = req.user.id;
    try {
      // Buscar la categoría por su nombre
      const categoria = await Categoria.findOne({
        where: { Nombre: nombre },
      });
  
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
  
      // Eliminar la categoría
      await categoria.destroy();
  
        // Registro en la bitácora
        const message = `Categoría eliminada: ${nombre}`;
        await createBitacora({ UsuarioID, message }, res);

      res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
  };