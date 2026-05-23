import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistributionDbEntity } from '../../infrastructure/database/entities/distribution.db-entity';
import { CampagnePecheDbEntity } from '../../infrastructure/database/entities/campagne-peche.db-entity';
import { RepartitionFinanciereDbEntity } from '../../infrastructure/database/entities/repartition-financiere.db-entity';
import { DistributionResponseDTO } from './calculate-distribution.use-case';

export interface SaveDistributionRequestDTO {
  grossRevenue: number;
  totalExpenses: number;
  numberOfFishermen: number;
  unitType: 'PIROGUE_GLACIERE' | 'SENNE_TOURNANTE';
  calculationResult: DistributionResponseDTO;
  idPirogue?: string;
  dateDebut?: Date;
  dateFin?: Date;
  pirogueParts?: number;
  moteurParts?: number;
  filetFraction?: number;
}

@Injectable()
export class SaveDistributionUseCase {
  constructor(
    @InjectRepository(DistributionDbEntity)
    private readonly distributionRepository: Repository<DistributionDbEntity>,
    @InjectRepository(CampagnePecheDbEntity)
    private readonly campagneRepository: Repository<CampagnePecheDbEntity>,
    @InjectRepository(RepartitionFinanciereDbEntity)
    private readonly repartitionRepository: Repository<RepartitionFinanciereDbEntity>,
  ) {}

  async execute(request: SaveDistributionRequestDTO): Promise<DistributionDbEntity> {
    // 1. Sauvegarde dans la table récapitulative classique
    const newDistribution = this.distributionRepository.create({
      grossRevenue: request.grossRevenue,
      totalExpenses: request.totalExpenses,
      numberOfFishermen: request.numberOfFishermen,
      unitType: request.unitType,
      netRevenue: request.calculationResult.netRevenue,
      amortizationFund: request.calculationResult.amortizationFund,
      netSharePerFisherman: request.calculationResult.netSharePerFisherman,
      equipmentShare: request.calculationResult.equipmentShare,
    });

    const savedDistribution = await this.distributionRepository.save(newDistribution);

    try {
      // 2. Sauvegarde dans le modèle MCD officiel : CAMPAGNE_PECHE
      const newCampagne = this.campagneRepository.create({
        idPirogue: request.idPirogue || 'PIROGUE-DEMO-01',
        dateDebut: request.dateDebut || new Date(),
        dateFin: request.dateFin || new Date(),
        revenuBrut: request.grossRevenue,
      });

      const savedCampagne = await this.campagneRepository.save(newCampagne);

      // 3. Sauvegarde dans le modèle MCD officiel : REPARTITION_FINANCIERE
      const partitions: RepartitionFinanciereDbEntity[] = [];

      // A. Parts humaines (pêcheurs)
      for (let i = 1; i <= request.numberOfFishermen; i++) {
        partitions.push(
          this.repartitionRepository.create({
            idCampagne: savedCampagne.idCampagne,
            idBeneficiaire: `PECHEUR-${i}`,
            montantAlloue: request.calculationResult.netSharePerFisherman,
            typePart: 'HUMAIN',
          }),
        );
      }

      // B. Parts matérielles/réserves
      if (request.unitType === 'PIROGUE_GLACIERE') {
        const pParts = request.pirogueParts !== undefined ? request.pirogueParts : 1;
        const mParts = request.moteurParts !== undefined ? request.moteurParts : 1;
        const totalEquip = pParts + mParts;

        const pirogueAlloc = totalEquip > 0 ? (pParts / totalEquip) * request.calculationResult.amortizationFund : 0;
        const moteurAlloc = totalEquip > 0 ? (mParts / totalEquip) * request.calculationResult.amortizationFund : 0;

        partitions.push(
          this.repartitionRepository.create({
            idCampagne: savedCampagne.idCampagne,
            idBeneficiaire: 'RESERVE_PIROGUE_FUND',
            montantAlloue: pirogueAlloc,
            typePart: 'RESERVE_PIROGUE',
          }),
          this.repartitionRepository.create({
            idCampagne: savedCampagne.idCampagne,
            idBeneficiaire: 'RESERVE_MOTEUR_FUND',
            montantAlloue: moteurAlloc,
            typePart: 'RESERVE_MOTEUR',
          }),
        );
      } else if (request.unitType === 'SENNE_TOURNANTE') {
        // Filet (1/3 du revenu net)
        if (request.calculationResult.equipmentShare) {
          partitions.push(
            this.repartitionRepository.create({
              idCampagne: savedCampagne.idCampagne,
              idBeneficiaire: 'RESERVE_FILET_FUND',
              montantAlloue: request.calculationResult.equipmentShare,
              typePart: 'RESERVE_FILET',
            }),
          );
        }
        // Amortissement annexe
        if (request.calculationResult.amortizationFund) {
          partitions.push(
            this.repartitionRepository.create({
              idCampagne: savedCampagne.idCampagne,
              idBeneficiaire: 'RESERVE_MOTEUR_FUND',
              montantAlloue: request.calculationResult.amortizationFund,
              typePart: 'RESERVE_MOTEUR',
            }),
          );
        }
      }

      await this.repartitionRepository.save(partitions);
    } catch (dbError) {
      // On capture l'erreur pour ne pas bloquer l'API principale si l'écriture secondaire échoue
      console.error('[MCD-PERSISTENCE] Error saving campaign/partitions:', dbError.message);
    }

    return savedDistribution;
  }
}
