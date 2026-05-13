import { Controller, Post, Get, Body, Param, HttpCode } from "@nestjs/common";
import {
  CreateExpenseUseCase,
  CreateExpenseDto,
} from "../../use-cases/expense/create-expense.use-case";
import { PayExpenseUseCase } from "../../use-cases/expense/pay-expense.use-case";
import { CalculateSolvabilityUseCase } from "../../use-cases/finance/calculate-solvability.use-case";

@Controller("expenses")
export class ExpenseController {
  constructor(
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly payExpenseUseCase: PayExpenseUseCase,
    private readonly calculateSolvabilityUseCase: CalculateSolvabilityUseCase,
  ) {}

  @Post()
  async createExpense(@Body() dto: CreateExpenseDto) {
    try {
      const expense = await this.createExpenseUseCase.execute(dto);
      return { success: true, data: expense };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  @Post(":id/pay")
  @HttpCode(200)
  async payExpense(@Param("id") id: string) {
    try {
      const result = await this.payExpenseUseCase.execute(id);
      return { success: result };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  @Get("solvability/:userId")
  async getSolvability(@Param("userId") userId: string) {
    try {
      const result = await this.calculateSolvabilityUseCase.execute(userId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
