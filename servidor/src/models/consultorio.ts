import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import sequelize from '../db/connection';

interface IConsultorioAttributes{
    id: number
    nomenclatura:string
    informacion: string 
}

interface IConsultorioCreationAttributes extends Optional <IConsultorioAttributes, 'id'> {}
const Consultorio: ModelDefined<IConsultorioAttributes, IConsultorioAttributes> = sequelize.define('Consultorio', {

idconsultorios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomenclatura: {
    type: DataTypes.STRING,
    allowNull: false
  },
  informacion: {
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
  tableName: 'consultorios',
  timestamps: true
});

export default Consultorio;
