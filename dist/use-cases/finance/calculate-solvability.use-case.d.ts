import { IExpenseRepository } from "../../core/ports/expense.repository.interface";
export declare class CalculateSolvabilityUseCase {
    private readonly expenseRepository;
    constructor(expenseRepository: IExpenseRepository);
    execute(userId: string): Promise<{
        score: number;
        label: string;
    }>;
}
