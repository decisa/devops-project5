module.exports.up  = (queryInterface, DataTypes) => {
    return queryInterface.createTable('todos', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
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
            allowNull: true
        },
        sortOrder: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 99999
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, 
    {
        charset: "utf8"
    });
};

module.exports.down = queryInterface => queryInterface.dropTable('todos');
