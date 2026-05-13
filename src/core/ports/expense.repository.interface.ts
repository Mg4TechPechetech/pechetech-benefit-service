import { Expense } from "../domain/entities/expense.entity";

export const EXPENSE_REPOSITORY = "EXPENSE_REPOSITORY";

export interface IExpenseRepository {
  findById(id: string): Promise<Expense | null>;
  findAll(userId: string): Promise<Expense[]>;
  save(expense: Expense): Promise<void>;
  update(expense: Expense): Promise<void>;
}
