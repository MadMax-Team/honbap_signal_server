const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HashTag', {
    hashIdx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hashTagName: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'HashTag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hashIdx" },
        ]
      },
      {
        name: "HashTag_hashIdx_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hashIdx" },
        ]
      },
    ]
  });
};
