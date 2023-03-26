const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserHashTag', {
    hashIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'HashTag',
        key: 'hashIdx'
      }
    },
    userIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'UserProfile',
        key: 'userIdx'
      }
    }
  }, {
    sequelize,
    tableName: 'UserHashTag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hashIdx" },
          { name: "userIdx" },
        ]
      },
      {
        name: "FK_UserProfile_TO_UserHashTag_1",
        using: "BTREE",
        fields: [
          { name: "userIdx" },
        ]
      },
    ]
  });
};
