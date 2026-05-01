import { Controller, Post, Body, Param, HttpCode } from '@nestjs/common';
import { CreateExpenseUseCase, CreateExpenseDto } from '../../use-cases/expense/create-expense.use-case';
import { PayExpenseUseCase } from '../../use-cases/expense/pay-expense.use-case';

@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly payExpenseUseCase: PayExpenseUseCase,
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

  @Post(':id/pay')
  @HttpCode(200)
  async payExpense(@Param('id') id: string) {
    try {
      const result = await this.payExpenseUseCase.execute(id);
      return { success: result };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
