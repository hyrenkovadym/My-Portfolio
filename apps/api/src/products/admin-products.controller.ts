import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RequireAdminGuard } from "../common/require-admin.guard";

type CreateProductDto = {
  title: string;
  slug: string;
  description?: string;
  priceCents: number;
  currency?: string;
  stock?: number;
  isActive?: boolean;
  categoryId?: string | null;
};

type UpdateProductDto = Partial<CreateProductDto>;

@Controller("admin/products")
@UseGuards(JwtAuthGuard, RequireAdminGuard)
export class AdminProductsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description ?? null,
        priceCents: dto.priceCents,
        currency: dto.currency ?? "USD",
        stock: dto.stock ?? 0,
        isActive: dto.isActive ?? true,
        categoryId: dto.categoryId ?? null,
      },
    });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.slug !== undefined ? { slug: dto.slug } : {}),
        ...(dto.description !== undefined ? { description: dto.description ?? null } : {}),
        ...(dto.priceCents !== undefined ? { priceCents: dto.priceCents } : {}),
        ...(dto.currency !== undefined ? { currency: dto.currency ?? "USD" } : {}),
        ...(dto.stock !== undefined ? { stock: dto.stock ?? 0 } : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive ?? true } : {}),
        ...(dto.categoryId !== undefined ? { categoryId: dto.categoryId } : {}),
      },
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}