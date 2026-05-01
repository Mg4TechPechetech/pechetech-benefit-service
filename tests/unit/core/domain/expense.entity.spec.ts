import { Expense } from '../../../../src/core/domain/entities/expense.entity';
import { ExpenseCategory } from '../../../../src/core/domain/enums/expense-category.enum';
import { PaymentStatus } from '../../../../src/core/domain/enums/payment-status.enum';

describe('Expense Entity', () => {
  it('should create an expense with initial EN_ATTENTE status', () => {
    const expense = new Expense(
      'id-123',
      'camp-123',
      'Aliou Glace',
      15000,
      ExpenseCategory.GLACE,
      0.95,
      PaymentStatus.EN_ATTENTE,
    );

    expect(expense.status).toBe(PaymentStatus.EN_ATTENTE);
    expect(expense.totalAmount).toBe(15000);
  });

  it('should successfully transition to PAYE_MOBILE_MONEY', () => {
    const expense = new Expense(
      'id-123',
      'camp-123',
      'Aliou Glace',
      15000,
      ExpenseCategory.GLACE,
      0.95,
      PaymentStatus.EN_ATTENTE,
    );

    expense.markAsPaidViaMobileMoney();
    expect(expense.status).toBe(PaymentStatus.PAYE_MOBILE_MONEY);
  });

  it('should throw an error if trying to pay an already paid expense', () => {
    const expense = new Expense(
      'id-123',
      'camp-123',
      'Aliou Glace',
      15000,
      ExpenseCategory.GLACE,
      0.95,
      PaymentStatus.PAYE_MOBILE_MONEY,
    );

    expect(() => expense.markAsPaidViaMobileMoney()).toThrow(
      'Expense is already paid or cannot be paid via mobile money.',
    );
  });
});
