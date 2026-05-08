import { Module } from "@nestjs/common";
import { ExpenseController } from "./presentation/controllers/expense.controller";
import { CreateExpenseUseCase } from "./use-cases/expense/create-expense.use-case";
import { PayExpenseUseCase } from "./use-cases/expense/pay-expense.use-case";
import { EXPENSE_REPOSITORY } from "./core/ports/expense.repository.interface";
import { InMemoryExpenseRepository } from "./infrastructure/repositories/in-memory-expense.repository";
import { PAYMENT_GATEWAY } from "./core/ports/payment.gateway.interface";
import { SenePayGateway } from "./infrastructure/gateways/senepay.gateway";

@Module({
  controllers: [ExpenseController],
  providers: [
    CreateExpenseUseCase,
    PayExpenseUseCase,
    {
      provide: EXPENSE_REPOSITORY,
      useClass: InMemoryExpenseRepository,
    },
    {
      provide: PAYMENT_GATEWAY,
      useClass: SenePayGateway,
    },
  ],
})
export class ExpenseModule {}
