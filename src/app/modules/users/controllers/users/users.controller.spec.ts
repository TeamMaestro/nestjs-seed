import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';

import { UsersController } from './users.controller';
import { UsersService } from '../../services/users/users.service';
import { UsersProviders } from '../../providers/users.providers';
import { CoreModule } from '../../../core';
import { LoggerProvider } from '../../../core/logger/logger.provider';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                UsersController
            ],
            components: [
                UsersService,
                ...UsersProviders,
                LoggerProvider
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        usersController = module.get<UsersController>(UsersController);
    });

    describe('fetchAll', () => {
        it('should return an array of users', async () => {
            const result = ['test'];
            jest.spyOn(usersService, 'fetchAll').mockImplementation(() => result);

            expect(await usersController.fetchAll()).toBe(result);
        });
    });
});
