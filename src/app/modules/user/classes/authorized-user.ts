import { User } from '../entities/user.entity';

export class AuthorizedUser {
    identity: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(user = {} as User) {
        this.identity = user.identity;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
