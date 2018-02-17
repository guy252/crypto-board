/**
 * To use the local express server, first run ng build, to create the dist directory.
 * To run the server - npm start
 * Server is listening on port 8080
 */

//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
