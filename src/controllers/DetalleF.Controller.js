import Factura from "../models/Factura.js";
import NotaVenta from "../models/NotaVenta.js";
import Cliente from "../models/Cliente.js";
import Usuario from "../models/Usuario.js";
import TipoVenta from "../models/TipoVenta.js";
import {Op} from "sequelize";

export const getDetalleF = async (req, res) => {
    const { fechaDesde, fechaHasta } = req.body;
  
    try {

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
      const resultado = facturas.map(factura => ({
        tipoVenta: factura.NotaVenta.TipoVenta.Nombre,
        fecha: factura.Fecha,
        comprobante: factura.NroFactura,
        cliente: factura.NotaVenta.Cliente.Usuario.Nombre,
        montoTotal: factura.NotaVenta.Total,
        estado: factura.Estado, 
      }));
  
      res.status(200).json(resultado);
    } catch (error) {
      console.error("Error al obtener facturas:", error);
      res.status(500).json({ message: "Error al obtener facturas." });
    }
  };
