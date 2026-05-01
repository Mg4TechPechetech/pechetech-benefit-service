import { Injectable, Inject } from '@nestjs/common';
import { IExpenseRepository, EXPENSE_REPOSITORY } from '../../core/ports/expense.repository.interface';
import { IPaymentGateway, PAYMENT_GATEWAY } from '../../core/ports/payment.gateway.interface';

@Injectable()
export class PayExpenseUseCase {
  constructor(
    @Inject(EXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
    @Inject(PAYMENT_GATEWAY)
    private readonly paymentGateway: IPaymentGateway,
  ) {}

  async execute(expenseId: string): Promise<boolean> {
    const expense = await this.expenseRepository.findById(expenseId);
    if (!expense) {
      throw new Error('Expense not found');
    }

    const paymentResult = await this.paymentGateway.paySupplier(expense.supplierName, expense.totalAmount);
    
    if (paymentResult.success) {
      expense.markAsPaidViaMobileMoney();
      await this.expenseRepository.update(expense);
      return true;
    }
    
    return false;
  }
}
