import { IExpenseRepository } from "../../core/ports/expense.repository.interface";
import { IPaymentGateway } from "../../core/ports/payment.gateway.interface";
export declare class PayExpenseUseCase {
    private readonly expenseRepository;
    private readonly paymentGateway;
    constructor(expenseRepository: IExpenseRepository, paymentGateway: IPaymentGateway);
    execute(expenseId: string): Promise<boolean>;
}
