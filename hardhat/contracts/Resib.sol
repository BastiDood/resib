// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Resib {
    struct Store {
        string name;
        address owner;
        uint[] products;
    }

    struct Product {
        uint store;
        string name;
        uint warrantyPeriod; // in days
        uint[] warranties;
    }

    struct Warranty {
        uint product;
        address customer;
        uint startDate;
        uint endDate;
    }

    event StoreCreated(uint indexed store);
    event ProductCreated(uint indexed store, uint indexed product);
    event WarrantyCreated(uint indexed store, uint indexed product, uint indexed warranty);

    Store[] _stores;
    Product[] _products;
    Warranty[] _warranties;

    mapping(address => uint[]) _customerWarranties;

    function createStore(string memory _name) public {
        emit StoreCreated(_stores.length);
        uint[] memory _init;
        _stores.push(Store(_name, msg.sender, _init));
    }

    function createProduct(uint _storeId, string memory _name, uint _warrantyPeriod) public {
        Store storage _store = _stores[_storeId];
        require(_store.owner == msg.sender, 'only the store owner can add products');

        uint _productId = _products.length;
        _store.products.push(_productId);

        emit ProductCreated(_storeId, _productId);
        uint[] memory _init;
        _products.push(Product(_storeId, _name, _warrantyPeriod, _init));
    }

    function createWarranty(uint _productId, address _customer) public {
        Product storage _product = _products[_productId];
        uint _storeId = _product.store;
        Store storage _store = _stores[_storeId];
        require(_store.owner == msg.sender, 'only the store owner can issue warranties');

        uint _startDate = block.timestamp;
        uint _endDate = _startDate + _product.warrantyPeriod * 1 days;

        uint _warrantyId = _warranties.length;
        _product.warranties.push(_warrantyId);
        _customerWarranties[msg.sender].push(_warrantyId);

        emit WarrantyCreated(_storeId, _productId, _warrantyId);
        _warranties.push(Warranty(_productId, _customer, _startDate, _endDate));
    }

    struct StoreInfo {
        string name;
        address owner;
    }

    function getStores() public view returns (StoreInfo[] memory) {
        StoreInfo[] memory _infos = new StoreInfo[](_stores.length);
        for (uint i = 0; i < _stores.length; ++i) {
            Store memory _store = _stores[i];
            _infos[i] = StoreInfo(_store.name, _store.owner);
        }
        return _infos;
    }

    struct WarrantyInfo {
        string store;
        string product;
        uint startDate;
        uint endDate;
    }

    function getOwnedWarranties() public view returns (WarrantyInfo[] memory) {
        uint[] memory _warrantyIds = _customerWarranties[msg.sender];
        WarrantyInfo[] memory _infos = new WarrantyInfo[](_warrantyIds.length);
        for (uint i = 0; i < _warrantyIds.length; ++i) {
            uint _warrantyId = _warrantyIds[i];
            Warranty memory _warranty = _warranties[_warrantyId];
            Product memory _product = _products[_warranty.product];
            Store memory _store = _stores[_product.store];
            _infos[i] = WarrantyInfo(_store.name, _product.name, _warranty.startDate, _warranty.endDate);
        }
        return _infos;
    }
}
