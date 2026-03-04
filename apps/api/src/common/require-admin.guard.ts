import { Injectable } from "@nestjs/common";
import { RolesGuard } from "./roles.guard";

@Injectable()
export class RequireAdminGuard extends RolesGuard {
  constructor() {
    super("ADMIN");
  }
}