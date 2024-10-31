import {Sequelize} from "sequelize";
import { PostgresDialect } from "@sequelize/postgres";

const sequelize = new Sequelize('xxxxxxxxxx','xxxxxxxx','xxxxxxxxx',{
    host: 'xxx',
    dialect: 'postgres',
    port: 123,
});
export default sequelize;