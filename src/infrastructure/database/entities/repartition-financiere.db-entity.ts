import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CampagnePecheDbEntity } from './campagne-peche.db-entity';

@Entity('repartition_financiere')
export class RepartitionFinanciereDbEntity {
  @PrimaryGeneratedColumn('uuid')
  idRepartition: string;

  @ManyToOne(() => CampagnePecheDbEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_campagne' })
  campagne: CampagnePecheDbEntity;

  @Column({ type: 'uuid' })
  idCampagne: string;

  @Column({ type: 'varchar', length: 100 })
  idBeneficiaire: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montantAlloue: number;

  @Column({ type: 'varchar', length: 50 })
  typePart: 'HUMAIN' | 'RESERVE_MOTEUR' | 'RESERVE_FILET' | 'RESERVE_PIROGUE';

  @CreateDateColumn()
  createdAt: Date;
}
