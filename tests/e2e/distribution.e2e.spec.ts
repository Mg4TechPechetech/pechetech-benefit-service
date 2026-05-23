import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('DistributionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/distribution/calculate (POST) - PIROGUE_GLACIERE', () => {
    return request(app.getHttpServer())
      .post('/distribution/calculate')
      .send({
        grossRevenue: 600000,
        totalExpenses: 100000,
        numberOfFishermen: 3,
        unitType: 'PIROGUE_GLACIERE'
      })
      .expect(201) // or 200 depending on NestJS default for POST
      .expect((res) => {
        expect(res.body.netRevenue).toEqual(500000);
        expect(res.body.amortizationFund).toEqual(200000);
        expect(res.body.netSharePerFisherman).toEqual(100000);
      });
  });

  it('/distribution/calculate (POST) - SENNE_TOURNANTE', () => {
    return request(app.getHttpServer())
      .post('/distribution/calculate')
      .send({
        grossRevenue: 1000000,
        totalExpenses: 100000,
        numberOfFishermen: 5,
        unitType: 'SENNE_TOURNANTE'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.netRevenue).toEqual(900000);
        expect(res.body.equipmentShare).toEqual(300000); // 1/3 of 900,000
        expect(res.body.amortizationFund).toEqual(100000); // 600k / 6
        expect(res.body.netSharePerFisherman).toEqual(100000);
      });
  });
});
