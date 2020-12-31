module.exports = (sequelize, Sequelize) => {
    const SeenBy = sequelize.define("seenby", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },

        storyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "stories",
                key: "id"
            }
        }
    }, {
        updatedAt: false,
        freezeTableName: true
    });
    return SeenBy;
};
