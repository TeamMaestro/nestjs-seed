import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {jest, describe, beforeEach, it, expect} from 'jest';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            components: [UserService],
        }).compile();

        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = ['test'];
            jest.spyOn(userService, 'findAll').mockImplementation(() => result);

            expect(await userController.findAll()).toBe(result);
        });
    });
});
