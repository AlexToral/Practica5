"use strict";

const Product = require('./product');
class ShoppingCartException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }     
}   


class ProductProxy {
    constructor(uuid, quantity) {
        this.uuid = uuid;
        this.quantity = quantity;
    }
}

class ShoppingCart {
    constructor() {
        this._products = [];
        this._ProductProxies = [];
    }

    get products() {
        return this._products;
    }

    set products(value) {
        this._products = value;
    }

    set ProductProxies(value) {
        throw new ShoppingCartException("Can't modify proxies directly, use corresponding methods");
    }

    get ProductProxies() {
        return this._ProductProxies;
    }

    addItem(productUuid, amount) {
        if (amount < 0) throw new ShoppingCartException("Can't have negative items");

        let existingProxy = this._ProductProxies.find(proxy => proxy.uuid === productUuid);
        if (existingProxy) {
            existingProxy.quantity += amount;
        } else {
            this._ProductProxies.push(new ProductProxy(productUuid, amount));
        }
    }

    updateItem(productUuid, newAmount) {
        if (newAmount < 0) throw new ShoppingCartException("Can't have negative items");

        let existingProxyIndex = this._ProductProxies.findIndex(proxy => proxy.uuid === productUuid);
        if (existingProxyIndex !== -1) {
            if (newAmount === 0) {
                this._ProductProxies.splice(existingProxyIndex, 1);
            } else {
                this._ProductProxies[existingProxyIndex].quantity = newAmount;
            }
        }
    }

    removeItem(productUuid) {
        let existingProxyIndex = this._ProductProxies.findIndex(proxy => proxy.uuid === productUuid);
        if (existingProxyIndex !== -1) {
            this._ProductProxies.splice(existingProxyIndex, 1);
        }
    }

    calculateTotal() {
        let total = 0;
        for (let proxy of this._ProductProxies) {
            let product = products.find(product => product.uuid === proxy.uuid);
            if (product) {
                total += product.priceperUnit * proxy.quantity;
            }
        }
        return total;
    }
}

module.exports = ShoppingCart;
