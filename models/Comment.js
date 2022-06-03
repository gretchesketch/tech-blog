const { Model, DataTypes, Deferrable } = require('sequelize');
const uuid = require('uuid');
const sequelize = require('../config/connection');


class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING,
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
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'post',
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
        modelName: 'comment'
    }
);

module.exports = Comment;