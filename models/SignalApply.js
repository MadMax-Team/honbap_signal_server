const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SignalApply', {
    userIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'userIdx'
      }
    },
    signalIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Signaling',
        key: 'signalIdx'
      }
    },
    applyIdx: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    trashIdx: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'SignalApply',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userIdx" },
          { name: "signalIdx" },
        ]
      },
      {
        name: "FK_Signaling_TO_SignalApply_1",
        using: "BTREE",
        fields: [
          { name: "signalIdx" },
        ]
      },
    ]
  });
};
