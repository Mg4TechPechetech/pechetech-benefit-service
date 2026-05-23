import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('distributions')
export class DistributionDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  grossRevenue: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalExpenses: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  netRevenue: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amortizationFund: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  netSharePerFisherman: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  equipmentShare?: number;

  @Column({ type: 'varchar', length: 50 })
  unitType: 'PIROGUE_GLACIERE' | 'SENNE_TOURNANTE';

  @Column({ type: 'int' })
  numberOfFishermen: number;

  @CreateDateColumn()
  createdAt: Date;
}
