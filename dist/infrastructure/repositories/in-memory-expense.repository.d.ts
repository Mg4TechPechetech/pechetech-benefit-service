import { IExpenseRepository } from "../../core/ports/expense.repository.interface";
import { Expense } from "../../core/domain/entities/expense.entity";
export declare class InMemoryExpenseRepository implements IExpenseRepository {
    private readonly expenses;
    findById(id: string): Promise<Expense | null>;
    findAll(userId: string): Promise<Expense[]>;
    save(expense: Expense): Promise<void>;
    update(expense: Expense): Promise<void>;
}
