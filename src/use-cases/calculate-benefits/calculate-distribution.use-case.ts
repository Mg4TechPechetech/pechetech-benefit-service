import { Injectable } from '@nestjs/common';

export interface DistributionRequestDTO {
  grossRevenue: number;
  totalExpenses: number;
  numberOfFishermen: number;
  unitType: 'PIROGUE_GLACIERE' | 'SENNE_TOURNANTE';
  pirogueParts?: number;
  moteurParts?: number;
  filetFraction?: number;
}

export interface DistributionResponseDTO {
  netRevenue: number;
  amortizationFund: number;
  netSharePerFisherman: number;
  equipmentShare?: number; // Used for SENNE_TOURNANTE (net)
}

@Injectable()
export class CalculateDistributionUseCase {
  execute(request: DistributionRequestDTO): DistributionResponseDTO {
    const netRevenue = request.grossRevenue - request.totalExpenses;
    let amortizationFund = 0;
    let netSharePerFisherman = 0;
    let equipmentShare = 0;

    const pirogueParts = request.pirogueParts !== undefined ? request.pirogueParts : 1;
    const moteurParts = request.moteurParts !== undefined ? request.moteurParts : 1;
    const filetFraction = request.filetFraction !== undefined ? request.filetFraction : (1 / 3);

    if (netRevenue <= 0) {
        return {
            netRevenue,
            amortizationFund: 0,
            netSharePerFisherman: 0,
            equipmentShare: 0
        };
    }

    if (request.unitType === 'PIROGUE_GLACIERE') {
      // Total parts = fishermen + pirogueParts + moteurParts
      const totalParts = request.numberOfFishermen + pirogueParts + moteurParts;
      const valuePerPart = netRevenue / totalParts;

      amortizationFund = valuePerPart * (pirogueParts + moteurParts);
      netSharePerFisherman = valuePerPart;
      
    } else if (request.unitType === 'SENNE_TOURNANTE') {
      // Net share for the net is calculated based on filetFraction of net revenue
      equipmentShare = netRevenue * filetFraction;
      const remaining = netRevenue - equipmentShare;
      
      // The rest is divided by fishermen + moteurParts (annex equipment/fund)
      const valuePerPartRemaining = remaining / (request.numberOfFishermen + moteurParts);
      
      amortizationFund = valuePerPartRemaining * moteurParts;
      netSharePerFisherman = valuePerPartRemaining;
    } else {
        throw new Error("Type d'unité non supporté");
    }

    return {
      netRevenue,
      amortizationFund,
      netSharePerFisherman,
      ...(request.unitType === 'SENNE_TOURNANTE' && { equipmentShare })
    };
  }
}
