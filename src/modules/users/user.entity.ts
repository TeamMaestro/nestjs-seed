import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column
    age: number;

    @Column
    email: string;

    @Column
    firstName: string;
}
