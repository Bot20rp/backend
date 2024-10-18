import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: '.env' });

// Crear la conexión a la base de datos
export const db = new Sequelize(
  process.env.DB_NAME || 'Licoreria',     // Valor por defecto para el nombre de la base de datos
  process.env.DB_USER || 'root',          // Valor por defecto para el usuario
  process.env.DB_PASSWORD || '',          // Valor por defecto para la contraseña
  {
    host: process.env.DB_HOST || 'localhost',  // Valor por defecto para el host
    port: process.env.DB_PORT || 3306,         // Valor por defecto para el puerto
    dialect: 'mysql',
    
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Función para autenticar y sincronizar la base de datos
const rundb = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Conexión establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export default rundb;
