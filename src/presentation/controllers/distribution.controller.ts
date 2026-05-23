import { Controller, Post, Body } from '@nestjs/common';
import { CalculateDistributionUseCase, DistributionRequestDTO } from '../../use-cases/calculate-benefits/calculate-distribution.use-case';
import { SaveDistributionUseCase, SaveDistributionRequestDTO } from '../../use-cases/calculate-benefits/save-distribution.use-case';

@Controller('distribution')
export class DistributionController {
  constructor(
    private readonly calculateDistributionUseCase: CalculateDistributionUseCase,
    private readonly saveDistributionUseCase: SaveDistributionUseCase
  ) {}

  @Post('calculate')
  calculate(@Body() request: DistributionRequestDTO) {
    return this.calculateDistributionUseCase.execute(request);
  }

  @Post('save')
  async save(@Body() request: SaveDistributionRequestDTO) {
    return await this.saveDistributionUseCase.execute(request);
  }
}
