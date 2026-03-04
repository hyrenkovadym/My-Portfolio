import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (cart) return cart;

    return this.prisma.cart.create({
      data: { userId },
      include: {
        items: { include: { product: true } },
      },
    });
  }

  async addItem(userId: string, productId: string, quantity: number) {
    if (!productId) throw new BadRequestException("productId is required");
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) throw new BadRequestException("quantity must be > 0");

    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException("Product not found");
    if (!product.isActive) throw new BadRequestException("Product is not active");

    const cart = await this.getOrCreateCart(userId);

    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (existing) {
      await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + qty },
      });
      return this.getOrCreateCart(userId);
    }

    await this.prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: qty },
    });

    return this.getOrCreateCart(userId);
  }

  async setItemQuantity(userId: string, productId: string, quantity: number) {
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 0) throw new BadRequestException("quantity must be >= 0");

    const cart = await this.getOrCreateCart(userId);

    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (!existing) throw new NotFoundException("Cart item not found");

    if (qty === 0) {
      await this.prisma.cartItem.delete({ where: { id: existing.id } });
      return this.getOrCreateCart(userId);
    }

    await this.prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: qty },
    });

    return this.getOrCreateCart(userId);
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.getOrCreateCart(userId);

    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (!existing) return this.getOrCreateCart(userId);

    await this.prisma.cartItem.delete({ where: { id: existing.id } });
    return this.getOrCreateCart(userId);
  }
}