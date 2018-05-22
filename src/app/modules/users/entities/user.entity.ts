import { Table, Column, Sequelize, BeforeCreate } from 'sequelize-typescript';
import { hash, compare } from 'bcrypt';

import { BaseEntity } from '../../common/entities';
import { SQLException } from '../../common/exceptions';

@Table({
    tableName: 'seed_user'
})
export class User extends BaseEntity<User> {
    @Column({
        type: Sequelize.STRING,
        field: 'email'
    })
    email: string;

    @Column({
        type: Sequelize.STRING,
        field: 'password'
    })
    password: string;

    @Column({
        type: Sequelize.STRING,
        field: 'first_name'
    })
    firstName: string;

    @Column({
        type: Sequelize.STRING,
        field: 'last_name'
    })
    lastName: string;

    @Column({
        type: Sequelize.STRING,
        field: 'provider'
    })
    provider: string;

    @Column({
        type: Sequelize.STRING,
        field: 'provider_id'
    })
    providerId: string;

    @Column({
        type: Sequelize.STRING,
        field: 'avatar'
    })
    avatar: string;

    @BeforeCreate
    static async hashPassword(instance: User): Promise<void> {
        try {
            instance.password = await hash(instance.password, 10);
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async comparePassword(password): Promise<boolean> {
        try {
            return await compare(password, this.password);
        }
        catch (error) {
            throw new SQLException(error);
        }
    }
}
