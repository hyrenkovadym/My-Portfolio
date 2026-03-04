import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from "./categories/categories.module";
import { AdminProductsController } from "./products/admin-products.controller";
import { RequireAdminGuard } from "./common/require-admin.guard";

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule, CategoriesModule],
  controllers: [AppController, AdminProductsController],
  providers: [AppService, RequireAdminGuard],
})
export class AppModule {}