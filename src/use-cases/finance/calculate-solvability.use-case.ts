import { Injectable, Inject } from "@nestjs/common";
import { IExpenseRepository, EXPENSE_REPOSITORY } from "../../core/ports/expense.repository.interface";

@Injectable()
export class CalculateSolvabilityUseCase {
  constructor(
    @Inject(EXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
  ) {}

  async execute(userId: string): Promise<{ score: number; label: string }> {
    const expenses = await this.expenseRepository.findAll(userId);
    // In a real scenario, we would filter by userId and analyze patterns
    // Here we simulate a scoring logic for Module 2 demo
    
    const totalExpenses = expenses.length;
    const paidExpenses = expenses.filter(e => e.status.includes("PAYE")).length;
    
    let score = 0;
    if (totalExpenses > 0) {
      score = (paidExpenses / totalExpenses) * 100;
    }

    let label = "RISQUE ÉLEVÉ";
    if (score > 80) label = "EXCELLENT";
    else if (score > 50) label = "BON";
    else if (score > 30) label = "MOYEN";

    return { score: Math.round(score), label };
  }
}
