const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Stories = sequelize.define(
        "story",
        {
            src: { type: Sequelize.DataTypes.STRING, allowNull: false, default: "nothing" },
            addedby: {
                type: Sequelize.STRING(15),
                allowNull: false,
                references: {
                    model: "users",
                    key: "username",
                },
            },
        },
        {
            updatedAt: false,
        }
    );
    return Stories;
};
