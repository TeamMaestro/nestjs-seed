import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdentityValidationPipe } from '@teamhive/nestjs-common';
import { PassportStrategyTokens } from '../../../../passport-strategy-tokens.const';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserService } from '../../services/user/user.service';

@Controller('v1/users')
@UseGuards(AuthGuard(PassportStrategyTokens.AccessTokenStrategy))
export class UserController {
    constructor(
        private readonly usersService: UserService
    ) { }
    /**
     * @api {get} /api/v1/users Fetch all
     * @apiVersion 1.0.0
     * @apiName UsersFetchAll
     * @apiGroup Users
     *
     * @apiUse AuthHeader
     *
     * @apiPermission none
     *
     * @apiSuccess {Object[]} body Array of user objects
     * @apiSuccess {String} body.identity The user's unique identity
     * @apiSuccess {String} body.firstName The user's first name
     * @apiSuccess {String} body.lastName The user's last name
     * @apiSuccess {String} body.email The user's email
     * @apiSuccess {Number} body.age The user's age
     *
     * @apiSuccessExample Success-Response:
     *     HTTP 200 OK
     *     [
     *         {
     *             "identity": "532d8fe6-db8b-4fe7-9263-137ba3aa5327"
     *             "firstName": "John",
     *             "lastName": "Doe",
     *             "email": "john@doe.com",
     *             "age": 25
     *         }
     *     ]
     *
     * @apiUse UnauthorizedError
     * @apiUse SQLError
     */
    @Get()
    async fetchAll() {
        return await this.usersService.fetchAll();
    }

    /**
     * @api {get} /api/v1/users/:identity Fetch by identity
     * @apiVersion 1.0.0
     * @apiName UsersFetchByIdentity
     * @apiGroup Users
     *
     * @apiUse AuthHeader
     *
     * @apiPermission none
     *
     * @apiSuccess {String} identity The user's unique identity
     * @apiSuccess {String} firstName The user's first name
     * @apiSuccess {String} lastName The user's last name
     * @apiSuccess {String} email The user's email
     * @apiSuccess {Number} age The user's age
     *
     * @apiSuccessExample Success-Response:
     *     HTTP 200 OK
     *     {
     *         "identity": "532d8fe6-db8b-4fe7-9263-137ba3aa5327"
     *         "firstName": "John",
     *         "lastName": "Doe",
     *         "email": "john@doe.com",
     *         "age": 25
     *     }
     *
     * @apiUse UnauthorizedError
     * @apiUse IdentityValidationError
     * @apiUse SQLError
     */
    @Get(':identity')
    async fetchByIdentity(
        @Param('identity', new IdentityValidationPipe()) identity: string
    ) {
        return await this.usersService.fetchByIdentity(identity);
    }

    /**
     * @api {post} /api/v1/users Create
     * @apiVersion 1.0.0
     * @apiName UsersCreate
     * @apiGroup Users
     *
     * @apiUse AuthHeader
     *
     * @apiPermission none
     *
     * @apiSuccess (Request-body) {String} firstName The user's first name
     * @apiSuccess (Request-body) {String} lastName The user's last name
     * @apiSuccess (Request-body) {String} email The user's email
     * @apiSuccess (Request-body) {Number} age The user's age
     *
     * @apiSuccessExample Success-Response:
     *     HTTP 201 Created
     *     {
     *         "identity": "532d8fe6-db8b-4fe7-9263-137ba3aa5327"
     *     }
     *
     * @apiUse UnauthorizedError
     * @apiUse RequestBodyValidationError
     * @apiUse SQLError
     */
    @Post()
    async create(
        @Body() createUserDto: CreateUserDto
    ) {
        return await this.usersService.create(createUserDto);
    }
}
