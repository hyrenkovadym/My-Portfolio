import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  createFromCart(@Req() req: any) {
    return this.orders.createFromCart(req.user.sub);
  }

  @Get()
  myOrders(@Req() req: any) {
    return this.orders.listMy(req.user.sub);
  }

  @Get(':id')
  getOne(@Req() req: any, @Param('id') id: string) {
    return this.orders.getMyOne(req.user.sub, id);
  }
}