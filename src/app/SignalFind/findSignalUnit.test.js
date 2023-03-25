const findProvider = require('./findProvider');

// const { logger } = require('../../../config/winston');

describe('시그널 찾기 유닛 테스트', () => {
  describe('PATCH /signalFind', () => {
    test.only('내 근처 10km 내 시그널 ON인 유저 가져오는 함수 로직 테스트', async () => {
      const loginUserIdx = 1;
      const signalOnUsers = [{"userIdx" : 1}, {"userIdx" : 2}, {"userIdx" : 3}];
      const result = findProvider.getNearSignalONList(loginUserIdx, signalOnUsers);

      console.log(`${result.message}`);

      expect(JSON.stringify(result[0]).userIdx).toEqual(2);
    });
  });
});
