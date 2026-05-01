export class ApiTransactionLog {
  constructor(
    public readonly id: string,
    public readonly expenseId: string,
    public readonly operatorReference: string,
    public readonly httpReturnCode: number,
  ) {}
}
