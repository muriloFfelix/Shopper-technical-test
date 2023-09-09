import { DataSource } from 'typeorm';
import { PackEntity } from '../entities/packs.entity';

export const packsProviders = [
    {
        provide: 'PACK_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PackEntity),
        inject: ['DATA_SOURCE'],
    },
];