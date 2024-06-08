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
        uint8 status; // void=0 | active=1 | processing=2 | availed=3
    }

    error StoreOwnerRequired();
    error InvalidWarrantyUpdate();

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
        if (_store.owner != msg.sender) revert StoreOwnerRequired();

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
        if (_store.owner != msg.sender) revert StoreOwnerRequired();

        uint _startDate = block.timestamp;
        uint _endDate = _startDate + _product.warrantyPeriod * 1 days;

        uint _warrantyId = _warranties.length;
        _product.warranties.push(_warrantyId);
        _customerWarranties[msg.sender].push(_warrantyId);

        emit WarrantyCreated(_storeId, _productId, _warrantyId);
        _warranties.push(Warranty(_productId, _customer, _startDate, _endDate, 1));
    }

    struct StoreWarrantyInfo {
        uint warranty;
        address customer;
        uint startDate;
        uint endDate;
        uint8 status; // void=0 | active=1 | processing=2 | availed=3
        string product;
    }

    function getWarrantiesByStoreId(uint _storeId) public view returns (StoreWarrantyInfo[] memory) {
        uint _warrantyCount = _warranties.length;
        StoreWarrantyInfo[] memory _infos;
        for (uint i = 0; i < _warrantyCount; ++i) {
            Warranty memory _warranty = _warranties[i];
            Product memory _product = _products[_warranty.product];
            if (_product.store == _storeId)
                _infos[_infos.length] = StoreWarrantyInfo(
                    i,
                    _warranty.customer,
                    _warranty.startDate,
                    _warranty.endDate,
                    _warranty.status,
                    _product.name
                );
        }
        return _infos;
    }

    function voidWarrantyStatus(uint _warrantyId) public {
        Warranty storage _warranty = _warranties[_warrantyId];
        Product storage _product = _products[_warranty.product];
        Store storage _store = _stores[_product.store];
        if (_store.owner != msg.sender) revert StoreOwnerRequired();
        if (_warranty.status == 0 || _warranty.status >= 3) revert InvalidWarrantyUpdate();
        _warranty.status = 0;
    }

    function resetWarrantyStatus(uint _warrantyId) public {
        Warranty storage _warranty = _warranties[_warrantyId];
        Product storage _product = _products[_warranty.product];
        Store storage _store = _stores[_product.store];
        if (_store.owner != msg.sender) revert StoreOwnerRequired();
        if (_warranty.status != 2) revert InvalidWarrantyUpdate();
        _warranty.status = 1;
    }

    function processWarrantyStatus(uint _warrantyId) public {
        Warranty storage _warranty = _warranties[_warrantyId];
        Product storage _product = _products[_warranty.product];
        Store storage _store = _stores[_product.store];
        if (_store.owner != msg.sender) revert StoreOwnerRequired();
        if (_warranty.status != 1) revert InvalidWarrantyUpdate();
        _warranty.status = 2;
    }

    function availWarrantyStatus(uint _warrantyId) public {
        Warranty storage _warranty = _warranties[_warrantyId];
        Product storage _product = _products[_warranty.product];
        Store storage _store = _stores[_product.store];
        if (_store.owner != msg.sender) revert StoreOwnerRequired();
        if (_warranty.status != 2) revert InvalidWarrantyUpdate();
        _warranty.status = 3;
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

    struct CustomerWarrantyInfo {
        string store;
        string product;
        uint startDate;
        uint endDate;
    }

    function getOwnedWarranties() public view returns (CustomerWarrantyInfo[] memory) {
        uint[] memory _warrantyIds = _customerWarranties[msg.sender];
        CustomerWarrantyInfo[] memory _infos = new CustomerWarrantyInfo[](_warrantyIds.length);
        for (uint i = 0; i < _warrantyIds.length; ++i) {
            uint _warrantyId = _warrantyIds[i];
            Warranty memory _warranty = _warranties[_warrantyId];
            Product memory _product = _products[_warranty.product];
            Store memory _store = _stores[_product.store];
            _infos[i] = CustomerWarrantyInfo(_store.name, _product.name, _warranty.startDate, _warranty.endDate);
        }
        return _infos;
    }
}
