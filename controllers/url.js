const shortid = require("shortid");
const URL = require('../../../Code/NodeJs/PGarg/14/URL_Shortener/models/url');


async function handleGenerateNewShortURL(req, res) {
    //npm i nanoid     |  https://zelark.github.io/nano-id-cc/
    const body = req.body;
    if(!body.url) return res.status(400).json( { error: 'Url is required' })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
     })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}