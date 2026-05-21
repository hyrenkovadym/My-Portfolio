import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('orders')
@ApiTags('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order from current cart' })
  createFromCart(@Req() req: any) {
    return this.orders.createFromCart(req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'List current user orders' })
  myOrders(@Req() req: any) {
    return this.orders.listMy(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one order by id for current user' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  getOne(@Req() req: any, @Param('id') id: string) {
    return this.orders.getMyOne(req.user.sub, id);
  }
}
