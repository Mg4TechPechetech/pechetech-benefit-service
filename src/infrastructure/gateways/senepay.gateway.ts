import { Injectable } from "@nestjs/common";
import { IPaymentGateway } from "../../core/ports/payment.gateway.interface";
import { randomUUID } from "crypto";

@Injectable()
export class SenePayGateway implements IPaymentGateway {
  async paySupplier(
    supplierName: string,
    amount: number,
  ): Promise<{
    success: boolean;
    operatorReference: string;
    httpCode: number;
  }> {
    console.log(`Calling SenePay API to pay ${amount} FCFA to ${supplierName}`);

    // Bolt Optimization: Using native crypto.randomUUID() which is faster than uuidv4()
    return {
      success: true,
      operatorReference: `SENEPAY-${randomUUID().substring(0, 8).toUpperCase()}`,
      httpCode: 200,
    };
  }
}
