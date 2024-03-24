const express = require("express");
const path = require("path")
const {connectToMongoDB} = require("./connect");
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const URL = require('./models/url')


const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log("MongoDb connected!");
})


// Setting Templating engine  / view engine for server side rendering

app.set("view engine", "ejs");        // Telling express that our view engine is ejs
app.set("views", path.resolve("./views"));  // Telling express that all the ejs files are in views


app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// Server side rendering  -> normally (tedious)

// app.get("/test", (req, res) => {
//     return res.end("<h1>Hey from server</h1>");
// })

/////////////////////

// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.end(`
//         <html>
//             <head></head>
//             <body>
//                 <ol>
//                     ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
//                 </ol>
//             </body>
//         </html>
//     `)
// })


// Server side rendering using View Engine


// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     // return res.render('home')  

//     // we can pass variables
//     return res.render('home', {
//         urls: allUrls,
        
//     })  
// })

{/*    ->  home file
<h1>Hey from Server!</h1>
    <% urls.forEach(url => { %>
        <li><%= url.shortId %></li>
    <% }) %> 
*/}

///////////////////////////////////////////////////////////////

// Creating a router (Static router  ->  Front end pages)


app.use("/", staticRoute)


app.use("/url", urlRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                } 
            }
        }
    );
    res.redirect(entry.redirectURL);
})


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
