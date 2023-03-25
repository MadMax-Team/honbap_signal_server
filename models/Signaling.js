const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Signaling', {
    signalIdx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'userIdx'
      }
    },
    sigStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sigMatchStatus: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    sigStart: {
      type: DataTypes.DATE,
      allowNull: true
    },
    promiseTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    promiseArea: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Signaling',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "signalIdx" },
          { name: "userIdx" },
        ]
      },
      {
        name: "Signaling_signalIdx_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "signalIdx" },
        ]
      },
      {
        name: "FK_User_TO_Signaling_1",
        using: "BTREE",
        fields: [
          { name: "userIdx" },
        ]
      },
    ]
  });
};
