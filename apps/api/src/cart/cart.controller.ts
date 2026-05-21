import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller("cart")
@ApiTags("cart")
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  @ApiOperation({ summary: "Get current user cart" })
  getMyCart(@Req() req: any) {
    return this.cart.getOrCreateCart(req.user.sub);
  }

  @Post("items")
  @ApiOperation({ summary: "Add item to cart" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["productId", "quantity"],
      properties: {
        productId: { type: "string" },
        quantity: { type: "number", example: 1 },
      },
    },
  })
  addItem(@Req() req: any, @Body() body: any) {
    return this.cart.addItem(req.user.sub, body.productId, body.quantity);
  }

  @Patch("items/:productId")
  @ApiOperation({ summary: "Set quantity for cart item" })
  @ApiParam({ name: "productId", description: "Product ID" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["quantity"],
      properties: {
        quantity: { type: "number", example: 2 },
      },
    },
  })
  setQty(@Req() req: any, @Param("productId") productId: string, @Body() body: any) {
    return this.cart.setItemQuantity(req.user.sub, productId, body.quantity);
  }

  @Delete("items/:productId")
  @ApiOperation({ summary: "Remove item from cart" })
  @ApiParam({ name: "productId", description: "Product ID" })
  remove(@Req() req: any, @Param("productId") productId: string) {
    return this.cart.removeItem(req.user.sub, productId);
  }
}
