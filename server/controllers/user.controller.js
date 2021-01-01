const { User } = require("../models");

async function getAll(req, res, next) {
    try {
        const list = await User.findAll();
        res.send(list);
    } catch (error) {
        res.send(error.message);
    }
}

async function getOne(req, res, next) {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if(user) res.send(user);
        else res.status(404).send("User not found")
    } catch (error) {
        res.send(error.message);
    }
}

async function create(req, res, next) {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        await User.create({
            firstname,
            lastname,
            username,
            email,
            password,
        });
        console.log("User Added to Db");
        res.send("User created Successfully");
    } catch (error) {
        res.send(error.message);
    }
}

async function update(req, res, next) {
    try {
        const { firstname, lastname, username, password, email } = req.body;
        await User.update({ firstname, lastname, username, password }, { where: { email } });
        res.send("User Updated");
    } catch (error) {
        res.send(error.message);
    }
}

async function destroy(req, res, next) {
    try {
        const username = req.params.username;
        await User.destroy({ where: { username } });
        res.send("User Deleted");
    } catch (error) {
        res.send(error.message);
    }
}

const controllers = {};
controllers.create = create;
controllers.getAll = getAll;
controllers.update = update;
controllers.destroy = destroy;
controllers.getOne = getOne;

module.exports = controllers;
