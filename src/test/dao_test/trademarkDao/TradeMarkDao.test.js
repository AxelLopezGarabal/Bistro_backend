var assert = require('assert');
const { TradeMarkDao } = require('../../../main/dao/tradeMarkDao/TradeMarkDao');
const { TradeMark } = require('../../../main/model/bistro/TradeMark');

describe('Tests of the TradeMark_DAO module', function () {

    var dao = new TradeMarkDao();
    const tradeMark = new TradeMark(0, "Mostaza", [], );
    const tradeMarkP = new TradeMark(1, "MC Donalds", [], );
    
    describe('#saveTradeMark', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveTradeMark(tradeMark).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    return res;
                }).then(res => {
                    dao.deleteTradeMark(res);
                });
            });
        });
    });


    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveTradeMark(tradeMark).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getName(), tradeMark.getName());
                    return res;
                }).then(res => {
                    dao.deleteTradeMark(res);
                });
            });
        });
    });


    describe('#deleteTradeMark', function () {
        it('deletes an TradeMark passed as parameter', function () {
            dao.saveTradeMark(tradeMark).then(res => {
                dao.deleteTradeMark(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            });
        });
    });

    describe('#updateTradeMark', function () {
        it('update an employee passed as parameter', function () {
            dao.saveTradeMark(tradeMark).then(res => {
                lastId = res;
                return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getName(), tradeMark.getName());

                    return result;
                }).then(res => {
                    res.setName("Burger King");
                        
                    dao.updateTradeMark(res).then(res => {
                        dao.getById(res).then(res => {
                            assert.notEqual(res.getName(), tradeMark.getName());
                            
                            assert.equal(res.getName(), "Burger King");
                            return res.getId();
                        }).then(res => {
                            dao.deleteTradeMark(res);
                        });
                    });
                        
                })
            });
            
        });
    });

});