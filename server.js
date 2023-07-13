// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Get Enviroment Variables
const dotenv = require("dotenv");
dotenv.config();

// establish a connection to the mongo database mongodb://localhost:27017
//.connect("mongodb://127.0.0.1:27017/todoDB", { useNewUrlParser: true })
mongoose
//G8lEu0qcS58bePfl
//  .connect("mongodb://127.0.0.1:27017/todoDB", { useNewUrlParser: true })
  // .connect("mongodb+srv://todoUser:G8lEu0qcS58bePfl.729um46.mongodb.net/?retryWrites=true&w=majority")
  .connect("mongodb+srv://mdowns:Km64JrPLuZVXjpXw@cluster0.729um46.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection failed: " + err));
  

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const todoRoutes = require('./server/routes/todos');

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
// app.use(express.static(path.join(__dirname, 'dist/todo-list')));
app.use(express.static(path.join(__dirname, 'docs')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/todos', todoRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
  // res.sendFile(path.join(__dirname, 'dist/todo-list/index.html'));
  res.sendFile(path.join(__dirname, 'docs/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on port: ' + port)
});
