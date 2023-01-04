const express = require("express");
const cookieParser = require("cookie-parser");


// Routes Imports.
const postRoutes = require('./routes/postRoute.js');
const api = require('./routes/api.js');
const complain = require('./routes/complain.js');
const routes = require('./routes/routes.js');
const user = require('./routes/user.js');

// Declarations
const app = express();
const port = process.env.PORT || 5000;

//app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Statics.
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/views', express.static(__dirname + '/views'));

// Setting Routes.
app.use('/', routes);
app.use('/post', postRoutes);
app.use('/api', api);
app.use('/complain', complain);
app.use('/user', user);

app.set("view engine", "ejs");

app.listen(port, () => console.log(`server started on port ${port}`));
