import { IExpenseRepository } from "../../core/ports/expense.repository.interface";
import { Expense } from "../../core/domain/entities/expense.entity";
export declare class GetUserExpensesUseCase {
    private readonly expenseRepository;
    constructor(expenseRepository: IExpenseRepository);
    execute(userId: string): Promise<Expense[]>;
}
