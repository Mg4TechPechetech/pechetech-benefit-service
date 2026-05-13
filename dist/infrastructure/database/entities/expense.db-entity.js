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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseDbEntity = void 0;
const typeorm_1 = require("typeorm");
const expense_category_enum_1 = require("../../../core/domain/enums/expense-category.enum");
const payment_status_enum_1 = require("../../../core/domain/enums/payment-status.enum");
let ExpenseDbEntity = class ExpenseDbEntity {
};
exports.ExpenseDbEntity = ExpenseDbEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ExpenseDbEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExpenseDbEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExpenseDbEntity.prototype, "fishingCampaignId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExpenseDbEntity.prototype, "supplierName", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], ExpenseDbEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: expense_category_enum_1.ExpenseCategory,
    }),
    __metadata("design:type", String)
], ExpenseDbEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], ExpenseDbEntity.prototype, "aiConfidenceScore", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: payment_status_enum_1.PaymentStatus,
        default: payment_status_enum_1.PaymentStatus.EN_ATTENTE,
    }),
    __metadata("design:type", String)
], ExpenseDbEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExpenseDbEntity.prototype, "receiptFileId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ExpenseDbEntity.prototype, "createdAt", void 0);
exports.ExpenseDbEntity = ExpenseDbEntity = __decorate([
    (0, typeorm_1.Entity)('expenses')
], ExpenseDbEntity);
//# sourceMappingURL=expense.db-entity.js.map