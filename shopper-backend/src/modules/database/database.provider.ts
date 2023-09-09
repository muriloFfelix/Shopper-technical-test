import { DataSource } from 'typeorm';
import { ProductEntity } from '../products/entities/products.entity';
import { PackEntity } from '../packs/entities/packs.entity';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Shopper_Backend2023',
                database: 'shopper_tt',
                entities: [
                    ProductEntity, PackEntity
                ],
                synchronize: false,
            });

            return dataSource.initialize();
        },
    },
];