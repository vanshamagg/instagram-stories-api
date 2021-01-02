//  /api/v1/story

const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require('uuid');
const controllers =  require('../controllers/story.controller');
const UPLOAD_PATH = require("../../public");

let storage = multer.diskStorage({
    destination: UPLOAD_PATH,
    filename: (req, file, cb) => {
        let arr = file.originalname.split('.');
        let ext = arr[arr.length-1];
        let newName = uuid.v4() + "." + ext;
        cb(null, newName);

    },
});
const upload = multer({ storage });


router.post("/", upload.single("image"), controllers.create);
router.get('/', controllers.get);
router.get('/:username', controllers.getUser);
router.get('/:username/:id', controllers.getUserGetStory);
router.delete('/:id', controllers.deleteStory);


module.exports = router;
