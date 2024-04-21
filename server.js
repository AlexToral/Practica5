"use strict";

const express = require('express');
const app = express();
app.use(express.json());
const router = require("./app/controllers/router");
const port = 3000;


app.use(router);


app.listen(port,() =>{
    console.log("Practica3 app en puerto: "+ port);
});
