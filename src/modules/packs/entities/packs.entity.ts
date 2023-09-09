import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'packs' })
export class PackEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pack_id: number;

    @Column()
    product_id: number;

    @Column()
    qty: number;
}