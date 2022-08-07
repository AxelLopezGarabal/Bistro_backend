var assert = require('assert');
const { TableDao } = require('../../../main/dao/tableDao/TableDao');
const { Table } = require('../../../main/model/room/Table');


describe('Tests of the Table_DAO module', function () {

    var dao = new TableDao();
    const table = new Table(0, "close to the window", 6, [], true);
    const tableP = new Table(1, "center od the room", 6, [], true);

    describe('#saveTable', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveTable(table).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    return res;
                }).then(res => {
                    dao.deleteTable(res);
                });
            });
        });
    });


    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveTable(tableP).then(result => {
                dao.getById(result).then(res => {
                    assert.equal(res.getId(), result);
                    assert.equal(res.getLocation(), tableP.getLocation());
                    assert.equal(res.getCapcity(), tableP.getCapcity());
                    assert.equal(res.isReserve(), tableP.isReserve());

                    return result;
                }).then(res => {
                    dao.deleteTable(res);
                })
            });
        });
    });

    describe('#deleteTable', function () {
        it('deletes an employee passed as parameter', function () {
            dao.saveTable(table).then(res => {
                dao.deleteTable(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            });
        });
    });

    describe('#updateTable', function () {
        it('update an employee passed as parameter', function () {
            dao.saveTable(table).then(res => {
                lastId = res;
                return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getLocation(), table.getLocation());
                    assert.equal(result.isReserve(), table.isReserve());

                    return result;
                }).then(res => {
                    res.setLocation("by the entrece");
                    res.changeState();
                        
                    dao.updateTable(res).then(res => {
                        dao.getById(res).then(res => {
                            assert.notEqual(res.getLocation(), table.getLocation());
                            assert.notEqual(res.isReserve(), table.isReserve());

                            assert.equal(res.getLocation(), "by the entrece");
                            assert.equal(res.isReserve(), false);

                            return res.getId();
                        }).then(res => {
                            dao.deleteTable(res);
                        })
                    });
                        
                })
            });
            
        });
    });

});