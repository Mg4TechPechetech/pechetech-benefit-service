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
exports.ExpenseController = void 0;
const common_1 = require("@nestjs/common");
const create_expense_use_case_1 = require("../../use-cases/expense/create-expense.use-case");
const pay_expense_use_case_1 = require("../../use-cases/expense/pay-expense.use-case");
const calculate_solvability_use_case_1 = require("../../use-cases/finance/calculate-solvability.use-case");
let ExpenseController = class ExpenseController {
    constructor(createExpenseUseCase, payExpenseUseCase, calculateSolvabilityUseCase) {
        this.createExpenseUseCase = createExpenseUseCase;
        this.payExpenseUseCase = payExpenseUseCase;
        this.calculateSolvabilityUseCase = calculateSolvabilityUseCase;
    }
    async createExpense(dto) {
        try {
            const expense = await this.createExpenseUseCase.execute(dto);
            return { success: true, data: expense };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async payExpense(id) {
        try {
            const result = await this.payExpenseUseCase.execute(id);
            return { success: result };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async getSolvability(userId) {
        try {
            const result = await this.calculateSolvabilityUseCase.execute(userId);
            return { success: true, data: result };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
};
exports.ExpenseController = ExpenseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Post)(":id/pay"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "payExpense", null);
__decorate([
    (0, common_1.Get)("solvability/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "getSolvability", null);
exports.ExpenseController = ExpenseController = __decorate([
    (0, common_1.Controller)("expenses"),
    __metadata("design:paramtypes", [create_expense_use_case_1.CreateExpenseUseCase,
        pay_expense_use_case_1.PayExpenseUseCase,
        calculate_solvability_use_case_1.CalculateSolvabilityUseCase])
], ExpenseController);
//# sourceMappingURL=expense.controller.js.map