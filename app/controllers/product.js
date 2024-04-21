"use strict";

const utils = require('./utils');

class ProductException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Product {
    constructor(title, description, imageUrl, unit, stock, priceperUnit, category) {
        this._uuid = utils.generateUUID();
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.priceperUnit = priceperUnit;
        this.category = category;
    }
    

    get uuid() {
        return this._uuid;
    }

    set uuid(value) {
        throw new ProductException("Product ID's are auto-generated.");
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (typeof value !== "string" || value === '') {
            throw new ProductException("The title is not valid: " + value);
        }
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        if (typeof value !== "string" || value === '') {
            throw new ProductException("This description is not valid");
        } else if (value.length > 1000) {
            throw new ProductException("The description is too long");
        }
        this._description = value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(value) {
        if (typeof value !== "string" || value === "") {
            throw new ProductException("Not valid as an ImageURL");
        }
        this._imageUrl = value;
    }

    get unit() {
        return this._unit;
    }

    set unit(value) {
        if (value === "piezas" || value === "pieza") {
            this._unit = value;
        } else {
            throw new ProductException("Not valid as a unit");
        }
    }

    get stock() {
        return this._stock;
    }

    set stock(value) {
        if (isNaN(value) || value < 0) {
            throw new ProductException("Not valid as stock");
        }
        this._stock = value;
    }

    get priceperUnit() {
        return this._priceperUnit;
    }

    set priceperUnit(value) {
        if (isNaN(value) || value < 0) {
            throw new ProductException("Not valid as price per unit");
        }
        this._priceperUnit = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        if (typeof value !== "string" || value === '') {
            throw new ProductException("The category is not valid");
        }
        this._category = value;
    }

    static createFromJSON(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return Product.createFromObject(obj);
    }

    static createFromObject(obj) {
    
        let product = new Product(obj._title, obj._description, obj._imageUrl, obj._unit, obj._stock, obj._priceperUnit, obj._category);
        product._uuid = obj._uuid;
        return product;
    }
    
    

    static cleanObject(obj) {
        const productProperties = ["title", "description", "imageUrl", "unit", "stock", "priceperUnit", "category"];
        for (let prop in obj) {
            if (!productProperties.includes(prop)) {
                delete obj[prop];
            }
        }
    }
}

module.exports = Product;
