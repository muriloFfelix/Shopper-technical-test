import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    code: number;

    @Column({ length: 100 })
    name: string;

    @Column('float')
    cost_price: string;

    @Column('float')
    sales_price: string;
}