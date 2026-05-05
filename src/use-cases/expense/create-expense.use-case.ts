import { Injectable, Inject } from "@nestjs/common";
import {
  IExpenseRepository,
  EXPENSE_REPOSITORY,
} from "../../core/ports/expense.repository.interface";
import { Expense } from "../../core/domain/entities/expense.entity";
import { ExpenseCategory } from "../../core/domain/enums/expense-category.enum";
import { PaymentStatus } from "../../core/domain/enums/payment-status.enum";
import * as crypto from "crypto";

export interface CreateExpenseDto {
  fishingCampaignId: string;
  supplierName: string;
  totalAmount: number;
  category: ExpenseCategory;
  aiConfidenceScore: number;
  receiptFileId?: string;
}

@Injectable()
export class CreateExpenseUseCase {
  constructor(
    @Inject(EXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
  ) {}

  async execute(dto: CreateExpenseDto): Promise<Expense> {
    const expense = new Expense(
      // ⚡ Bolt: Using native crypto.randomUUID() is ~3x faster than the uuid package
      crypto.randomUUID(),
      dto.fishingCampaignId,
      dto.supplierName,
      dto.totalAmount,
      dto.category,
      dto.aiConfidenceScore,
      PaymentStatus.EN_ATTENTE,
      dto.receiptFileId,
    );

    await this.expenseRepository.save(expense);
    return expense;
  }
}
