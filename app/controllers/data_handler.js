"use strict";

const fs = require('fs');
const Product = require('./product');

let content = fs.readFileSync("./../Practica3/app/data/products.json");
const products = JSON.parse(content).map(obj => {
    console.log(obj);
    return Product.createFromObject(obj);
});




function getProducts(){
    return products;
}

function getProductById(id) {
    const product = products.find(product => product.uuid === id);
    return product;
}


function createProduct(product) {
    let newProduct = Product.createFromObject(product);
    products.push(newProduct);


    fs.writeFileSync('././app/data/products.json',JSON.stringify(products));
}



function updateProduct(id, updatedProduct) {
    const index = products.findIndex(product => product.uuid === id);
    if (index !== -1) {
        products[index] = updatedProduct;
    }
    fs.writeFileSync('././app/data/products.json',JSON.stringify(products));
    
}

function deleteProduct(id) {
    const index = products.findIndex(product => product.uuid === id);
    if (index !== -1) {
        products.splice(index, 1);
    }
    fs.writeFileSync('././app/data/products.json',JSON.stringify(products));
}




exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;




