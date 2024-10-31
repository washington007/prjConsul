import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Listararchivo from './listararchivo';

interface ILoginAttributes {
  id: number
  correo: string
  clave: string
}

interface ILoginCreationAttributes extends Optional<ILoginAttributes, 'id'> {}
const Login: ModelDefined<ILoginAttributes, ILoginCreationAttributes> = sequelize.define('Login', {
  
  idlogins: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'logins',
  timestamps: true,
});

// Exportar el modelo
export default Login;
