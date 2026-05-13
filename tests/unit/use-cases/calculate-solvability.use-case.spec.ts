import { CalculateSolvabilityUseCase } from "../../../src/use-cases/finance/calculate-solvability.use-case";
import { IExpenseRepository } from "../../../src/core/ports/expense.repository.interface";
import { Expense } from "../../../src/core/domain/entities/expense.entity";
import { ExpenseCategory } from "../../../src/core/domain/enums/expense-category.enum";
import { PaymentStatus } from "../../../src/core/domain/enums/payment-status.enum";

describe("CalculateSolvabilityUseCase", () => {
  let useCase: CalculateSolvabilityUseCase;
  let mockRepository: jest.Mocked<IExpenseRepository>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    } as any;
    useCase = new CalculateSolvabilityUseCase(mockRepository);
  });

  it("should return a high score when all expenses are paid", async () => {
    const userId = "user-1";
    const expenses = [
      new Expense("1", userId, "camp-1", "Supplier A", 100, ExpenseCategory.CARBURANT, 1, PaymentStatus.PAYE_MOBILE_MONEY),
      new Expense("2", userId, "camp-1", "Supplier B", 200, ExpenseCategory.GLACE, 1, PaymentStatus.PAYE_MOBILE_MONEY),
    ];
    mockRepository.findAll.mockResolvedValue(expenses);

    const result = await useCase.execute(userId);

    expect(result.score).toBe(100);
    expect(result.label).toBe("EXCELLENT");
  });

  it("should return a low score when expenses are unpaid", async () => {
    const userId = "user-2";
    const expenses = [
      new Expense("1", userId, "camp-1", "Supplier A", 100, ExpenseCategory.CARBURANT, 1, PaymentStatus.EN_ATTENTE),
    ];
    mockRepository.findAll.mockResolvedValue(expenses);

    const result = await useCase.execute(userId);

    expect(result.score).toBe(0);
    expect(result.label).toBe("RISQUE ÉLEVÉ");
  });

  it("should return 0 score when no expenses exist", async () => {
    const userId = "user-3";
    mockRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute(userId);

    expect(result.score).toBe(0);
    expect(result.label).toBe("RISQUE ÉLEVÉ");
  });
});
