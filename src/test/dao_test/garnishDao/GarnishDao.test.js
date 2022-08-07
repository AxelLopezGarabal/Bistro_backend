var assert = require('assert');
const { GarnishDao } = require('../../../main/dao/garnishDao/GarnishDao');
const { Garnish } = require('../../../main/model/dish/Garnish');

describe('Tests of the Garnish_DAO module', function () {

    var dao = new GarnishDao();
    const garnish = new Garnish(0, "potato", 150.5);

    describe('#saveGarnish', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveGarnish(garnish).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    return res;
                }).then(res => {dao.deleteGarnish(res)})
            });
        });
    });

    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveGarnish(garnish).then(result => {
                dao.getById(result).then(res => {
                    assert.equal(res.getName(), garnish.getName());
                    assert.equal(res.getPrice(), garnish.getPrice());
                    return result;
                }).then(res => {
                    dao.deleteGarnish(res);
                });
            })
        });
    });

    describe('#deleteEmployee', function () {
        it('deletes an employee passed as parameter', function () {
            dao.saveGarnish(garnish).then(res => {
                dao.deleteGarnish(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            })
        });
    });


    describe('#update Employee', function () {
        it('update an employee passed as parameter', function () {
            dao.saveGarnish(garnish).then(res => {
                lastId = res;
                return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getName(), garnish.getName());
                    assert.equal(result.getPrice(), garnish.getPrice());
                    return result;
                }).then(res => {
                    res.setName("Tomato");
                    res.setPrice(150.5);
                        
                    dao.updateGarnish(res).then(res => {
                        dao.getById(res).then(res => {
                            assert.notEqual(res.getName(), garnish.getName());
                            assert.equal(res.getPrice(), garnish.getPrice());

                            return res.getId()
                        }).then(res => {
                            dao.deleteGarnish(res);
                        })
                    });
                        
                })
            });
            
        });
    });

});