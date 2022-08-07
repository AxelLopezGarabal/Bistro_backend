const { Menu } = require('../../main/model/menu/Menu');
const { Dish } = require('../../main/model/dish/Dish');

var assert = require('assert');

describe('Tests of the Menu module', function () {

    const dish = new Dish();
    var dishes = [dish];
    var menu = new Menu(32, dishes);

    describe('#getId', function () {
        it('should pass when the id is equal to 32', function () {
            assert.equal(menu.getId(), 32);
        });
    });

    describe('#getDishes', function () {
        it('should pass when the amount of dishes is 1 and the only element is dish', function () {
            assert.equal(menu.getDishes().length, 1);
            assert.equal(menu.getDishes()[0], dish);
        });
    });

    describe('#setId', function () {
        it('should pass when the id is change from 32 to 8', function () {
            assert.equal(menu.getId(), 32);
            menu.setId(8);
            assert.equal(menu.getId(), 8);
        });
    });

    describe('#setDishes', function () {
        it('should pass when the dishes are change successfully', function () {
            assert.equal(menu.getDishes().length, 1);
            menu.setDishes([dish, dish]);
            assert.equal(menu.getDishes().length, 2);
        });
    });

    describe('#addDish', function () {
        it('should pass when a dish is added successfully', function () {
            assert.equal(menu.getDishes().length, 2);
            menu.setDishes([dish, dish]);
            assert.equal(menu.getDishes().length, 2);
        });
    });

    describe('#findDish', function () {
        it('should pass when the requested dish exist and is returned', function () {
            var newDish = new Dish();
            newDish.setId(3);
            
            menu.addDish(newDish);

            assert.equal(menu.findDish(3), newDish);
        });
    });

    describe('#removeDish', function () {
        it('should pass when the requested dish exist and is remove successfully', function () {
            assert.equal(menu.getDishes().length, 3);
            menu.removeDish(3);
            assert.equal(menu.getDishes().length, 2);
        });
    });
});