// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Resib {
    struct Store {
        uint id;
        string name;
        address owner;
    }

    struct Product {
        uint id;
        string name;
        uint storeId;
        uint warrantyPeriod; // in days
    }

    struct Warranty {
        uint id;
        uint productId;
        address customer;
        uint startDate;
        uint endDate;
    }

    event StoreCreated(uint indexed id);
    event ProductCreated(uint indexed id);
    event WarrantyCreated(uint indexed id);

    Store[] public stores;
    Product[] public products;
    Warranty[] public warranties;

    // Create a store
    function createStore(string memory _name) public {
        stores.push(Store(stores.length, _name, msg.sender));
        emit StoreCreated(stores.length-1);
    }

    // Read a store
    function getStore(uint _storeId) public view returns (Store memory) {
        return stores[_storeId];
    }

    // Create a product
    function createProduct(string memory _name, uint _storeId, uint _warrantyPeriod) public {
        require(stores[_storeId].owner == msg.sender, 'Only the store owner can add products');
        products.push(Product(products.length, _name, _storeId, _warrantyPeriod));
        emit ProductCreated(products.length-1);
    }

    // Read a product
    function getProduct(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }

    // Create a warranty
    function createWarranty(uint _productId, address _customer) public {
        require(stores[products[_productId].storeId].owner == msg.sender, 'Only the store owner can issue warranties');
        uint startDate = block.timestamp;
        uint endDate = startDate + (products[_productId].warrantyPeriod * 1 days);
        warranties.push(Warranty(warranties.length, _productId, _customer, startDate, endDate));
        emit WarrantyCreated(warranties.length-1);
    }

    // Read a warranty
    function getWarranty(uint _warrantyId) public view returns (Warranty memory) {
        return warranties[_warrantyId];
    }

}
