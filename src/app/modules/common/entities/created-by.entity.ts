import { CreatedByEntity as CreatedByCommon } from '@teamhive/sequelize-common';
import { User } from '../../user';
import {Table, BelongsTo, } from 'sequelize-typescript';

@Table({})
export class CreatedByEntity<i> extends CreatedByCommon<CreatedByEntity<i>> {
    @BelongsTo(() => User)
    createdBy: User;

    @BelongsTo(() => User)
    updatedBy: User;

    @BelongsTo(() => User)
    deletedBy: User;
}
