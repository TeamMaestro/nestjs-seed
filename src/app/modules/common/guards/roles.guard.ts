import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const handler = context.getHandler();
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
        return user && user.roles && hasRole();
    }
}
