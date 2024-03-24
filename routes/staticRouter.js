const express = require("express");
const URL = require("../models/url")

const router = express.Router();

router.get("/", async (req, res) => {
    // return res.render("home");  // before async
    
    const allUrls = await URL.find({});
    
    return res.render("home", {
        urls: allUrls,
    });
})

module.exports = router;