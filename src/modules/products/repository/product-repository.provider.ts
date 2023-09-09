import { DataSource } from 'typeorm';
import { ProductEntity } from '../entities/products.entity';

export const productsProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
        inject: ['DATA_SOURCE'],
    },
];