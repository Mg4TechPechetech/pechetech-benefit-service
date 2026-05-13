import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../../core/domain/entities/expense.entity';
import { IExpenseRepository } from '../../core/ports/expense.repository.interface';
import { ExpenseDbEntity } from '../database/entities/expense.db-entity';

@Injectable()
export class TypeOrmExpenseRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(ExpenseDbEntity)
    private readonly repository: Repository<ExpenseDbEntity>,
  ) {}

  async save(expense: Expense): Promise<void> {
    const dbEntity = this.toDbEntity(expense);
    await this.repository.save(dbEntity);
  }

  async update(expense: Expense): Promise<void> {
    const dbEntity = this.toDbEntity(expense);
    await this.repository.save(dbEntity); // save performs update if ID exists
  }

  async findById(id: string): Promise<Expense | null> {
    const dbEntity = await this.repository.findOneBy({ id });
    return dbEntity ? this.toDomainEntity(dbEntity) : null;
  }

  async findAll(userId: string): Promise<Expense[]> {
    const dbEntities = await this.repository.find({ where: { userId } });
    return dbEntities.map((entity) => this.toDomainEntity(entity));
  }

  private toDbEntity(expense: Expense): ExpenseDbEntity {
    const entity = new ExpenseDbEntity();
    entity.id = expense.id;
    entity.userId = expense.userId;
    entity.fishingCampaignId = expense.fishingCampaignId;
    entity.supplierName = expense.supplierName;
    entity.totalAmount = expense.totalAmount;
    entity.category = expense.category;
    entity.aiConfidenceScore = expense.aiConfidenceScore;
    entity.status = expense.status;
    entity.receiptFileId = expense.receiptFileId;
    return entity;
  }

  private toDomainEntity(entity: ExpenseDbEntity): Expense {
    return new Expense(
      entity.id,
      entity.userId,
      entity.fishingCampaignId,
      entity.supplierName,
      Number(entity.totalAmount),
      entity.category,
      entity.aiConfidenceScore,
      entity.status,
      entity.receiptFileId,
    );
  }
}
