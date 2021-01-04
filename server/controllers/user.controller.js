const { User } = require("../models");
const bcrypt=require('bcryptjs');

// get list of all users
async function getAll(req, res, next) {
    try {
        const list = await User.findAll();
        res.send(list);
    } catch (error) {
        res.send(error.message);
    }
}

// get details of the user in params
async function getOne(req, res, next) {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if(user) res.send(user);
        else res.status(404).send("User not found")
    } catch (error) {
        res.send(error.message);
    }
}

// sign up
async function create(req, res, next) {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const newuser={
            firstname,
            lastname,
            username,
            email,
            password,
        }
        const salt=await bcrypt.genSalt(10);
        newuser.password=await bcrypt.hash(password,salt);
       const data= await User.create(newuser);
        console.log("User Added to Db");
        res.send("User created Successfully");
    } catch (error) {
        res.send(error.message);
    }
}

// update any user using email, because email cannot be changed.
async function update(req, res, next) {
    try {
        const { firstname, lastname, username, password, email } = req.body;
        await User.update({ firstname, lastname, username, password }, { where: { email } });
        res.send("User Updated");
    } catch (error) {
        res.send(error.message);
    }
}

// delete a user.
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
