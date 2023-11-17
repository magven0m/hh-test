import {Sequelize} from 'sequelize-typescript'
import { User } from '../models/user.model';

export const sequelize = new Sequelize({
	dialect: 'postgres',
	database: process.env.DATABASE_NAME,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	models: [
		User
	]
});
