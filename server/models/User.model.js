
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstname: { type: Sequelize.DataTypes.STRING(20), allowNull: false },
        lastname: { type: Sequelize.DataTypes.STRING(20), allowNull: false },
        email: { type: Sequelize.DataTypes.STRING, allowNull: false, unique: true},
        password: { type: Sequelize.DataTypes.STRING, allowNull: false },
        username: {type: Sequelize.STRING(15), allowNull: false, unique: true}
    });

    return User;
};
