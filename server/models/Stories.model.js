const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Stories = sequelize.define("story", {
        src: { type: Sequelize.DataTypes.STRING, allowNull: false, default: "nothing" },
    });
    return Stories;
};
