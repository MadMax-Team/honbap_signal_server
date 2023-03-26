const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Review', {
    reviewIdx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    userIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Signaling',
        key: 'userIdx'
      }
    },
    review: {
      type: DataTypes.STRING(350),
      allowNull: true
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Review',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reviewIdx" },
          { name: "signalIdx" },
          { name: "userIdx" },
        ]
      },
      {
        name: "Review_reviewIdx_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reviewIdx" },
        ]
      },
      {
        name: "FK_Signaling_TO_Review_1",
        using: "BTREE",
        fields: [
          { name: "signalIdx" },
        ]
      },
      {
        name: "FK_Signaling_TO_Review_2",
        using: "BTREE",
        fields: [
          { name: "userIdx" },
        ]
      },
    ]
  });
};
