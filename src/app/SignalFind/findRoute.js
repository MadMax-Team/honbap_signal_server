const findController = require('./findController');
const jwtMiddleware = require('../../../config/jwtMiddleware');

module.exports = function (app) {
  // 1. 내 위치 전송 API (초깃값) , 위치 허용 시
  // app.post('/signalFind', find.postMyLocation);

  // 2. 내 위치 업데이트 API
  app.patch('/signalFind', findController.patchMyLocation);

  // 3. range에 해당되는 내 근처 시그널 목록 조회 API
  app.get('/signalFind/list', findController.getSignalList);
};
