const findProvider = require('./findProvider');
const findService = require('./findService');
const baseResponse = require('../../../config/baseResponseStatus');
const { response } = require('../../../config/response');
const { logger } = require('../../../config/winston');

/**
 * API No. 1
 * API Name : 내 위치 전송 API (초기에 한번 실행)
 * [POST] /app/signalFind/:myLocation
 */
exports.postMyLocation = async function (req, res) {
  const [latitude, longitude] = [req.body.latitude, req.body.longitude];

  if (!latitude) return res.send(response(baseResponse.SIGNALFIND_LATITUDE_EMPTY));
  if (!longitude) return res.send(response(baseResponse.SIGNALFIND_LONGITUDE_EMPTY));

  const locationResponse = await findService.createUserLocation(
    latitude,
    longitude,
  );

  return res.send(response(baseResponse.SUCCESS, locationResponse));
};
/**
 * API No. 2
 * API Name : 내 위치 업데이트 API
 * [GET] /app/signalFind?myLocation={myLocation}&useridx={useridx}''
 */

exports.patchMyLocation = async function (req, res) {
  const [latitude, longitude] = [req.body.latitude, req.body.longitude];
  // const { userIdx } = req.verifiedToken;
  userIdx =1;

  // 빈 값 체크
  if (!latitude) return res.send(response(baseResponse.SIGNALFIND_LATITUDE_EMPTY));

  if (!longitude) return res.send(response(baseResponse.SIGNALFIND_LONGITUDE_EMPTY));

  if (!userIdx) return res.send(response(baseResponse.SIGNALFIND_USERIDX_EMPTY));

  const result = await findService.updateLocation(latitude, longitude, userIdx);

  return res.send(response(baseResponse.SUCCESS, result[0]));
};
/**
 * API No. 3
 * API Name : range = 10km에 해당되는 내 근처 시그널 목록 조회 API
 * [GET] /app/signalFind/list/:useridx/'
 */

exports.getSignalList = async function (req, res) {
  // const [userIdx] = req.verifiedToken.userIdx;
  // if (!userIdx) return res.send(response(baseResponse.SIGNALFIND_USERIDX_EMPTY));
  const userIdx = 1;
  const params = [userIdx];
  const signalListResponse = await findProvider.getNearSignalONList(params);

  return res.send(response(baseResponse.SUCCESS, signalListResponse));
};
