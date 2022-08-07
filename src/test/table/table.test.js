
var assert = require('assert');
const { Order } = require('../../main/model/dish/Order');
const { Table } = require('../../main/model/room/Table');
const { Garnish } = require('../../main/model/dish/Garnish');

describe('Tests of the Table module', function () {

    const garnish = new Garnish(465, "vegan meat balls", 512.64);
    const garnishes = [garnish];
    const order = new Order(5, "Spaghetti", 1024.00, garnishes);
    const orders = [];
    var table = new Table(1, "center of the room", 6, orders, true);

    describe('#getId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(table.getId(), 1);
        });
    });

    describe('#getLocation', function () {
        it('should pass when the location of the table is equal to center of the room', function () {
            assert.equal(table.getLocation(), "center of the room");
        });
    });

    describe('#getCapacity', function () {
        it('should pass when the capacity of the table is 6', function () {
            assert.equal(table.getCapcity(), 6);
        });
    });

    describe('#getOrders', function () {
        it('should pass when the orders of the table is equal to the orders', function () {
            assert.equal(table.getOrders(), orders);
        });
    });

    describe('#setId', function () {
        it('should pass when the id is change from 1 to 9', function () {
            assert.equal(table.getId(), 1);
            table.setId(9);
            assert.equal(table.getId(), 9);
        });
    });

    describe('#setLocation', function () {
        it('should pass when the location of the table is change to beside a window', function () {
            assert.equal(table.getLocation(), "center of the room");
            table.setLocation("beside a window");
            assert.equal(table.getLocation(), "beside a window");
        });
    });

    describe('#setCapacity', function () {
        it('should pass when the capacity of the table is change from 6 to 8', function () {
            assert.equal(table.getCapcity(), 6);
            table.setCapacity(8);
            assert.equal(table.getCapcity(), 8);
        });
    });

    describe('#setOrders', function () {
        it('should pass when the orders is change to an empty lst of orders', function () {
            assert.equal(table.getOrders(), orders);
            table.setOrders([]);
            assert.notEqual(table.getOrders(), orders);
        });
    });

    describe('#isReserve', function () {
        it('should pass when the table is reserved', function () {
            assert.equal(table.isReserve(), true);
        });
    });

    describe('#changeState', function () {
        it('should pass when the table is no longer reserved', function () {
            table.changeState();
            assert.equal(table.isReserve(), false);
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the table id is equal to the one passed as parameter', function () {
            assert.notEqual(table.isTheTarget(1) , true);
            assert.equal(table.isTheTarget(9) , true);
        });
    });

    describe('#addOrder', function () {
        it('should pass when a new order is added', function () {
            assert.equal(table.getOrders().length , 0);
            
            table.addOrder(order);
            assert.equal(table.getOrders().length , 1);
            assert.equal(table.getOrders()[0] , order);
        });
    });

    describe('#findOrder', function () {
        it('should pass when the order is found in the table', function () {
            assert.equal(table.findOrder(5) , order);
        });
    });

    describe('#removeOrder', function () {
        it('should pass when an order is remove from the table', function () {
            table.removeOrder(5);
            assert.equal(table.findOrder(5) , undefined);
        });
    });
});