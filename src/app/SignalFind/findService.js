const { errResponse } = require('../../../config/response');
const { logger } = require('../../../config/winston');
const { baseResponse } = require('../../../config/baseResponseStatus');
const { response } = require('../../../config/response');

const findDao = require('./findDao');
const database = require('../../../config/database');

exports.createUserLocation = async function (latitude, longitude) {
  const connection = await oracledb.getConnection(database);
  try {
    const insertUserLocationParams = [latitude, longitude];

    const locationResult = await findDao.insertUserLocation(connection, insertUserLocationParams);

    logger.log(`유저 위치 등록 시 등록된 유저 index : ${locationResult[0].userIdx}`);
    return response(baseResponse.SUCCESS);
  } 
  catch (err) {
    logger.error(`App - createUserLocation Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.close();
  }
};

exports.updateLocation = async function (latitude, longitude, userIdx) {
  // const connection = await pool.getConnection(async (conn) => conn);
  const connection = await oracledb.getConnection(database);
  oracledb.autoCommit = true;
  const params = { idx: userIdx, latit: latitude, longit: longitude };

  try {
    const result = await findDao.updateLocation(connection, params);
    return result;
  } catch (err) {
    logger.error(`App - updateLocation Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.close();
  }
};
