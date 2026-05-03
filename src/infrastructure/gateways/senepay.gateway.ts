import { Injectable } from '@nestjs/common';
import { IPaymentGateway } from '../../core/ports/payment.gateway.interface';
import * as crypto from 'crypto';

@Injectable()
export class SenePayGateway implements IPaymentGateway {
  async paySupplier(supplierName: string, amount: number): Promise<{ success: boolean; operatorReference: string; httpCode: number }> {
    console.log(`Calling SenePay API to pay ${amount} FCFA to ${supplierName}`);
    
    // ⚡ Bolt Performance Optimization: Using native crypto.randomUUID() instead of uuidv4()
    // Native C++ implementation is significantly faster than userland JS
    return {
      success: true,
      operatorReference: `SENEPAY-${crypto.randomUUID().substring(0, 8).toUpperCase()}`,
      httpCode: 200,
    };
  }
}
