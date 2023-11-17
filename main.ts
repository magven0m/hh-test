import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv({ path: './.env' });
import { sequelize } from './src/configs/sequelize.config';
import { SequelizeStorage, Umzug } from 'umzug';
import { balanceRouter } from './src/routes/balance.controller';
const app = express();
const port = process.env.APP_PORT;

async function bootstrap() {
	const umzug = new Umzug({
		migrations: { glob: './src/migrations/*.ts' },
		context: sequelize.getQueryInterface(),
		storage: new SequelizeStorage({ sequelize }),
		logger: console
	});

	await umzug.up();

	app.use(express.json());
	app.use('/balance', balanceRouter);
	app.listen(port, () => console.log(`Server is running! Port: ${port}`));
}

bootstrap();
