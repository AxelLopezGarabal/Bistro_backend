const Dish = require('../../main/model/dish/Dish').Dish;

var assert = require('assert');

describe('Tests of the Dish module', function () {

    let dish = new Dish(1, "name", "typo", ["garnish1", "garnish2"], 100.00, "/someImage");
    
    describe('#getId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(dish.getId(), 1);
        });
    });

    describe('#getName', function () {
        it('should pass when the name is equal to name', function () {
            assert.equal(dish.getName(), "name");
        });
    });

    describe('#getType', function () {
        it('should pass when the type of the dish is of the type typo', function () {
            assert.equal(dish.getType(), "typo");
        });
    });

    describe('#getGarnishes', function () {
        it('should pass when the length of garnishes is 2 and has garnish1 and garnish2', function () {
            assert.equal(dish.getGarnishes().length, 2);
            assert.equal(dish.getGarnishes()[0], "garnish1");
            assert.equal(dish.getGarnishes()[1], "garnish2");
        });
    });

    describe('#getPrice', function () {
        it('should pass when the price is equal to 100.00', function () {
            assert.equal(dish.getPrice(), 100.00);
        });
    });

    describe('#getImage', function () {
        it('should pass when the image is equal to _/someImage_', function () {
            assert.equal(dish.getImage(), "/someImage");
        });
    });

    describe('#setId', function () {
        it('should pass when the id is change from 1 to 0', function () {
            assert.equal(dish.getId(), 1);
            dish.setId(0);
            assert.equal(dish.getId(), 0);
        });
    });

    describe('#setName', function () {
        it('should pass when the name is change from name to newName', function () {
            assert.equal(dish.getName(), "name");
            dish.setName("newName");
            assert.equal(dish.getName(), "newName");
        });
    });

    describe('#setType', function () {
        it('should pass when the type is change from typo to type', function () {
            assert.equal(dish.getType(), "typo");
            dish.setType("type");
            assert.equal(dish.getType(), "type");
        });
    });

    describe('#setGarnishes', function () {
        it('should pass when the garnishes is change from [garnish1, garnish2] to []', function () {
            assert.equal(dish.getGarnishes().length, 2);
            dish.setGarnishes([]);
            assert.equal(dish.getGarnishes().length, 0);
        });
    });

    describe('#setPrice', function () {
        it('should pass when the price is change from 100.00 to 200.00', function () {
            assert.equal(dish.getPrice(), 100.00);
            dish.setPrice(200.00);
            assert.equal(dish.getPrice(), 200.00);
        });
    });

    describe('#setImage', function () {
        it('should pass when the image is change from _/someImage_ to (emptyString)', function () {
            assert.equal(dish.getImage(), "/someImage");
            dish.setImage("");
            assert.equal(dish.getImage(), "");
        });
    });

    describe('#addGarnishes', function () {
        it('should pass when its added a garnish to the garnishes', function () {
            dish.addGarnish("garnish0");
            assert.equal(dish.getGarnishes().length, 1);
            assert.equal(dish.getGarnishes()[0], "garnish0");
        });
    });

    describe('#findGarnish', function () {
        it('should pass when the garnish requested exist(it retorns the garnish)', function () {
            assert.equal(dish.findGarnish("garnish0"), "garnish0");
            assert.equal(dish.findGarnish("garnish1"), undefined);
        });
    });

    describe('#removeGarnish', function () {
        it('should pass when the garnish its remove from the garnishes', function () {
            dish.removeGarnish("garnish0");
            assert.equal(dish.getGarnishes().length, 0);
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the id passed its the same as its id', function () {
            assert.equal(dish.isTheTarget(0), true);
            assert.equal(dish.isTheTarget(1), false);
        });
    });
});