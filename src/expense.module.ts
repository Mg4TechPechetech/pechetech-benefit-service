import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpenseController } from "./presentation/controllers/expense.controller";
import { CreateExpenseUseCase } from "./use-cases/expense/create-expense.use-case";
import { PayExpenseUseCase } from "./use-cases/expense/pay-expense.use-case";
import { CalculateSolvabilityUseCase } from "./use-cases/finance/calculate-solvability.use-case";
import { EXPENSE_REPOSITORY } from "./core/ports/expense.repository.interface";
import { TypeOrmExpenseRepository } from "./infrastructure/repositories/typeorm-expense.repository";
import { ExpenseDbEntity } from "./infrastructure/database/entities/expense.db-entity";
import { PAYMENT_GATEWAY } from "./core/ports/payment.gateway.interface";
import { SenePayGateway } from "./infrastructure/gateways/senepay.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseDbEntity])],
  controllers: [ExpenseController],
  providers: [
    CreateExpenseUseCase,
    PayExpenseUseCase,
    CalculateSolvabilityUseCase,
    {
      provide: EXPENSE_REPOSITORY,
      useClass: TypeOrmExpenseRepository,
    },
    {
      provide: PAYMENT_GATEWAY,
      useClass: SenePayGateway,
    },
  ],
  exports: [EXPENSE_REPOSITORY],
})
export class ExpenseModule {}
