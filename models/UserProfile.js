const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserProfile', {
    userIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'userIdx'
      }
    },
    nickName: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    profileImg: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    taste: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    hateFood: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Interest: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    avgSpeed: {
      type: DataTypes.CHAR(8),
      allowNull: true
    },
    preferArea: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mbti: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    userIntroduce: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserProfile',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userIdx" },
        ]
      },
    ]
  });
};
