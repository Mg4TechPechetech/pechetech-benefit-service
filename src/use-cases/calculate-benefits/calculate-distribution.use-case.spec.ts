import { CalculateDistributionUseCase, DistributionRequestDTO } from './calculate-distribution.use-case';

describe('CalculateDistributionUseCase', () => {
  let useCase: CalculateDistributionUseCase;

  beforeEach(() => {
    useCase = new CalculateDistributionUseCase();
  });

  it('should return 0 for all fields if net revenue is 0 or negative', () => {
    const request: DistributionRequestDTO = {
      grossRevenue: 1000,
      totalExpenses: 1200,
      numberOfFishermen: 5,
      unitType: 'PIROGUE_GLACIERE',
    };

    const result = useCase.execute(request);

    expect(result.netRevenue).toBe(-200);
    expect(result.amortizationFund).toBe(0);
    expect(result.netSharePerFisherman).toBe(0);
    expect(result.equipmentShare).toBe(0);
  });

  describe('PIROGUE_GLACIERE logic', () => {
    it('should calculate distribution correctly for PIROGUE_GLACIERE', () => {
      const request: DistributionRequestDTO = {
        grossRevenue: 600000,
        totalExpenses: 100000,
        numberOfFishermen: 3,
        unitType: 'PIROGUE_GLACIERE',
      };
      
      // Net Revenue: 500,000
      // Total Parts: 3 (fishermen) + 1 (boat) + 1 (motor) = 5 parts
      // Value per part = 500,000 / 5 = 100,000
      // Amortization = 2 parts = 200,000
      // Net Share per Fisherman = 1 part = 100,000

      const result = useCase.execute(request);

      expect(result.netRevenue).toBe(500000);
      expect(result.amortizationFund).toBe(200000);
      expect(result.netSharePerFisherman).toBe(100000);
      expect(result.equipmentShare).toBeUndefined(); // Not applicable for PIROGUE_GLACIERE
    });
  });

  describe('SENNE_TOURNANTE logic', () => {
    it('should calculate distribution correctly for SENNE_TOURNANTE', () => {
      const request: DistributionRequestDTO = {
        grossRevenue: 1000000,
        totalExpenses: 100000,
        numberOfFishermen: 5,
        unitType: 'SENNE_TOURNANTE',
      };

      // Net Revenue: 900,000
      // Equipment (Net/Filet) Share: 1/3 of Net = 300,000
      // Remaining: 600,000
      // Divided by fishermen + 1: 5 + 1 = 6 parts
      // Value per remaining part = 600,000 / 6 = 100,000
      // Amortization (Reserve) = 100,000
      // Net Share per Fisherman = 100,000

      const result = useCase.execute(request);

      expect(result.netRevenue).toBe(900000);
      expect(result.equipmentShare).toBeCloseTo(300000);
      expect(result.amortizationFund).toBeCloseTo(100000);
      expect(result.netSharePerFisherman).toBeCloseTo(100000);
    });
  });

  describe('Custom parameters logic', () => {
    it('should calculate distribution correctly for PIROGUE_GLACIERE with custom parts', () => {
      const request: DistributionRequestDTO = {
        grossRevenue: 600000,
        totalExpenses: 100000,
        numberOfFishermen: 3,
        unitType: 'PIROGUE_GLACIERE',
        pirogueParts: 1.5,
        moteurParts: 0.5,
      };

      const result = useCase.execute(request);

      expect(result.netRevenue).toBe(500000);
      expect(result.amortizationFund).toBe(200000);
      expect(result.netSharePerFisherman).toBe(100000);
    });

    it('should calculate distribution correctly for SENNE_TOURNANTE with custom filetFraction and moteurParts', () => {
      const request: DistributionRequestDTO = {
        grossRevenue: 1000000,
        totalExpenses: 100000,
        numberOfFishermen: 5,
        unitType: 'SENNE_TOURNANTE',
        filetFraction: 0.4, // 40% instead of 33.33%
        moteurParts: 2, // 2 parts instead of 1
      };

      const result = useCase.execute(request);

      expect(result.netRevenue).toBe(900000);
      expect(result.equipmentShare).toBe(360000); // 40% of 900000
      expect(result.amortizationFund).toBeCloseTo(154285.71, 1); // 2 parts out of 7 of 540000
      expect(result.netSharePerFisherman).toBeCloseTo(77142.85, 1); // 1 part out of 7 of 540000
    });
  });

  it('should throw an error for unsupported unitType', () => {
    const request: any = {
      grossRevenue: 5000,
      totalExpenses: 1000,
      numberOfFishermen: 5,
      unitType: 'UNSUPPORTED_TYPE',
    };

    expect(() => useCase.execute(request)).toThrow("Type d'unité non supporté");
  });
});
