import { CreateExpenseUseCase } from '../../../src/use-cases/expense/create-expense.use-case';
import { IExpenseRepository } from '../../../src/core/ports/expense.repository.interface';
import { ExpenseCategory } from '../../../src/core/domain/enums/expense-category.enum';
import { PaymentStatus } from '../../../src/core/domain/enums/payment-status.enum';

describe('CreateExpenseUseCase', () => {
  let createExpenseUseCase: CreateExpenseUseCase;
  let mockExpenseRepo: jest.Mocked<IExpenseRepository>;

  beforeEach(() => {
    mockExpenseRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    createExpenseUseCase = new CreateExpenseUseCase(mockExpenseRepo);
  });

  it('should create an expense successfully', async () => {
    const dto = {
      fishingCampaignId: 'camp-123',
      supplierName: 'Moussa Appats',
      totalAmount: 5000,
      category: ExpenseCategory.APPATS,
      aiConfidenceScore: 0.98,
    };

    const expense = await createExpenseUseCase.execute(dto);

    expect(expense.id).toBeDefined();
    expect(expense.supplierName).toBe(dto.supplierName);
    expect(expense.totalAmount).toBe(dto.totalAmount);
    expect(expense.status).toBe(PaymentStatus.EN_ATTENTE);
    expect(mockExpenseRepo.save).toHaveBeenCalledWith(expense);
  });
});
