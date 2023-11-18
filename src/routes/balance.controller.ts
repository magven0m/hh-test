import express from 'express';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { sequelize } from '../configs/sequelize.config';

export const balanceRouter = express.Router();

balanceRouter.post('/change', async (req, res) => {
	const { amount, userId }: { amount: number; userId: number } = req.body;
	const transaction = await User.sequelize.transaction();

	try {
		const [_, update] = await User.update(
			{
				balance: sequelize.literal(`balance+${amount}`)
			},
			{ where: { id: userId }, returning: ['balance'], transaction }
		);

		if(update.length===0)
		throw 'User not found!';

		if(update[0].balance<0)
		throw 'Balance must be >=0!';

		await transaction.commit();
		res.status(200).send(`Balance: ${update[0].balance}`);
	} catch (err) {
		await transaction.rollback();
		res.status(400).send(err);
	}
});
