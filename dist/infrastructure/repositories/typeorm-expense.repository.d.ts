import { Repository } from 'typeorm';
import { Expense } from '../../core/domain/entities/expense.entity';
import { IExpenseRepository } from '../../core/ports/expense.repository.interface';
import { ExpenseDbEntity } from '../database/entities/expense.db-entity';
export declare class TypeOrmExpenseRepository implements IExpenseRepository {
    private readonly repository;
    constructor(repository: Repository<ExpenseDbEntity>);
    save(expense: Expense): Promise<void>;
    update(expense: Expense): Promise<void>;
    findById(id: string): Promise<Expense | null>;
    findAll(userId: string): Promise<Expense[]>;
    private toDbEntity;
    private toDomainEntity;
}
