// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StoreProductWarranty {
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

    uint private storeCounter;
    uint private productCounter;
    uint private warrantyCounter;

    mapping(uint => Store) public stores;
    mapping(uint => Product) public products;
    mapping(uint => Warranty) public warranties;

    // Create a store
    function createStore(string memory _name) public {
        storeCounter++;
        stores[storeCounter] = Store(storeCounter, _name, msg.sender);
    }

    // Read a store
    function getStore(uint _storeId) public view returns (Store memory) {
        return stores[_storeId];
    }

    // Update a store
    function updateStore(uint _storeId, string memory _name) public {
        require(stores[_storeId].owner == msg.sender, 'Only the owner can update the store');
        stores[_storeId].name = _name;
    }

    // Delete a store
    function deleteStore(uint _storeId) public {
        require(stores[_storeId].owner == msg.sender, 'Only the owner can delete the store');
        delete stores[_storeId];
    }

    // Create a product
    function createProduct(string memory _name, uint _storeId, uint _warrantyPeriod) public {
        require(stores[_storeId].owner == msg.sender, 'Only the store owner can add products');
        productCounter++;
        products[productCounter] = Product(productCounter, _name, _storeId, _warrantyPeriod);
    }

    // Read a product
    function getProduct(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }

    // Update a product
    function updateProduct(uint _productId, string memory _name, uint _warrantyPeriod) public {
        require(
            stores[products[_productId].storeId].owner == msg.sender,
            'Only the store owner can update the product'
        );
        products[_productId].name = _name;
        products[_productId].warrantyPeriod = _warrantyPeriod;
    }

    // Delete a product
    function deleteProduct(uint _productId) public {
        require(
            stores[products[_productId].storeId].owner == msg.sender,
            'Only the store owner can delete the product'
        );
        delete products[_productId];
    }

    // Create a warranty
    function createWarranty(uint _productId, address _customer) public {
        require(stores[products[_productId].storeId].owner == msg.sender, 'Only the store owner can issue warranties');
        warrantyCounter++;
        uint startDate = block.timestamp;
        uint endDate = startDate + (products[_productId].warrantyPeriod * 1 days);
        warranties[warrantyCounter] = Warranty(warrantyCounter, _productId, _customer, startDate, endDate);
    }

    // Read a warranty
    function getWarranty(uint _warrantyId) public view returns (Warranty memory) {
        return warranties[_warrantyId];
    }

    // Update a warranty
    function updateWarranty(uint _warrantyId, uint _startDate, uint _endDate) public {
        require(
            stores[products[warranties[_warrantyId].productId].storeId].owner == msg.sender,
            'Only the store owner can update the warranty'
        );
        warranties[_warrantyId].startDate = _startDate;
        warranties[_warrantyId].endDate = _endDate;
    }

    // Delete a warranty
    function deleteWarranty(uint _warrantyId) public {
        require(
            stores[products[warranties[_warrantyId].productId].storeId].owner == msg.sender,
            'Only the store owner can delete the warranty'
        );
        delete warranties[_warrantyId];
    }
}
