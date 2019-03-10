import { User } from '../entities/user.entity';
import { SeedUser } from '../interfaces/seed-user.interface';

export class StoredUser implements SeedUser {
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
