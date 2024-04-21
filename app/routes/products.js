"use strict";

const express = require("express");

const router = express.Router();
const dataHandler = require("./../controllers/data_handler");

/*router.route("/")
   .get((req,res)=>{

    let query = req.query.filter;

    let products;

    if(query === undefined){
        try{
        products = dataHandler.getProducts();
        } catch(e){
            res.status(400).send("Error");
        }
        res.status(200);

    }else{
        
    }

   }) 

router.route("/cart")
   .post((req,res)=>{
        let proxies = req.body;
        let products = [];

        if(!Array.isArray(proxies)){
            res.status(400).send("error");
        }

        for (let proxy in proxies){
            let product = dataHandler.getProductById(proxy.uuid);
            if(product != undefined){
                products.push(product);
            }else{
                
            }

        }
        res.json(products);
    
   }) 

router.route("/:id")
   .get((req,res)=>{

    let uuid = req.params.id;
    let product = dataHandler.getProductById(uuid);

    if (product != undefined) {
        res.status(200).json(product) ;
        } else{

        }
    
   }) 
module.exports  = router;*/