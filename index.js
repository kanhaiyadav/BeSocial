const express = require('express');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const port = 8000;
app.set('view engine', 'ejs');
app.set('views', './views');



app.use(express.static('./assets'))
app.use(express.urlencoded({ extended: true }));
app.use('/', require("./routes"));
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))


app.listen(port, (err)=>{
    if(err)
    {
        console.error(err);
        return;
    }
    console.log("your server is up and running.....");
})