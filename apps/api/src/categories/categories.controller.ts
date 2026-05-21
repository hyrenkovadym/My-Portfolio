import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("categories")
@ApiTags("categories")
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: "List all categories" })
  list() {
    return this.categories.list();
  }

  @Post()
  @ApiOperation({ summary: "Create a category" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["name", "slug"],
      properties: {
        name: { type: "string", example: "Backend APIs" },
        slug: { type: "string", example: "backend-apis" },
      },
    },
  })
  create(@Body() body: any) {
    return this.categories.create(body.name, body.slug);
  }
}
