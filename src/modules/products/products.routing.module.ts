import { Module } from '@nestjs/common';
import { ProductsModule } from './products.module';
import { ProductsController } from './controllers/products.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ProductsModule,
  ],
  controllers: [
    ProductsController,
  ]
})
export class ProductsRoutingModule { }
