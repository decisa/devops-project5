import { DataTypes, Model } from 'sequelize';

import sequelize from './connection';

export class Todo extends Model {}

Todo.init(
    {
        description: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        completedOn: {
            type: DataTypes.DATE,
            allowNull: true,
            default: null
        },
        sortOrder: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 99999
        }
    },
    {
        modelName: "todos",
        sequelize
    }
);