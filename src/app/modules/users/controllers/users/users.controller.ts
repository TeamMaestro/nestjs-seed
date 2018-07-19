import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors } from '@nestjs/common';

import { CreateUserDto } from '../../dtos/create-user.dto';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../entities/user.entity';
import { LoggingInterceptor } from '../../../core';
import { IdentityValidationPipe } from '../../../common/pipes';
import { IsLoggedInGuard } from '../../../common/guards';
import { User as UserDecorator } from '../../../common/decorators';

@Controller('v1/users')
@UseInterceptors(LoggingInterceptor)
@UseGuards(IsLoggedInGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * @api {get} /api/v1/users Users fetch all
     * @apiVersion 0.0.1
     * @apiName UsersFetchall
     * @apiGroup Users
     *
     * @apiPermission none
     *
     * @apiSuccess {String} firstName The user's first name
     * @apiSuccess {String} email The user's email
     * @apiSuccess {Number} age The user's age
     *
     * @apiSuccessExample Success-Response:
     *     HTTP 200 OK
     *     {
     *       "firstName": "John",
     *       "email": "john@doe.com",
     *       "age": 25
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP 400 Bad Request
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    @Get()
    async fetchAll(): Promise<User[]> {
        return await this.usersService.fetchAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<{ identity: string }> {
        return await this.usersService.create(createUserDto);
    }

    @Get(':identity')
    async fetchByIdentity(@Param('identity', new IdentityValidationPipe()) identity: string): Promise<User> {
        return await this.usersService.fetchByIdentity(identity);
    }
}
