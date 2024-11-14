import { db } from "../../config/dbConfig.js";
import { DataTypes } from "sequelize";

const estante = db.define('Estante', {
    EstanteID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Ubicacion: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'Estante',
    timestamps: false 
  });

export default estante;