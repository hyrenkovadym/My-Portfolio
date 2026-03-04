import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  list(@Query("q") q?: string, @Query("category") category?: string) {
    return this.products.list({ q, category });
  }

  @Get(":slug")
  bySlug(@Param("slug") slug: string) {
    return this.products.bySlug(slug);
  }
}