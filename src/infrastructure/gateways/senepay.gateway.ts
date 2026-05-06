import { Injectable } from "@nestjs/common";
import { IPaymentGateway } from "../../core/ports/payment.gateway.interface";
import * as crypto from "crypto";

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

    // Performance Optimization: Using native crypto.randomUUID() instead of the 'uuid' package
    // Impact: Avoids external dependency overhead and performs faster
    return {
      success: true,
      operatorReference: `SENEPAY-${crypto.randomUUID().substring(0, 8).toUpperCase()}`,
      httpCode: 200,
    };
  }
}
