import Factura from "../models/Factura.js";
import NotaVenta from "../models/NotaVenta.js";
import Cliente from "../../AdministrarUsuario/models/Cliente.js";
import Usuario from "../../AdministrarUsuario/models/Usuario.js";
import TipoVenta from "../models/TipoVenta.js";
import {Op} from "sequelize";

export const getComprobantes = async (req, res) =>{
    console.log(req.body.data)
    const { fechaDesde, fechaHasta } = req.body.data;
  
    try {
      // Obtener las facturas dentro del rango de fechas
      const facturas = await Factura.findAll({
        where: {
          Fecha: {
            [Op.between]: [fechaDesde, fechaHasta],
          },
        },
        include: [
          {
            model: NotaVenta,
            as: 'NotaVenta',
            attributes: ['Total'],
            include: [
              {
                model: Cliente,
                as: 'Cliente',
                include: [
                  {
                    model: Usuario,
                    as: 'Usuario',
                    attributes: ['Nombre'],
                  },
                ],
              },
              {
                model: TipoVenta,
                as: 'TipoVenta',
                attributes: ['Nombre'],
              },
            ],
          },
        ],
      });
  
      // Mapear los resultados para simplificar el formato de respuesta
      const resultado = facturas.map(factura => ({
        tipoVenta: factura.NotaVenta.TipoVenta.Nombre,
        fecha: factura.Fecha,
        comprobante: factura.NroFactura,
        cliente: factura.NotaVenta.Cliente.Usuario.Nombre,
        montoTotal: factura.NotaVenta.Total,
      }));
  
      res.status(200).json(resultado);
    } catch (error) {
      console.error("Error al obtener facturas:", error);
      res.status(500).json({ message: "Error al obtener facturas." });
    }
  };
