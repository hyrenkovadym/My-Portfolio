import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@Controller("products")
@ApiTags("products")
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "List active products/projects with optional search and category filter" })
  @ApiQuery({ name: "q", required: false, description: "Search in title/description" })
  @ApiQuery({ name: "category", required: false, description: "Category slug filter" })
  list(@Query("q") q?: string, @Query("category") category?: string) {
    return this.products.list({ q, category });
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get a single active product/project by slug" })
  @ApiParam({ name: "slug", description: "Product slug" })
  bySlug(@Param("slug") slug: string) {
    return this.products.bySlug(slug);
  }
}
