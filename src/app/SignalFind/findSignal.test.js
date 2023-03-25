// jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');
const oracledb = require('oracledb');

const request = require('supertest');
const express = require('../../../config/express');

const app = express();
const findDao = require('./findDao');
const database = require('../../../config/database');

// const { logger } = require('../../../config/winston');

describe('시그널 찾기 통합 테스트', () => {
  describe('PATCH /signalFind', () => {
    test.skip('JWT을 이용한 API 통신 상태 확인', async () => {
      const latitude = 1;
      const longitude = 1;
      // JWT 생성
      const testToken = jwt.sign({
        userIdx: 1,
      }, process.env.JWTSECRET, {
        expiresIn: '1m',
      });

      console.log(testToken);
      await request(app)
        .patch('/signalFind')
        .set('Authorization', `${testToken}`)
        .send({
          latitude,
          longitude,
        })
        .expect(200);
    });

    test.skip('API로 내 현재 위치가 수정되는지 확인', async () => {
      const testData2 = 2;
      const testUserIdx = 2;
      const testToken = jwt.sign({
        userIdx: 2,
      }, process.env.JWTSECRET, {
        expiresIn: '10m',
      });

      await request(app)
        .patch('/signalFind')
        .set('Authorization', `${testToken}`)
        .auth(testToken)
        .send({
          latitude: '2',
          longitude: '2',
        });

      const connection = await oracledb.getConnection(database);
      const result = await findDao.getUserLocation(connection, [testUserIdx]);

      const resultLatitude = result.rows[0][0];
      const resultLongitude = result.rows[0][1];
      connection.close();

      expect(resultLatitude).toEqual(testData2);
      expect(resultLongitude).toEqual(testData2);
    });
  });
});
