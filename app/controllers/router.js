"use strict";

const express = require("express");
const Product = require("./product");
const datahandler  = require("./data_handler");
const router = express.Router();






function validateAdmin(req, res, next) {
    const adminToken = req.get("x-auth");
    if (adminToken !== "admin") {
        return res.status(403).send("Acceso no autorizado, no se cuenta con privilegios de administrador");
    }
    next();
}

router.route("/")
.get((req,res) => {
    res.send("Hola mundo");
})
router.route("/products")
.get((req,res) => {
    let products = require("./../data/products.json");
    const query = req.query;

    
    if (Object.keys(query).length === 0) {
        return res.json(products);
    } else {
        
        let filteredProducts = products;

        
        if (query.category) {
            filteredProducts = filteredProducts.filter(product => product.category === query.category);
        }
        if (query.title) {
            filteredProducts = filteredProducts.filter(product => product.title === query.title);
        }

       
        return res.json(filteredProducts);
    }
})
router.route("/products/cart")
.post((req,res) => {
    if (req.get('Content-Type') !== 'application/json') {
        return res.status(400).send('El tipo de contenido debe ser application/json');
    }
    if (!Array.isArray(req.body)) {
        return res.status(400).send('El cuerpo de la solicitud debe ser un arreglo');
    }

    let Items = req.body;
    let products = [];

    for(let item of Items){
        console.log(item.uuid);
        let Id = item.uuid;
        let amount = item.amount;

        let product = datahandler.getProductById(Id);
        if(product){
            products.push({product,amount});
        }else{
            return res.status(404).send("El producto no existe con el id: " + Id);
        }
    }
    res.status(200).json(products);

})
router.route("/products/:id")
.get((req,res) => {
    const ID = req.params.id;
    console.log(ID.substring(1));
    let product = datahandler.getProductById(ID.substring(1));
    if(product){
        res.status(200).json(product);
    }else{
        res.status(404).send("Error 404, not found");
    }
})

router.use('/admin/products', validateAdmin);

router.route("/admin/products")
.post((req,res)=>{
    try{
    const {title, description, imageUrl, unit, stock, priceperUnit, category} = req.body;
    

    if (!title || !description || !imageUrl || !unit || !stock || !priceperUnit || !category) {
        console.log(req.body);
        console.log(req.query);
        return res.status(400).send('Faltan campos requeridos para crear el producto');
        
        

    } else{
        
        let prod1 = new Product(title, description, imageUrl, unit, stock, priceperUnit, category)
       
    
        datahandler.createProduct(prod1);
        res.status(201).send(title + " creado");
    }
} catch(e){console.log("no es valido");}

})

router.route("/admin/products/:id")
.put((req,res)=>{
    const {title, description, imageUrl, unit, stock, priceperUnit, category} = req.body;

    if (!title || !description || !imageUrl || !unit || !stock || !priceperUnit || !category) {
        console.log(req.body);
        console.log(req.query);
        return res.status(400).send('Faltan campos requeridos para crear el producto');
        
        

    } else if(!datahandler.getProductById(req.params.id.substring(1))){
        res.status(404).send("no existe la taza que quieres modificar");
    }
     else{
        const ID = req.params.id;
        let oldProdTitle = datahandler.getProductById(ID.substring(1)).title;
        let newProduct = new Product(title, description, imageUrl, unit, stock, priceperUnit, category)
        datahandler.updateProduct(ID.substring(1),newProduct);
        res.status(201).send(oldProdTitle + " actualiizado");
    }
})

router.route("/admin/products/:id")
.delete((req,res)=>{

   const ID = req.params.id;
    console.log(ID.substring(1));
    let product = datahandler.getProductById(ID.substring(1));
    if(product){
        res.status(200).send(product.title +" eliminado");
        datahandler.deleteProduct(ID.substring(1));
    }else{
        console.log(datahandler.getProductsby());
        res.status(404).send("Error 404, not found");
    }
})


module.exports = router;
