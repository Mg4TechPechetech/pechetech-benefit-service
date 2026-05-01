import { Injectable } from '@nestjs/common';
import { IPaymentGateway } from '../../core/ports/payment.gateway.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SenePayGateway implements IPaymentGateway {
  async paySupplier(supplierName: string, amount: number): Promise<{ success: boolean; operatorReference: string; httpCode: number }> {
    console.log(`Calling SenePay API to pay ${amount} FCFA to ${supplierName}`);
    
    return {
      success: true,
      operatorReference: `SENEPAY-${uuidv4().substring(0, 8).toUpperCase()}`,
      httpCode: 200,
    };
  }
}
