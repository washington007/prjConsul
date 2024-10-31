"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const login_1 = __importDefault(require("./login"));
const consultorio_1 = __importDefault(require("./consultorio"));
const Listararchivo = connection_1.default.define('Listararchivo', {
    idlistararchivos: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    busqueda: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    opcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    file: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    LoginId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'logins',
            key: 'idlogins'
        },
        onDelete: 'CASCADE'
    },
    ConsultorioId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: consultorio_1.default,
            key: 'idconsultorios'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'listararchivos',
    timestamps: true,
});
// Definir la relación inversa
Listararchivo.belongsTo(login_1.default, { foreignKey: 'LoginId' });
// Definir la relación con Consultorio
Listararchivo.belongsTo(consultorio_1.default, { foreignKey: 'ConsultorioId' });
// Exportar el modelo
exports.default = Listararchivo;
