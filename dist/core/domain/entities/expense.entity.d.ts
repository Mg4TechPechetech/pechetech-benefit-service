import { ExpenseCategory } from "../enums/expense-category.enum";
import { PaymentStatus } from "../enums/payment-status.enum";
export declare class Expense {
    readonly id: string;
    readonly userId: string;
    readonly fishingCampaignId: string;
    readonly supplierName: string;
    readonly totalAmount: number;
    readonly category: ExpenseCategory;
    readonly aiConfidenceScore: number;
    status: PaymentStatus;
    readonly receiptFileId?: string;
    constructor(id: string, userId: string, fishingCampaignId: string, supplierName: string, totalAmount: number, category: ExpenseCategory, aiConfidenceScore: number, status: PaymentStatus, receiptFileId?: string);
    markAsPaidViaMobileMoney(): void;
}
