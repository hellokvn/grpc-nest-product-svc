import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'varchar' })
  public sku!: string;

  @Column({ type: 'integer' })
  public stock!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public price!: number;
}
