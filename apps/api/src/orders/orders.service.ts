import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createFromCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Перевірка наявності на складі
    for (const it of cart.items) {
      if (it.quantity > it.product.stock) {
        throw new BadRequestException(
          `Not enough stock for ${it.product.title}. Requested ${it.quantity}, available ${it.product.stock}`,
        );
      }
    }

    const currency = cart.items[0].product.currency ?? 'USD';
    const totalCents = cart.items.reduce(
      (sum, it) => sum + it.quantity * it.product.priceCents,
      0,
    );

    // Транзакція: створити order + items + списати stock + очистити cart
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          currency,
          totalCents,
          items: {
            create: cart.items.map((it) => ({
              productId: it.productId,
              quantity: it.quantity,
              priceCents: it.product.priceCents,
              currency: it.product.currency ?? currency,
            })),
          },
        },
        include: { items: { include: { product: true } } },
      });

      // списати stock
      for (const it of cart.items) {
        await tx.product.update({
          where: { id: it.productId },
          data: { stock: { decrement: it.quantity } },
        });
      }

      // очистити корзину
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return order;
    });
  }

  listMy(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    });
  }

  async getMyOne(userId: string, id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    if (!order) throw new BadRequestException('Order not found');
    if (order.userId !== userId) throw new ForbiddenException();
    return order;
  }
}