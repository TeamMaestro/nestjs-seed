import { SqlException } from '@teamhive/nestjs-common';
import { compare, hash } from 'bcrypt';
import { BeforeCreate, Column, Model, Sequelize, Table } from 'sequelize-typescript';

@Table({
    tableName: 'seed_user'
})
export class User extends Model<User> {
    @Column({
        type: Sequelize.STRING,
        field: 'identity'
    })
    identity: string;

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
            if (instance.password) {
                instance.password = await hash(instance.password, 10);
            }
        }
        catch (error) {
            throw new SqlException(error);
        }
    }

    async comparePassword(password): Promise<boolean> {
        try {
            return await compare(password, this.password);
        }
        catch (error) {
            throw new SqlException(error);
        }
    }
}
