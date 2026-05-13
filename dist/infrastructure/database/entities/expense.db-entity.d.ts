import { ExpenseCategory } from '../../../core/domain/enums/expense-category.enum';
import { PaymentStatus } from '../../../core/domain/enums/payment-status.enum';
export declare class ExpenseDbEntity {
    id: string;
    userId: string;
    fishingCampaignId: string;
    supplierName: string;
    totalAmount: number;
    category: ExpenseCategory;
    aiConfidenceScore: number;
    status: PaymentStatus;
    receiptFileId: string;
    createdAt: Date;
}
