import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller("cart")
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  getMyCart(@Req() req: any) {
    return this.cart.getOrCreateCart(req.user.sub);
  }
}