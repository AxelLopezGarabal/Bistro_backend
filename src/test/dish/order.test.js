var assert = require('assert');
const { Garnish } = require('../../main/model/dish/Garnish');
const { Order } = require('../../main/model/dish/Order');

describe('Tests of the Order module', function () {

    const garnish1 = new Garnish(1, "tomato sauce", 304,20);
    const garnish2 = new Garnish(6, "meat balls", 1024,50);
    const garnishes = [garnish1, garnish2];
    var order = new Order(324, "spaghetti", 2048.00, garnishes);
    
    describe('#getId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getId(), 324);
        });
    });

    describe('#getName', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getDishName(), "spaghetti");
        });
    });

    describe('#getPrice', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getPrice(), 2048.00);
        });
    });

    describe('#getGarnishes', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getGarnishes(), garnishes);
        });
    });



    describe('#setId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getId(), 324);
            order.setId(0);
            assert.equal(order.getId(), 0);
        });
    });

    describe('#setName', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getDishName(), "spaghetti");
            order.setDishName("Fetteccine");
            assert.equal(order.getDishName(), "Fetteccine");
        });
    });

    describe('#setPrice', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getPrice(), 2048.00);
            order.setPrice(0);
            assert.equal(order.getPrice(), 0);
        });
    });

    describe('#setGarnishes', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.getGarnishes(), garnishes);
            order.setGarnishes([]);
            assert.equal(order.getGarnishes().length, 0);
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(order.isTheTarget(0), true);
        });
    });

    describe('#addGarnish', function () {
        it('should pass when a new garnish is added', function () {
            assert.equal(order.getGarnishes().length, 0);
            order.addGarnish(garnish1);
            assert.equal(order.getGarnishes().length, 1);
            assert.equal(order.getGarnishes()[0], garnish1);
        });
    });

    describe('#findGarnish', function () {
        it('should pass when the garnish requested can be found', function () {
            order.addGarnish(garnish2);
            assert.equal(order.findGarnish(6), garnish2);
        });
    });

    describe('#removeGarnish', function () {
        it('should pass when the garnish is remove', function () {
            order.removeGarnish(6);
            assert.equal(order.getGarnishes().length, 1);
        });
    });

});