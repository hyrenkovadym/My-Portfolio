import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.category.findMany({ orderBy: { createdAt: "desc" } });
  }

  async create(name?: string, slug?: string) {
    if (!name || !slug) throw new BadRequestException("name and slug are required");

    return this.prisma.category.create({
      data: { name: name.trim(), slug: slug.trim().toLowerCase() },
    });
  }
}