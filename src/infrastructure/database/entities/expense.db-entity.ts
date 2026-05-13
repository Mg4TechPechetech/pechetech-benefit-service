import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { ExpenseCategory } from '../../../core/domain/enums/expense-category.enum';
import { PaymentStatus } from '../../../core/domain/enums/payment-status.enum';

@Entity('expenses')
export class ExpenseDbEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  fishingCampaignId: string;

  @Column()
  supplierName: string;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @Column('float')
  aiConfidenceScore: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.EN_ATTENTE,
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  receiptFileId: string;

  @CreateDateColumn()
  createdAt: Date;
}
