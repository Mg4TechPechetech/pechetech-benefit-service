import { CreateExpenseUseCase, CreateExpenseDto } from "../../use-cases/expense/create-expense.use-case";
import { PayExpenseUseCase } from "../../use-cases/expense/pay-expense.use-case";
import { CalculateSolvabilityUseCase } from "../../use-cases/finance/calculate-solvability.use-case";
import { GetUserExpensesUseCase } from "../../use-cases/expense/get-user-expenses.use-case";
export declare class ExpenseController {
    private readonly createExpenseUseCase;
    private readonly payExpenseUseCase;
    private readonly calculateSolvabilityUseCase;
    private readonly getUserExpensesUseCase;
    constructor(createExpenseUseCase: CreateExpenseUseCase, payExpenseUseCase: PayExpenseUseCase, calculateSolvabilityUseCase: CalculateSolvabilityUseCase, getUserExpensesUseCase: GetUserExpensesUseCase);
    createExpense(dto: CreateExpenseDto): Promise<{
        success: boolean;
        data: import("../../core/domain/entities/expense.entity").Expense;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    payExpense(id: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
    getSolvability(userId: string): Promise<{
        success: boolean;
        data: {
            score: number;
            label: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getUserExpenses(userId: string): Promise<{
        success: boolean;
        data: import("../../core/domain/entities/expense.entity").Expense[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
}
