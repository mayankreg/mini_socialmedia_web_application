const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 

app.use(express.urlencoded());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// where to lookout for static files
app.use(express.static('./assets'));

// use ejs layouts : before routers
app.use(expressLayouts);

// extract styles & scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`); // interpolation
    }
    console.log(`server is running on port: ${port}`);
});