import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('campagne_peche')
export class CampagnePecheDbEntity {
  @PrimaryGeneratedColumn('uuid')
  idCampagne: string;

  @Column({ type: 'varchar', length: 100, default: 'PIROGUE-DEMO-01' })
  idPirogue: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  dateDebut: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  dateFin: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  revenuBrut: number;

  @CreateDateColumn()
  createdAt: Date;
}
