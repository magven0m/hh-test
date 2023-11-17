import express from 'express';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize-typescript';

export const balanceRouter = express.Router();

balanceRouter.post('/add', async (req, res) => {
	try {
		const { amount, userId }: { amount: number; userId: number } = req.body;

		const result = await User.update(
			{ balance: Sequelize.literal(`balance + ${amount}`) },
			{ where: { id: userId } }
		);

		if (result[0]) res.send('Done');
		else res.send('User not found!');
	} catch (err) {
		res.status(400).send('User not found!');
	}
});

balanceRouter.post('/reduce', async (req, res) => {
	const transaction = await User.sequelize.transaction();
	try {
		const { amount, userId }: { amount: number; userId: number } = req.body;

		const user = await User.findOne({ where: { id: userId }, transaction });
		if (!user) throw 'User not found!';

		await user.update({ balance: user.balance - amount }, { transaction });
		await transaction.commit();
		res.status(200).send('Done!');
	} catch (err) {
		await transaction.rollback();
		res.status(400).send(typeof err === 'string' ? err : 'Balance must be >=0!');
	}
});
