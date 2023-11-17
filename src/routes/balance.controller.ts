import express from 'express';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize-typescript';

export const balanceRouter = express.Router();

balanceRouter.post('/change', async (req, res) => {
	
    const { amount, userId }: { amount: number; userId: number } = req.body;
    const transaction = await User.sequelize.transaction();

	try {
		const user = await User.findOne({ where: { id: userId }, transaction });
		if (!user) throw 'User not found!';

		await user.update({ balance: user.balance + amount }, { transaction });
		await transaction.commit();
		res.status(200).send(`Balance: ${user.balance}`);
	} catch (err) {
		await transaction.rollback();
		res.status(400).send(typeof err === 'string' ? err : 'Balance must be >=0!');
	}
});
