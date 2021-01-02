module.exports = (sequelize, Sequelize) => {
    const SeenBy = sequelize.define("seenby", {
        username: {
            type: Sequelize.STRING(15),
            allowNull: false,
            references: {
                model: "users",
                key: "username",
            },
        },

        storyid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "stories",
                key: "id"
            }
        }
    }, {
        updatedAt: false,
        freezeTableName: true,
        createdAt: false
    });
    return SeenBy;
};
