import { IPaymentGateway } from "../../core/ports/payment.gateway.interface";
export declare class SenePayGateway implements IPaymentGateway {
    paySupplier(supplierName: string, amount: number): Promise<{
        success: boolean;
        operatorReference: string;
        httpCode: number;
    }>;
}
