const Sequelize = require("sequelize");
const load = require("dotenv").config();
require("colors");
if (load.error) throw load.error;
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false
});

// some preflight
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the Db Established".bold.magenta);
       // await sequelize.sync({ alter: true })
        console.log("SYNC COMPLETE".bold.magenta);
    } catch (err) {
        console.log(err.message.bold.red);
    }
})();

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./User.model')(sequelize, Sequelize);
db.Story = require('./Stories.model')(sequelize, Sequelize);
db.SeenBy = require('./Seen-By.model')(sequelize, Sequelize);

// // RELATIONS
// db.Story.hasMany(db.SeenBy);
// db.SeenBy.belongsTo(db.Story);


module.exports = db;