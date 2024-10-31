import { DataTypes, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Login from './login';
import Consultorio from './consultorio';

interface IListarArchivoAttributes{
  id: number
  //nomenclatura:string
  //informacion: string 
  busqueda: string,
  nombres: string,
  fecha: string,
  opcion: string,
  file: string
}

interface IListarArchivoCreationAttributes extends Optional<IListarArchivoAttributes, 'id'> {}
const Listararchivo = sequelize.define('Listararchivo', {
  idlistararchivos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busqueda: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true
  },
  opcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  LoginId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'logins',
      key: 'idlogins'
    },
    onDelete: 'CASCADE'
  },
  ConsultorioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Consultorio,
      key: 'idconsultorios'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'listararchivos',
  timestamps: true,
});

// Definir la relación inversa
Listararchivo.belongsTo(Login, { foreignKey: 'LoginId' });

// Definir la relación con Consultorio
Listararchivo.belongsTo(Consultorio, { foreignKey: 'ConsultorioId' });

// Exportar el modelo
export default Listararchivo;
