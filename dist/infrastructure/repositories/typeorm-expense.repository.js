"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmExpenseRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("../../core/domain/entities/expense.entity");
const expense_db_entity_1 = require("../database/entities/expense.db-entity");
let TypeOrmExpenseRepository = class TypeOrmExpenseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(expense) {
        const dbEntity = this.toDbEntity(expense);
        await this.repository.save(dbEntity);
    }
    async update(expense) {
        const dbEntity = this.toDbEntity(expense);
        await this.repository.save(dbEntity);
    }
    async findById(id) {
        const dbEntity = await this.repository.findOneBy({ id });
        return dbEntity ? this.toDomainEntity(dbEntity) : null;
    }
    async findAll(userId) {
        const dbEntities = await this.repository.find({ where: { userId } });
        return dbEntities.map((entity) => this.toDomainEntity(entity));
    }
    toDbEntity(expense) {
        const entity = new expense_db_entity_1.ExpenseDbEntity();
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
    toDomainEntity(entity) {
        return new expense_entity_1.Expense(entity.id, entity.userId, entity.fishingCampaignId, entity.supplierName, Number(entity.totalAmount), entity.category, entity.aiConfidenceScore, entity.status, entity.receiptFileId);
    }
};
exports.TypeOrmExpenseRepository = TypeOrmExpenseRepository;
exports.TypeOrmExpenseRepository = TypeOrmExpenseRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_db_entity_1.ExpenseDbEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmExpenseRepository);
//# sourceMappingURL=typeorm-expense.repository.js.map