"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const expense_controller_1 = require("./presentation/controllers/expense.controller");
const create_expense_use_case_1 = require("./use-cases/expense/create-expense.use-case");
const pay_expense_use_case_1 = require("./use-cases/expense/pay-expense.use-case");
const calculate_solvability_use_case_1 = require("./use-cases/finance/calculate-solvability.use-case");
const get_user_expenses_use_case_1 = require("./use-cases/expense/get-user-expenses.use-case");
const expense_repository_interface_1 = require("./core/ports/expense.repository.interface");
const typeorm_expense_repository_1 = require("./infrastructure/repositories/typeorm-expense.repository");
const expense_db_entity_1 = require("./infrastructure/database/entities/expense.db-entity");
const payment_gateway_interface_1 = require("./core/ports/payment.gateway.interface");
const senepay_gateway_1 = require("./infrastructure/gateways/senepay.gateway");
let ExpenseModule = class ExpenseModule {
};
exports.ExpenseModule = ExpenseModule;
exports.ExpenseModule = ExpenseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([expense_db_entity_1.ExpenseDbEntity])],
        controllers: [expense_controller_1.ExpenseController],
        providers: [
            create_expense_use_case_1.CreateExpenseUseCase,
            pay_expense_use_case_1.PayExpenseUseCase,
            calculate_solvability_use_case_1.CalculateSolvabilityUseCase,
            get_user_expenses_use_case_1.GetUserExpensesUseCase,
            {
                provide: expense_repository_interface_1.EXPENSE_REPOSITORY,
                useClass: typeorm_expense_repository_1.TypeOrmExpenseRepository,
            },
            {
                provide: payment_gateway_interface_1.PAYMENT_GATEWAY,
                useClass: senepay_gateway_1.SenePayGateway,
            },
        ],
        exports: [expense_repository_interface_1.EXPENSE_REPOSITORY],
    })
], ExpenseModule);
//# sourceMappingURL=expense.module.js.map