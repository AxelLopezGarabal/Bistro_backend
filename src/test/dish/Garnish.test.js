var assert = require('assert');
const { Garnish } = require('../../main/model/dish/Garnish');

describe('Tests of the Dish module', function () {

    var garnish = new Garnish(0, "someName", 0);

    describe('#getId', function () {
        it('should pass when the id is equal to 0', function () {
            assert.equal(garnish.getId(), 0);
        });
    });

    describe('#getSomeName', function () {
        it('should pass when the name is equal to someName', function () {
            assert.equal(garnish.getName(), "someName");
        });
    });

    describe('#getPrice', function () {
        it('should pass when the price is equal to 0', function () {
            assert.equal(garnish.getPrice(), 0);
        });
    });

    describe('#setId', function () {
        it('should pass when the id is change from 0 to 7', function () {
            assert.equal(garnish.getId(), 0);
            garnish.setId(7);
            assert.equal(garnish.getId(), 7);
        });
    });

    describe('#setSomeName', function () {
        it('should pass when the name is change from someName to _vegan meet balls_', function () {
            assert.equal(garnish.getName(), "someName");
            garnish.setName("_vegan meet balls_");
            assert.equal(garnish.getName(), "_vegan meet balls_");
        });
    });

    describe('#setPrice', function () {
        it('should pass when the price is change from 0 to 1024.00', function () {
            assert.equal(garnish.getPrice(), 0);
            garnish.setPrice(1024.00);
            assert.equal(garnish.getPrice(), 1024.00);
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the id is equal to the one pass as parameter', function () {
            assert.equal(garnish.isTheTarget(7), true);
        });
    });
});