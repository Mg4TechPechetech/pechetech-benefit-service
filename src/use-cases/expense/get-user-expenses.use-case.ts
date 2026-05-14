import { Injectable, Inject } from "@nestjs/common";
import {
  IExpenseRepository,
  EXPENSE_REPOSITORY,
} from "../../core/ports/expense.repository.interface";
import { Expense } from "../../core/domain/entities/expense.entity";

@Injectable()
export class GetUserExpensesUseCase {
  constructor(
    @Inject(EXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
  ) {}

  async execute(userId: string): Promise<Expense[]> {
    return this.expenseRepository.findAll(userId);
  }
}
