import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpenseModule } from "./expense.module";
import { ExpenseDbEntity } from "./infrastructure/database/entities/expense.db-entity";
import { DistributionDbEntity } from "./infrastructure/database/entities/distribution.db-entity";
import { CampagnePecheDbEntity } from "./infrastructure/database/entities/campagne-peche.db-entity";
import { RegleCoutumiereDbEntity } from "./infrastructure/database/entities/regle-coutumiere.db-entity";
import { RepartitionFinanciereDbEntity } from "./infrastructure/database/entities/repartition-financiere.db-entity";
import { DistributionModule } from "./distribution.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        entities: [
          ExpenseDbEntity, 
          DistributionDbEntity,
          CampagnePecheDbEntity,
          RegleCoutumiereDbEntity,
          RepartitionFinanciereDbEntity
        ],
        synchronize: true, // Seul pour le développement local
      }),
      inject: [ConfigService],
    }),
    ExpenseModule,
    DistributionModule,
  ],
})
export class AppModule {}
