import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UseFilters, UsePipes, Req } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RolesGuard } from '../common/gaurds/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { IdentityValidationPipe } from '../common/pipes/identity-validation.pipe';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('users')
@UseGuards(RolesGuard)
// @UseFilters(new HttpExceptionFilter())
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post()
    async create( @Body() createUserDto: CreateUserDto) {
        await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':identity')
    @Roles('admin')
    @UsePipes(new IdentityValidationPipe())
    async findOne( @Param('identity') identity: string): Promise<User> {
        return await this.usersService.findOne(identity);
    }

}
