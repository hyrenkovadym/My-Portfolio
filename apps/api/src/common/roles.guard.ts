import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private requiredRole: "ADMIN" | "USER") {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new ForbiddenException("No user");
    if (user.role !== this.requiredRole) throw new ForbiddenException("Forbidden");

    return true;
  }
}