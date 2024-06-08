// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Resib {
    struct Store {
        string name;
        address owner;
        Product[] products;
    }

    struct Product {
        string name;
        uint warrantyPeriod; // in days
        Warranty[] warranties;
    }

    struct Warranty {
        address customer;
        uint startDate;
        uint endDate;
    }

    struct Index {
        uint store;
        uint product;
        uint warranty;
    }

    event StoreCreated(uint indexed store);
    event ProductCreated(uint indexed store, uint indexed product);
    event WarrantyCreated(uint indexed store, uint indexed product, uint indexed warranty);

    Store[] _stores;
    mapping(address => Index[]) _users;

    function createStore(string memory _name) public {
        emit StoreCreated(_stores.length);
        Product[] memory _init;
        _stores.push(Store(_name, msg.sender, _init));
    }

    function getStores() public view returns (Store[] memory) {
        return _stores;
    }

    function createProduct(uint _storeId, string memory _name, uint _warrantyPeriod) public {
        Store storage _store = _stores[_storeId];
        require(_store.owner == msg.sender, 'only the store owner can add products');
        Product[] storage _products = _store.products;

        emit ProductCreated(_storeId, _products.length);
        Warranty[] memory _warranties;
        _products.push(Product(_name, _warrantyPeriod, _warranties));
    }

    function createWarranty(uint _storeId, uint _productId, address _customer) public {
        Store storage _store = _stores[_storeId];
        require(_store.owner == msg.sender, 'only the store owner can issue warranties');

        Product storage _product = _store.products[_productId];
        Warranty[] storage _warranties = _product.warranties;

        uint _startDate = block.timestamp;
        uint _endDate = _startDate + _product.warrantyPeriod * 1 days;

        emit WarrantyCreated(_storeId, _productId, _warranties.length);
        _warranties.push(Warranty(_customer, _startDate, _endDate));
    }
}
