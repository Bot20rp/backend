import Factura from "../models/Factura.js";
import NotaVenta from "../models/NotaVenta.js";
import Cliente from "../models/Cliente.js";
import Producto from "../models/Producto.js";
import DetalleVenta from "../models/DetalleVenta.js";
import Transaccion from "../models/Transaccion.js";
import TipoVenta from '../models/TipoVenta.js';
import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';


export const getTipoVenta= async (req, res)=>{
    try{
        const tiposVentas = await TipoVenta.findAll({
            attributes:['TipoVID','Nombre'],
        }); 

        res.status(200).json({
            message:'tipos de ventas obtenidos',
            tiposVentas,
        });
    }catch(error){
        console.error('error al obtener los tipos de ventas',error); 
        res.status(500).json({message:'Error al obtener los tipos de ventas',error:error.message});
    }
}

export const crearFactura = async (req, res) => {
  try {
    const { clienteID, productos, fecha, tipoVenta, totalVenta, pagoEfectivo, pagoQr, pagoTarjeta } = req.body;

    // Obtener el último número de factura
    const ultimaFactura = await Factura.findOne({ order: [['NroFactura', 'DESC']] });
    const nuevoNroFactura = ultimaFactura ? ultimaFactura.NroFactura + 1 : 1;

    // Validar existencia del cliente
    const cliente = await Cliente.findByPk(clienteID);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

    // Generar el Código de Control y Código de Autorización usando los procedimientos almacenados
   // Generar Código de Control
   await db.query('CALL GenerarCodigoControl(@CodigoControl)');
   const [codigoControlResult] = await db.query('SELECT @CodigoControl AS CodigoControl');
   console.log(codigoControlResult);

   await db.query('CALL GenerarCodigoDeAutorizacion(@CodigoDeAutorizacion)');
   const [codigoAutorizacionResult] = await db.query('SELECT @CodigoDeAutorizacion AS CodigoDeAutorizacion');
   console.log(codigoAutorizacionResult);
    
    const CodigoControl = codigoControlResult[0].CodigoControl; 
    const CodigoDeAutorizacion = codigoAutorizacionResult[0].CodigoDeAutorizacion;

    // Crear la factura
    const nuevaFactura = await Factura.create({
      NroFactura: nuevoNroFactura,
      Fecha: fecha,
      NIT: 534553,
      Detalle: "Venta de productos",
      CodigoControl,
      CodigoDeAutorizacion,
      TotalInteres: totalVenta,
      Estado: true,
    });

    // Crear la nota de venta asociada a la factura
    const nuevaNotaVenta = await NotaVenta.create({
      FacturaID: nuevaFactura.FacturaID,
      ClienteID: clienteID,
      TipoVID: tipoVenta,
      Total: totalVenta,
    });

    // Procesar cada producto en el array de productos
    for (const producto of productos) {
      const { productoID, cantidad } = producto;

      // Validar existencia del producto
      const productoExistente = await Producto.findByPk(productoID);
      if (!productoExistente) continue;

      // Crear detalle de venta para cada producto
      await DetalleVenta.create({
        ProductoID: productoID,
        NotaVentaID: nuevaNotaVenta.NotaVentaID,
        cantidad: cantidad,
      });
    }

    // Registrar transacciones para los diferentes tipos de pago
    const transacciones = [];
    if (pagoEfectivo > 0) {
      transacciones.push({
        TipoPagoID: 1, // ID de Efectivo
        NotaVentaID: nuevaNotaVenta.NotaVentaID,
        Monto: pagoEfectivo,
        AperturaID: req.aperturaID, // O el ID actual de la apertura
      });
    }
    if (pagoQr > 0) {
      transacciones.push({
        TipoPagoID: 2, // ID de QR
        NotaVentaID: nuevaNotaVenta.NotaVentaID,
        Monto: pagoQr,
        AperturaID: req.aperturaID,
      });
    }
    if (pagoTarjeta > 0) {
      transacciones.push({
        TipoPagoID: 3, // ID de Tarjeta
        NotaVentaID: nuevaNotaVenta.NotaVentaID,
        Monto: pagoTarjeta,
        AperturaID: req.aperturaID,
      });
    }

    await Transaccion.bulkCreate(transacciones);

    res.status(201).json({
      message: "Factura creada exitosamente",
      facturaID: nuevaFactura.FacturaID,
    });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res.status(500).json({ message: "Error al crear la factura" });
  }
};


