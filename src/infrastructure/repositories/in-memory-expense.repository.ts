import { Injectable } from "@nestjs/common";
import { IExpenseRepository } from "../../core/ports/expense.repository.interface";
import { Expense } from "../../core/domain/entities/expense.entity";

@Injectable()
export class InMemoryExpenseRepository implements IExpenseRepository {
  private readonly expenses = new Map<string, Expense>();

  async findById(id: string): Promise<Expense | null> {
    return this.expenses.get(id) || null;
  }

  async save(expense: Expense): Promise<void> {
    this.expenses.set(expense.id, expense);
  }

  async update(expense: Expense): Promise<void> {
    this.expenses.set(expense.id, expense);
  }
}
