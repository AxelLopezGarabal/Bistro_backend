const { doesNotMatch } = require('assert');
var assert = require('assert');
const { OrderDao } = require('../../../main/dao/orderDao/OrderDao');
const { Order } = require('../../../main/model/dish/Order');

describe('Tests of the Garnish_DAO module', function () {

    var dao = new OrderDao();
    const order = new Order(0, "Pizza", 505.0);
    const orderP = new Order(1, "1/4 de libra", 335.0);
    
    describe('#saveOrder', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveOrder(order).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    return res;
                }).then(res => {
                    dao.deleteOrder(res);
                });
            });
        });
    });


    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveOrder(orderP).then(result => {
                dao.getById(result).then(res => {
                    assert.equal(res.getId(), result);
                    assert.equal(res.getDishName(), orderP.getDishName());
                    assert.equal(res.getPrice(), orderP.getPrice());
                    return result;
                }).then(res => {
                    dao.deleteOrder(res);
                });
            });
        });
    });


    describe('#deleteEmployee', function () {
        it('deletes an employee passed as parameter', function () {
            dao.saveOrder(order).then(res => {
                dao.deleteOrder(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            });
        });
    });

    describe('#updateOrder', function () {
        it('update an employee passed as parameter', function () {
            dao.saveOrder(order).then(res => {
                lastId = res;
                return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getDishName(), order.getDishName());
                    assert.equal(result.getPrice(), order.getPrice());

                    return result;
                }).then(res => {
                    res.setDishName("1/2 de libra");
                    res.setPrice(1550.5);
                        
                    dao.updateOrder(res).then(res => {
                        dao.getById(res).then(res => {
                            assert.notEqual(res.getDishName(), order.getDishName());
                            assert.notEqual(res.getPrice(), order.getPrice());

                            assert.equal(res.getDishName(), "1/2 de libra");
                            assert.equal(res.getPrice(), 1550.5);

                            return res.getId();
                        }).then(res => {
                            dao.deleteOrder(res);
                        });
                    });
                });
            });
            
        });
    });


});