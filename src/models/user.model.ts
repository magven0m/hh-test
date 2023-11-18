import { InstanceUpdateOptions } from 'sequelize';
import { AfterUpdate, BeforeUpdate, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	public id: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 10000
	})
	public balance: number;

	@AfterUpdate
	static checkBalance(user: Model<User>, options: InstanceUpdateOptions<User>) {
		if (user.dataValues.balance < 0) {
			throw 'Balance must be >=0!';
		}
	}
}
