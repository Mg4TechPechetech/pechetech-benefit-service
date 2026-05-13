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
exports.PayExpenseUseCase = void 0;
const common_1 = require("@nestjs/common");
const expense_repository_interface_1 = require("../../core/ports/expense.repository.interface");
const payment_gateway_interface_1 = require("../../core/ports/payment.gateway.interface");
let PayExpenseUseCase = class PayExpenseUseCase {
    constructor(expenseRepository, paymentGateway) {
        this.expenseRepository = expenseRepository;
        this.paymentGateway = paymentGateway;
    }
    async execute(expenseId) {
        const expense = await this.expenseRepository.findById(expenseId);
        if (!expense) {
            throw new Error("Expense not found");
        }
        const paymentResult = await this.paymentGateway.paySupplier(expense.supplierName, expense.totalAmount);
        if (paymentResult.success) {
            expense.markAsPaidViaMobileMoney();
            await this.expenseRepository.update(expense);
            return true;
        }
        return false;
    }
};
exports.PayExpenseUseCase = PayExpenseUseCase;
exports.PayExpenseUseCase = PayExpenseUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(expense_repository_interface_1.EXPENSE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(payment_gateway_interface_1.PAYMENT_GATEWAY)),
    __metadata("design:paramtypes", [Object, Object])
], PayExpenseUseCase);
//# sourceMappingURL=pay-expense.use-case.js.map