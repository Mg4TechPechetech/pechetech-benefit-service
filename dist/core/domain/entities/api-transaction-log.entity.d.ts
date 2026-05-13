export declare class ApiTransactionLog {
    readonly id: string;
    readonly expenseId: string;
    readonly operatorReference: string;
    readonly httpReturnCode: number;
    constructor(id: string, expenseId: string, operatorReference: string, httpReturnCode: number);
}
