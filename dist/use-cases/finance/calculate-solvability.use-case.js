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
exports.CalculateSolvabilityUseCase = void 0;
const common_1 = require("@nestjs/common");
const expense_repository_interface_1 = require("../../core/ports/expense.repository.interface");
let CalculateSolvabilityUseCase = class CalculateSolvabilityUseCase {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async execute(userId) {
        const expenses = await this.expenseRepository.findAll(userId);
        const totalExpenses = expenses.length;
        const paidExpenses = expenses.filter(e => e.status.includes("PAYE")).length;
        let score = 0;
        if (totalExpenses > 0) {
            score = (paidExpenses / totalExpenses) * 100;
        }
        let label = "RISQUE ÉLEVÉ";
        if (score > 80)
            label = "EXCELLENT";
        else if (score > 50)
            label = "BON";
        else if (score > 30)
            label = "MOYEN";
        return { score: Math.round(score), label };
    }
};
exports.CalculateSolvabilityUseCase = CalculateSolvabilityUseCase;
exports.CalculateSolvabilityUseCase = CalculateSolvabilityUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(expense_repository_interface_1.EXPENSE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CalculateSolvabilityUseCase);
//# sourceMappingURL=calculate-solvability.use-case.js.map