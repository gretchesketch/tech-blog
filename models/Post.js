const { Model, DataTypes, Deferrable } = require('sequelize');
const uuid = require('uuid');

const sequelize = require('../config/connection.js');

class Post extends Model { }

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 120]
      }
    },
    post_contents: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;