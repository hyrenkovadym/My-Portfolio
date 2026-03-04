import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list() {
    return this.categories.list();
  }

  @Post()
  create(@Body() body: any) {
    return this.categories.create(body.name, body.slug);
  }
}