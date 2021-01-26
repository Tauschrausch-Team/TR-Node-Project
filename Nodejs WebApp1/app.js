// Tauschrausch-Server with Express (serverseitiges Webframework -> Erweiterung fuer Webanwendungen)
// you can install nodemon to prevent alsways restarting the server for changes (npm install nodemon) 
// link for xamp enviroment (a database sql enviroment): http://localhost/phpmyadmin/

// added modules for methods,(express, pug, mysql, detenv need to be installed via: 'npm install moduleName' in Win10 console)!
const path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'), // need to be installed!
    mysql = require('mysql'),
    // add Modules from './public/module'
    anotherScript = require('./public/module/classesScript.js'),
    templatingModule = require('./public/module/templating.js'),
    databaseReplacementModule = require('./public/module/databaseReplacement'),
    databaseModule = require('./public/module/Katalog.js');

// put local IP-Adress for server out
const dns = require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('Access server at: ' + add + ':' + port + '/' );
});

// Init App
const app = express();
const port = process.env.PORT || 8000; // ! change port, when Error occurred (process.env.PORT -> choose enviromental standart port)

// define connection to database
const db = mysql.createConnection({
    host: 'localhost', // ip-Adress of the server
    user: 'root',
    password: '',
    database: 'tauschrausch-database' // name of the database
});
db.connect( (err) => {
    if(err){
        console.log(err);
        console.log("Maybe check out, if the proper database exist");
    } else {
        console.log("MYSQL connected...");
    };
});

// Load View Engine
app.set("views", path.join(__dirname, 'public/views')); //source for Pug templates
app.set("view engine", "pug"); // set Viewengine to "pug" (for templating)
app.use(express.static(path.join(__dirname, 'public'))); // directory to serve static assets (like js, css, etc.)

app.use(bodyParser.urlencoded({ extended: false })); // encode special letters properly (like %,$, ...)
app.use(bodyParser.json());

// Home Route
app.get("/", function (req, res) {

    // return client ip after request
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log('device ' + ip + ' request "/" -> index.pug');

    res.render("index", {
        title: "Startseite",
        port: port
    }); 
}); 

// LogIn Route
app.get("/login", function (req, res) {
    res.render("login", {
        title: "logIn",
        content: "Kontent"
    });

    templatingModule.data.templateVariable();
});
app.post("/user", function (req, res) {
    // save data user-data in response
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role
    };

    res.render("home", {
        title: "Home",
        content: "Welcome Back",
        username: response.first_name + response.last_name
    });

    // save data in module 
    databaseReplacementModule.data.addUser(response.first_name, response.last_name, response.role, 'Password'); // password not implemented yet
    databaseReplacementModule.data.giveUser();

    console.log("You have bin successfull login:");
    console.log(response);
});

// AddUser route
app.get("/add", function (req, res) {
    res.render("createAccount", {
        title: "Create Account"
    });

    templatingModule.data.templateVariable();
});
app.post("/welcome", function (req, res) {
    // save data user-data in response
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role
    };

    res.render("home", {
        title: "Home",
        content: "Welcome to the TauschRausch - Project",
        username: response.first_name + response.last_name
    });

    // save data in module 
    databaseReplacementModule.data.addUser(response.first_name, response.last_name, response.role, 'Password'); // password not implemented yet
    databaseReplacementModule.data.giveUser();

    console.log("User has bin successfully created:");
    console.log(response);
});

// Next Route
app.get("/next", function (req, res) {
    res.render("next", {
        title: "Next",
    });

    templatingModule.data.templateVariable();
});

// database query (does not work yet)
function database_query(sql_request) {         // Abfrage der Datenbank
    connection.query(sql_request, function (err, result) {
        if (err) {
            console.log("Result: " + result);
        }
    });
}
var value
app.get("/katalog", function (req, res) {
    res.render("katalog", {
        title: "Katalogseite",
        sql_request: value
    });

    templatingModule.data.templateVariable();
});


// use queryparams for navigating in "katalog"
// app.get('/articles/:articleID', function(req, res, next) {
//     var articleID = req.params.articleID;
//     Product.find({title: article.name}, function (err, article) {
//         if(err) {
//             res.render('articles/search', {article: null});
//         }
//         res.render("article", {
//             title: article.name,
//             content: article.content
//         });
//         next();
//     });
// });

// Start Server
app.listen(port, function () {
    console.log('Server & Template engine listening on port:' + port);
});