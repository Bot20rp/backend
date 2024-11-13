import Usuario from './Usuario.js';
import Documento from './Documento.js';
import Telefono from './Telefono.js';
import DetalleDocumento from './DetalleDocumento.js';
import Empleado from './Empleado.js'; 
import Combo from './Combo.js';
import DetalleCombo from './DetalleCombo.js';
import Producto from './Producto.js';
import facturaCompra from './FacturaCompra.js';
import almacenamiento from './Almacenamiento.js';
import proveedor from './Proveedor.js';
import Volumen from './Volumen.js';
import CantidadVolumen from './CantidadVolumen.js';
import marca from './Marca.js';
import estante from './Estante.js';
import Categoria from './Categoria.js';
import cliente from './Cliente.js';
import Factura from './Factura.js';
import TipoVenta from './TipoVenta.js';
import NotaVenta from './NotaVenta.js';
import DetalleVenta from './DetalleVenta.js';
import Transaccion from './Transaccion.js';
import Apertura from './Apertura.js';
import TipoPago from './TipoPago.js';
import VentaCombo from './VentaCombo.js';
import Suministro from './Suministro.js';



// Relación entre Usuario y DetalleDocumento
Usuario.hasMany(DetalleDocumento, { foreignKey: 'UsuarioID', as: 'DetalleDocumentos' });
DetalleDocumento.belongsTo(Usuario, { foreignKey: 'UsuarioID', as: 'Usuario' });

// Relación entre Documento y DetalleDocumento
Documento.hasMany(DetalleDocumento, { foreignKey: 'DocumentoID', as: 'DetalleDocumentos' });
DetalleDocumento.belongsTo(Documento, { foreignKey: 'DocumentoID', as: 'Documento' });

// Relación entre Usuario y Telefono
Usuario.hasMany(Telefono, { foreignKey: 'UsuarioID', as: 'Telefonos' });
Telefono.belongsTo(Usuario, { foreignKey: 'UsuarioID', as: 'Usuario' });

Usuario.hasOne(Empleado, {
    foreignKey: 'EmpleadoID',  // Debe ser 'EmpleadoID' en lugar de 'UsuarioID'
    as: 'Empleado',
});
Empleado.belongsTo(Usuario, {
    foreignKey: 'EmpleadoID',  // Debe ser 'EmpleadoID' aquí también
    targetKey: 'UsuarioID', // Asegúrate de que sea 'UsuarioID'
});
// Establecer la relación detalleCombo -- entre combo y producto 
// Relación entre DetalleCombo y Combo
DetalleCombo.belongsTo(Combo, { foreignKey: 'ComboID' });
Combo.hasMany(DetalleCombo, { foreignKey: 'ComboID' });

// Relación entre DetalleCombo y Producto
DetalleCombo.belongsTo(Producto, { foreignKey: 'ProductoID' });
Producto.hasMany(DetalleCombo, { foreignKey: 'ProductoID' });

// Definir relación entre Proveedor y FacturaCompra
proveedor.hasMany(facturaCompra, { foreignKey: 'ProveedorID' });
facturaCompra.belongsTo(proveedor, { foreignKey: 'ProveedorID' });

// Relaciones para la tabla almacenamiento
facturaCompra.hasMany(almacenamiento, { foreignKey: 'FacturaComID' });
almacenamiento.belongsTo(facturaCompra, { foreignKey: 'FacturaComID' });

Producto.hasMany(almacenamiento, { foreignKey: 'ProductoID' });
almacenamiento.belongsTo(Producto, { foreignKey: 'ProductoID' });

// para la tabla intermedia entre producto y volumen 
Producto.belongsToMany(Volumen, { through: CantidadVolumen, foreignKey: 'ProductoID' });
Volumen.belongsToMany(Producto, { through: CantidadVolumen, foreignKey: 'VolumenID' });

// Definir relaciones con las otras tablas
Producto.belongsTo(marca, { foreignKey: 'MarcaID' });
Producto.belongsTo(estante, { foreignKey: 'EstanteID' });
Producto.belongsTo(Categoria, { foreignKey: 'CategoriaID' });


// Definir relaciones con alias para evitar el problema de pluralización
NotaVenta.belongsTo(cliente, { foreignKey: 'ClienteID' });
NotaVenta.belongsTo(Factura, { foreignKey: 'FacturaID', as: 'Factura' });
NotaVenta.belongsTo(TipoVenta, { foreignKey: 'TipoVID', as: 'TipoVenta' }); // Definir alias explícito


Factura.hasOne(NotaVenta, { foreignKey: 'FacturaID', as: 'NotaVenta' });

//DetalleVenta
// Definimos las relaciones
Producto.hasMany(DetalleVenta, { foreignKey: 'ProductoID' });
NotaVenta.hasMany(DetalleVenta, { foreignKey: 'NotaVentaID' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'ProductoID' });
DetalleVenta.belongsTo(NotaVenta, { foreignKey: 'NotaVentaID' });

// Definimos las relaciones  transaccion 
TipoPago.hasMany(Transaccion, { foreignKey: 'TipoPagoID' });
NotaVenta.hasMany(Transaccion, { foreignKey: 'NotaVentaID' });
Apertura.hasMany(Transaccion, { foreignKey: 'AperturaID' });
Transaccion.belongsTo(TipoPago, { foreignKey: 'TipoPagoID' });
Transaccion.belongsTo(NotaVenta, { foreignKey: 'NotaVentaID' });
Transaccion.belongsTo(Apertura, { foreignKey: 'AperturaID' });

// Definimos las relaciones de Venta combo
Combo.hasMany(VentaCombo, { foreignKey: 'ComboID' });
NotaVenta.hasMany(VentaCombo, { foreignKey: 'NotaVentaID' });
VentaCombo.belongsTo(Combo, { foreignKey: 'ComboID' });
VentaCombo.belongsTo(NotaVenta, { foreignKey: 'NotaVentaID' });

// relacion producto suministro
Producto.hasOne(Suministro, {
    foreignKey: 'ProductoID',
    onDelete: 'CASCADE'
  });
  Suministro.belongsTo(Producto, { foreignKey: 'ProductoID' });

export {Usuario, Documento, Telefono, DetalleDocumento,Empleado,DetalleCombo,Combo,Producto,facturaCompra,almacenamiento,proveedor,
    estante,marca,Categoria,Volumen, Factura,cliente,TipoVenta,NotaVenta, DetalleVenta,TipoPago, VentaCombo,Suministro
};