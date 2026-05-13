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
exports.CreateExpenseUseCase = void 0;
const common_1 = require("@nestjs/common");
const expense_repository_interface_1 = require("../../core/ports/expense.repository.interface");
const expense_entity_1 = require("../../core/domain/entities/expense.entity");
const payment_status_enum_1 = require("../../core/domain/enums/payment-status.enum");
const crypto = require("crypto");
let CreateExpenseUseCase = class CreateExpenseUseCase {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async execute(dto) {
        const expense = new expense_entity_1.Expense(crypto.randomUUID(), dto.userId, dto.fishingCampaignId, dto.supplierName, dto.totalAmount, dto.category, dto.aiConfidenceScore, payment_status_enum_1.PaymentStatus.EN_ATTENTE, dto.receiptFileId);
        await this.expenseRepository.save(expense);
        return expense;
    }
};
exports.CreateExpenseUseCase = CreateExpenseUseCase;
exports.CreateExpenseUseCase = CreateExpenseUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(expense_repository_interface_1.EXPENSE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateExpenseUseCase);
//# sourceMappingURL=create-expense.use-case.js.map