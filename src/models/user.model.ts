import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'users', timestamps: false})
export class User extends Model<User> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    public id: number;

    @Column({ type: DataType.INTEGER, allowNull: false, validate: {min: 0, isInt: true} , defaultValue: 10000 })
    public balance: number;
}