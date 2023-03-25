async function insertUserLocation(connection, params) {
  const query = `
                  INSERT INTO UserLocation(latitude, longitude)
                  VALUES(?,?);
                  `;
  const row = await connection.execute(query, params);
  return row;
}

async function updateLocation(connection, params) {
  const query = `
                  UPDATE location
                  SET latitude = :latit, longitude = :longit
                  WHERE useridx = :idx
                `;
  const row = await connection.execute(query, params);
  return row;
}

// userLocation Table에서 내 최신 위치 정보 불러오기 " "이 아니라 ' '하니까 되네;;
async function getUserLocation(connection, idx) {
  const query = `
                  SELECT latitude, longitude
                  FROM location
                  WHERE useridx = :idx
                `;
  const row = await connection.execute(query, idx);

  return row;
}

async function getSignalStatus(connection, params) {
  const query = `
                  SELECT up.*, u.nickName, s.signalIdx, s.sigPromiseArea, s.sigPromiseTime, s.checkSigWrite
                  FROM Signaling AS s
                          LEFT JOIN User AS u ON s.userIdx = u.userIdx
                          LEFT JOIN UserProfile AS up ON s.userIdx = up.userIdx
                  WHERE s.sigStatus = 1;
                `;
  const row = await connection.execute(query, params);

  return row;
}

module.exports = {
  insertUserLocation, // 1
  updateLocation, // 2
  getUserLocation, // 3
  getSignalStatus, // 4
};
