const express = require("express");
const app = express();
const sassMiddleware = require("node-sass-middleware");
const db = require("./config/mongoose.js");
const passport = require("passport");
const passportLocal = require("./config/passport.js");
const passportJWT = require("./config/passport-jwt-strategy.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const middleware = require('./config/middleware.js');
const cors = require('cors');

app.use(cors());
const port = 8000;
app.set("view engine", "ejs");
app.set("views", "./views");


//setting up web sokets for chat
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket.js').chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server is running on port 5000");


app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(
  session({
    name: "BeSocial",
    secret: "somethingrandom",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/besocial_development",
      autoRemove: 'disabled',
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(middleware.setFlash);

app.use(express.static("./assets"));
app.use(express.urlencoded({ extended: true }));


//***************************************** */
app.use(express.json()); //This is very necessary if post request is done via fetch api
//***************************************** */


app.use("/uploads", express.static(__dirname+"/uploads"));
app.use("/", require("./routes/index.js"));


app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("your server is up and running.....");
});
