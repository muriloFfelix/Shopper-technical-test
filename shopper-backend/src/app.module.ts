import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ProductsRoutingModule } from './modules/products/products.routing.module';
import { PacksRoutingModule } from './modules/packs/packs.routing.module';

@Module({
  imports: [
    ProductsRoutingModule,
    PacksRoutingModule
  ],
})
export class AppModule { }
