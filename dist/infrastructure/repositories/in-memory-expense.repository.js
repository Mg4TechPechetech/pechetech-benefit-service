"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryExpenseRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryExpenseRepository = class InMemoryExpenseRepository {
    constructor() {
        this.expenses = new Map();
    }
    async findById(id) {
        return this.expenses.get(id) || null;
    }
    async findAll(userId) {
        return Array.from(this.expenses.values()).filter(e => e.userId === userId);
    }
    async save(expense) {
        this.expenses.set(expense.id, expense);
    }
    async update(expense) {
        this.expenses.set(expense.id, expense);
    }
};
exports.InMemoryExpenseRepository = InMemoryExpenseRepository;
exports.InMemoryExpenseRepository = InMemoryExpenseRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryExpenseRepository);
//# sourceMappingURL=in-memory-expense.repository.js.map