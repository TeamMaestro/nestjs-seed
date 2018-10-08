import { Table, Column, Sequelize } from 'sequelize-typescript';
import { BaseEntity } from './base.entity';

@Table({})
export class CreatedByEntity<i> extends BaseEntity<CreatedByEntity<i>> {
    @Column({
        type: Sequelize.INTEGER,
        field: 'created_by_id'
    })
    createdById: number;

    @Column({
        type: Sequelize.INTEGER,
        field: 'updated_by_id'
    })
    updatedById: number;

    @Column({
        type: Sequelize.INTEGER,
        field: 'deleted_by_id'
    })
    deletedById: number;
}
