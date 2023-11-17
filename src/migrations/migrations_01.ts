import { QueryInterface } from "sequelize";
import { User } from "../models/user.model";
import { sequelize } from "../configs/sequelize.config";

export async function up(queryInterface: QueryInterface) {
    await sequelize.sync({force: true});
    User.create();
}