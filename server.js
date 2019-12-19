// simplecode-api/server.js
// Include express
const express = require("express");

// This line simply puts Express in a variable called 'app'
const server = express(); // Include body-parser


const parentRoutes = require("./api/routes/parents");

server.use("/v1/parents", parentRoutes);
// Server will listen to whatever is in the environment variable 'port'
// or 3000 if nothing is specified
const port = process.env.PORT || 7777;

// express returns an HTTP server
server.listen(port, () => console.log("[Server] online " + new Date()));