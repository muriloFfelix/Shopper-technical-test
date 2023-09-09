import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { productsProviders } from './repository/product-repository.provider';
import { DatabaseModule } from '../database/database.module';
import { PacksModule } from '../packs/packs.module';

@Module({
  imports: [
    DatabaseModule,
    PacksModule
  ],
  exports: [
    ProductsService,
  ],
  providers: [
    ...productsProviders,
    ProductsService,
  ]
})
export class ProductsModule { }
