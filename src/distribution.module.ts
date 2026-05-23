import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistributionController } from './presentation/controllers/distribution.controller';
import { CalculateDistributionUseCase } from './use-cases/calculate-benefits/calculate-distribution.use-case';
import { DistributionDbEntity } from './infrastructure/database/entities/distribution.db-entity';
import { SaveDistributionUseCase } from './use-cases/calculate-benefits/save-distribution.use-case';
import { CampagnePecheDbEntity } from './infrastructure/database/entities/campagne-peche.db-entity';
import { RegleCoutumiereDbEntity } from './infrastructure/database/entities/regle-coutumiere.db-entity';
import { RepartitionFinanciereDbEntity } from './infrastructure/database/entities/repartition-financiere.db-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DistributionDbEntity,
      CampagnePecheDbEntity,
      RegleCoutumiereDbEntity,
      RepartitionFinanciereDbEntity,
    ]),
  ],
  controllers: [DistributionController],
  providers: [CalculateDistributionUseCase, SaveDistributionUseCase],
})
export class DistributionModule implements OnModuleInit {
  constructor(
    @InjectRepository(RegleCoutumiereDbEntity)
    private readonly regleRepository: Repository<RegleCoutumiereDbEntity>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.regleRepository.count();
      if (count === 0) {
        console.log('[MCD-SEEDING] Seeding default rules into regle_coutumiere...');
        const defaultRules = [
          this.regleRepository.create({
            siteDebarquement: 'Dakar-Hann',
            typeUnite: 'PIROGUE_GLACIERE',
            formuleJson: {
              description: "Division équitable entre les membres de l'équipage, avec 1 part supplémentaire pour l'amortissement de la pirogue, et 1 part pour le moteur.",
              partsSystem: {
                crew: 1,
                pirogue: 1,
                moteur: 1,
              }
            }
          }),
          this.regleRepository.create({
            siteDebarquement: 'Mbour',
            typeUnite: 'SENNE_TOURNANTE',
            formuleJson: {
              description: "Le filet capte 1/3 du revenu net. Les 2/3 restants sont divisés entre l'équipage et le reste du matériel.",
              partsSystem: {
                filet: 0.3333,
                crewAndOther: 0.6667,
              }
            }
          })
        ];
        await this.regleRepository.save(defaultRules);
        console.log('[MCD-SEEDING] Default rules successfully seeded!');
      }
    } catch (e) {
      console.error('[MCD-SEEDING] Seeding failed:', e.message);
    }
  }
}
