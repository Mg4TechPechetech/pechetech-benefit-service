import { IExpenseRepository } from "../../core/ports/expense.repository.interface";
import { Expense } from "../../core/domain/entities/expense.entity";
import { ExpenseCategory } from "../../core/domain/enums/expense-category.enum";
export interface CreateExpenseDto {
    userId: string;
    fishingCampaignId: string;
    supplierName: string;
    totalAmount: number;
    category: ExpenseCategory;
    aiConfidenceScore: number;
    receiptFileId?: string;
}
export declare class CreateExpenseUseCase {
    private readonly expenseRepository;
    constructor(expenseRepository: IExpenseRepository);
    execute(dto: CreateExpenseDto): Promise<Expense>;
}
