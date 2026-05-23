import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('regle_coutumiere')
export class RegleCoutumiereDbEntity {
  @PrimaryGeneratedColumn('uuid')
  idRegle: string;

  @Column({ type: 'varchar', length: 100 })
  siteDebarquement: string;

  @Column({ type: 'varchar', length: 50 })
  typeUnite: string;

  @Column({ type: 'jsonb' })
  formuleJson: any;

  @CreateDateColumn()
  createdAt: Date;
}
