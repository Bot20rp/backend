import Factura from "../models/Factura.js";
import NotaVenta from "../models/NotaVenta.js";
import Cliente from "../../AdministrarUsuario/models/Cliente.js";
import Usuario from "../../AdministrarUsuario/models/Usuario.js";
import TipoVenta from "../models/TipoVenta.js";
import {Op} from "sequelize";

export const getDetalleF = async (req, res) => {
    const { fechaDesde, fechaHasta } = req.body.data;
  
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


  export const anularFactura = async (req, res) => {

    console.log(req.body.data)
    const { nroFactura } = req.body.data;

    try {
        const factura = await Factura.findOne({ where: { NroFactura: nroFactura } });
        if (!factura) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }

        factura.Estado = false;
        await factura.save();

        res.status(200).json({ message: "Factura anulada exitosamente" });
    } catch (error) {
        console.error("Error al anular la factura:", error);
        res.status(500).json({ message: "Error al anular la factura" });
    }
};
