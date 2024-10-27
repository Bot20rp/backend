import Usuario from './Usuario.js';
import Documento from './Documento.js';
import Telefono from './Telefono.js';
import DetalleDocumento from './DetalleDocumento.js';
import Empleado from './Empleado.js'; 
import Combo from './Combo.js';
import DetalleCombo from './DetalleCombo.js';
import Producto from './Producto.js';



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



export {Usuario, Documento, Telefono, DetalleDocumento,Empleado,DetalleCombo,Combo,Producto};