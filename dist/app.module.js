"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const expense_module_1 = require("./expense.module");
const expense_db_entity_1 = require("./infrastructure/database/entities/expense.db-entity");
const distribution_db_entity_1 = require("./infrastructure/database/entities/distribution.db-entity");
const campagne_peche_db_entity_1 = require("./infrastructure/database/entities/campagne-peche.db-entity");
const regle_coutumiere_db_entity_1 = require("./infrastructure/database/entities/regle-coutumiere.db-entity");
const repartition_financiere_db_entity_1 = require("./infrastructure/database/entities/repartition-financiere.db-entity");
const distribution_module_1 = require("./distribution.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("DB_HOST"),
                    port: configService.get("DB_PORT"),
                    username: configService.get("DB_USERNAME"),
                    password: configService.get("DB_PASSWORD"),
                    database: configService.get("DB_DATABASE"),
                    entities: [
                        expense_db_entity_1.ExpenseDbEntity,
                        distribution_db_entity_1.DistributionDbEntity,
                        campagne_peche_db_entity_1.CampagnePecheDbEntity,
                        regle_coutumiere_db_entity_1.RegleCoutumiereDbEntity,
                        repartition_financiere_db_entity_1.RepartitionFinanciereDbEntity
                    ],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            expense_module_1.ExpenseModule,
            distribution_module_1.DistributionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map