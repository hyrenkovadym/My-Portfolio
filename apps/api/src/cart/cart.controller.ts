import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
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

  @Post("items")
  addItem(@Req() req: any, @Body() body: any) {
    return this.cart.addItem(req.user.sub, body.productId, body.quantity);
  }

  @Patch("items/:productId")
  setQty(@Req() req: any, @Param("productId") productId: string, @Body() body: any) {
    return this.cart.setItemQuantity(req.user.sub, productId, body.quantity);
  }

  @Delete("items/:productId")
  remove(@Req() req: any, @Param("productId") productId: string) {
    return this.cart.removeItem(req.user.sub, productId);
  }
}