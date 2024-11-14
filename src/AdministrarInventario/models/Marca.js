import { db } from "../../config/dbConfig.js";
import { DataTypes } from "sequelize";

const marca =db.define('Marca', {
    MarcaID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Region: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'Marca',
    timestamps: false 
  });
  export default marca;
  