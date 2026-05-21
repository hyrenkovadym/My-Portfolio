import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RequireAdminGuard } from "../common/require-admin.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

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
@ApiTags("admin-products")
@ApiBearerAuth()
export class AdminProductsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiOperation({ summary: "Create product/project (admin only)" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["title", "slug", "priceCents"],
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        description: { type: "string", nullable: true },
        priceCents: { type: "number", example: 120000 },
        currency: { type: "string", example: "USD" },
        stock: { type: "number", example: 1 },
        isActive: { type: "boolean", example: true },
        categoryId: { type: "string", nullable: true },
      },
    },
  })
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
  @ApiOperation({ summary: "Update product/project fields (admin only)" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        description: { type: "string", nullable: true },
        priceCents: { type: "number" },
        currency: { type: "string" },
        stock: { type: "number" },
        isActive: { type: "boolean" },
        categoryId: { type: "string", nullable: true },
      },
    },
  })
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
  @ApiOperation({ summary: "Delete product/project (admin only)" })
  @ApiParam({ name: "id", description: "Product ID" })
  remove(@Param("id") id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
