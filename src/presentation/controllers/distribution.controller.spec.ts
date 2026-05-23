import { Test, TestingModule } from '@nestjs/testing';
import { DistributionController } from './distribution.controller';
import { CalculateDistributionUseCase } from '../../use-cases/calculate-benefits/calculate-distribution.use-case';
import { SaveDistributionUseCase } from '../../use-cases/calculate-benefits/save-distribution.use-case';

describe('DistributionController', () => {
  let controller: DistributionController;
  let useCase: CalculateDistributionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistributionController],
      providers: [
        {
          provide: CalculateDistributionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: SaveDistributionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DistributionController>(DistributionController);
    useCase = module.get<CalculateDistributionUseCase>(CalculateDistributionUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculate', () => {
    it('should call the use case and return the expected response', () => {
      const request = {
        grossRevenue: 1000000,
        totalExpenses: 100000,
        numberOfFishermen: 5,
        unitType: 'SENNE_TOURNANTE' as 'PIROGUE_GLACIERE' | 'SENNE_TOURNANTE',
      };

      const expectedResponse = {
        netRevenue: 900000,
        amortizationFund: 100000,
        netSharePerFisherman: 100000,
        equipmentShare: 300000,
      };

      jest.spyOn(useCase, 'execute').mockReturnValue(expectedResponse);

      const result = controller.calculate(request);

      expect(useCase.execute).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResponse);
    });
  });
});
