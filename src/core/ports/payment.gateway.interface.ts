export const PAYMENT_GATEWAY = 'PAYMENT_GATEWAY';

export interface IPaymentGateway {
  paySupplier(supplierName: string, amount: number): Promise<{ success: boolean; operatorReference: string; httpCode: number }>;
}
