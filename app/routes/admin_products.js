"use strict";

const express = require("express");
const router = express.Router();
const dataHandler = require("./../controllers/data_handler");

/*router.route("/")
    .post((req,res) => {
        let product = req.body;
        try {
            dataHandler.createProduct(product);
        } catch(e) {
            // Manejo de errores
        }
        res.send("Se creó el producto");
    });

router.route("/:id")
    .put((req,res)=>{
        let id = req.params.id;
        let product = req.body;
        try {
            dataHandler.updateProduct(id, product); // Asegúrate de pasar el ID y el producto como argumentos
        } catch(e) {
            // Manejo de errores
        }
        res.send("Se actualizó el producto");
    })
    .delete((req,res)=> {
        let id = req.params.id;
        try {
            dataHandler.deleteProduct(id); // Asegúrate de pasar el ID como argumento
        } catch(e) {
            // Manejo de errores
        }
        res.send("Se eliminó el producto");
    });*/

module.exports = router;
