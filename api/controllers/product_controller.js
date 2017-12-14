'use strict';

module.exports = {
    searchProducts: searchProducts,
    addProduct: addProduct,
    getProductById: getProductById,
    deleteProduct: deleteProduct,
    getReviewsByProductId: getReviewsByProductId
};

function searchProducts(req, res) {
    res.json('Returns the list of products');
}

function addProduct(req, res) {
    res.json('Adds an product to the system');
}

function getProductById(req, res) {
    res.json('Returns a single product');
}

function deleteProduct(req, res) {
    res.json('Delete a product');
}

function getReviewsByProductId(req, res) {
    res.json('Returns reviews for a single product');
}
