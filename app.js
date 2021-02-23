if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// const dbUrl =  "mongodb+srv://Suya:QW1iR4HXYslRsrfM@yelpcamp.egkqw.mongodb.net/test?retryWrites=true&w=majority"
console.log(process.env.DB_URL);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp_camp';


const express       = require("express"),
	  app           = express(),
	  bodyParser    = require("body-parser"),
	  mongoose      = require("mongoose"),
	  session 		= require('express-session'),
	  flash 		= require("connect-flash"),
	  passport      = require("passport"),
	  LocalStrategy = require("passport-local"), 
	  Campground    = require("./models/campground"),
	  Comment       = require("./models/comment"),
	  methodOverride = require("method-override"),
	  User          = require("./models/user"),
	  seedDB        = require("./seeds");

let   commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
	  indexRoutes       = require("./routes/index");


const MongoDBStore = require('connect-mongo')(session);
 

app.use(bodyParser.urlencoded({extended:true}));
mongoose.set('useUnifiedTopology', true);



// const dbUrl = process.env.DB_URL;
// console.log(dbUrl)

mongoose.connect(dbUrl, { 
	useNewUrlParser: true,
	useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const secret = process.env.SECRET || 'this should be a better secret!';

const store = new MongoDBStore({
	url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride("_method")); 
app.use(flash());
// seedDB();

app.use(require("express-session")({
	store,
	name: 'session',
	secret,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});