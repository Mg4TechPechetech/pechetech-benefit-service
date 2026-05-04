import { ExpenseCategory } from "../enums/expense-category.enum";
import { PaymentStatus } from "../enums/payment-status.enum";

export class Expense {
  constructor(
    public readonly id: string,
    public readonly fishingCampaignId: string,
    public readonly supplierName: string,
    public readonly totalAmount: number,
    public readonly category: ExpenseCategory,
    public readonly aiConfidenceScore: number,
    public status: PaymentStatus,
    public readonly receiptFileId?: string,
  ) {}

  public markAsPaidViaMobileMoney(): void {
    if (this.status !== PaymentStatus.EN_ATTENTE) {
      throw new Error(
        "Expense is already paid or cannot be paid via mobile money.",
      );
    }
    this.status = PaymentStatus.PAYE_MOBILE_MONEY;
  }
}
