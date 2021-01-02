/**
 * CONTROLLERS FOR /api/v1/story
 */

const { Story, SeenBy, sequelize, User } = require("../models");
const UPLOAD_PATH = require("../../public");

// create a single story

async function create(req, res) {
    try {
        // console.log(req.file.filename);
        await Story.create({
            src: req.file.filename,
            addedby: req.signedCookies.username,
        });
        res.send("Story Added");
    } catch (error) {
        res.send(error.message);
    }
}

// retrieve all stories of a logged in user

async function get(req, res) {
    try {
        const stories = await Story.findAll({ where: { addedby: req.signedCookies.username }, attributes: { exclude: ["addedby"] } });

        // clean list of user's stories
        let list = [];

        // traversing each story and finding who saw it
        for await (story of stories) {
            story = story.toJSON();
            const users = await SeenBy.findAll({ where: { storyid: story.id } });
            let usernames = users.map((user) => user.username);
            story.seenby = usernames;
            list.push(story);
        }

        res.send(list);
    } catch (error) {
        res.send(error.message);
    }
}

// retrieve all stories of a particular user

async function getUser(req, res) {
    try {
        const list = await Story.findAll({ where: { addedby: req.params.username } });
        res.send(list);
    } catch (error) {
        res.send(error.message);
    }
}

//retireve story of a particular user by story id
async function getUserGetStory(req, res) {
    try {
        const username = req.params.username;
        const id = req.params.id;

        const story = await Story.findOne({
            where: {
                addedby: username,
                id,
            },
        });
        // if there a story found
        if (story) {
            // has the user already seen the story?
            const seen = await SeenBy.findOne({
                where: {
                    username: req.signedCookies.username,
                    storyid: id,
                },
            });
            // user has already seen the story
            if (seen) {
                res.send(story);
                return;
            }
            // otherwise user hasn't seen it
            await SeenBy.create({
                username: req.signedCookies.username,
                storyid: id,
            });
            res.send(story);
        } else {
            throw new Error("Story Not Found");
        }
    } catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
}

// delete a story
async function deleteStory(req, res) {
    try {
        const id = req.params.id; //story id
        const story = await Story.findOne({
            where: {
                addedBy: req.signedCookies.username,
                id: req.params.id,
            },
        });
        await Story.destroy({
            where: {
                addedBy: req.signedCookies.username,
                id: req.params.id,
            },
        });
        const filename = story.toJSON().src;

        const path = require("path");
        const fs = require("fs");

        // deleting the file
        fs.rmSync(path.join(UPLOAD_PATH, filename));
        res.send("Story deleted");
    } catch (error) {
        res.send(error.message);
    }
}
const controllers = {};
controllers.create = create;
controllers.get = get;
controllers.getUser = getUser;
controllers.getUserGetStory = getUserGetStory;
controllers.deleteStory = deleteStory;

module.exports = controllers;
