import { PayExpenseUseCase } from '../../../src/use-cases/expense/pay-expense.use-case';
import { IExpenseRepository } from '../../../src/core/ports/expense.repository.interface';
import { IPaymentGateway } from '../../../src/core/ports/payment.gateway.interface';
import { Expense } from '../../../src/core/domain/entities/expense.entity';
import { ExpenseCategory } from '../../../src/core/domain/enums/expense-category.enum';
import { PaymentStatus } from '../../../src/core/domain/enums/payment-status.enum';

describe('PayExpenseUseCase', () => {
  let payExpenseUseCase: PayExpenseUseCase;
  let mockExpenseRepo: jest.Mocked<IExpenseRepository>;
  let mockPaymentGateway: jest.Mocked<IPaymentGateway>;

  beforeEach(() => {
    mockExpenseRepo = {
      findById: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    } as any;

    mockPaymentGateway = {
      paySupplier: jest.fn(),
    };

    payExpenseUseCase = new PayExpenseUseCase(mockExpenseRepo, mockPaymentGateway);
  });

  it('should successfully pay an expense via mobile money', async () => {
    const mockExpense = new Expense(
      'exp-1',
      'user-1',
      'camp-1',
      'Supplier',
      10000,
      ExpenseCategory.CARBURANT,
      0.99,
      PaymentStatus.EN_ATTENTE,
    );

    mockExpenseRepo.findById.mockResolvedValue(mockExpense);
    mockPaymentGateway.paySupplier.mockResolvedValue({
      success: true,
      operatorReference: 'REF-123',
      httpCode: 200,
    });

    const result = await payExpenseUseCase.execute('exp-1');

    expect(result).toBe(true);
    expect(mockPaymentGateway.paySupplier).toHaveBeenCalledWith('Supplier', 10000);
    expect(mockExpense.status).toBe(PaymentStatus.PAYE_MOBILE_MONEY);
    expect(mockExpenseRepo.update).toHaveBeenCalledWith(mockExpense);
  });

  it('should throw an error if expense is not found', async () => {
    mockExpenseRepo.findById.mockResolvedValue(null);

    await expect(payExpenseUseCase.execute('exp-invalid')).rejects.toThrow('Expense not found');
    expect(mockPaymentGateway.paySupplier).not.toHaveBeenCalled();
  });

  it('should return false if payment fails', async () => {
    const mockExpense = new Expense(
      'exp-1',
      'user-1',
      'camp-1',
      'Supplier',
      10000,
      ExpenseCategory.CARBURANT,
      0.99,
      PaymentStatus.EN_ATTENTE,
    );

    mockExpenseRepo.findById.mockResolvedValue(mockExpense);
    mockPaymentGateway.paySupplier.mockResolvedValue({
      success: false,
      operatorReference: '',
      httpCode: 500,
    });

    const result = await payExpenseUseCase.execute('exp-1');

    expect(result).toBe(false);
    expect(mockExpense.status).toBe(PaymentStatus.EN_ATTENTE); // Status unchanged
    expect(mockExpenseRepo.update).not.toHaveBeenCalled();
  });
});
