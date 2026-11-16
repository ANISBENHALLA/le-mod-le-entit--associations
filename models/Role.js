import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define(
  'Role',
  {
    id_role: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.STRING(255) },
  },
  { tableName: 'role', timestamps: false }
);

export default Role;
