import * as Sequelize from 'sequelize';
import { Table, Column, Model, Unique, Default } from 'sequelize-typescript';

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})
export class BaseEntity<i> extends Model<BaseEntity<i>> {
    @Unique
    @Default(Sequelize.UUIDV4)
    @Column({
        type: Sequelize.UUID,
        field: 'identity'
    })
    identity: string;
}
