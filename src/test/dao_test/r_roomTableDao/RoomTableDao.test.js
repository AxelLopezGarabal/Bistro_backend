var assert = require('assert');
const { RoomTableDao } = require('../../../main/dao/relationDao/roomTableDao/RoomTableDao');
const { RoomDao } = require('../../../main/dao/roomDao/RoomDao');
const { Table } = require('../../../main/model/room/Table');
const { Room } = require('../../../main/model/room/Room');
const { TableDao } = require('../../../main/dao/tableDao/TableDao');

describe('Tests of the DishGarnish_DAO module', function () {

    var dao = new RoomTableDao();
    var roomDao = new RoomDao();
    var tableDao = new TableDao();

    const room = new Room();
    const tbl1 = new Table(0, "location1", 4, [], false);
    const tbl2 = new Table(0, "location2", 6, [], true);

    describe('#getAllTables', function () {
        it('gets an employee passed as parameter', function () {
            roomDao.saveRoom(room).then(idRoom => {
                tableDao.saveTable(tbl1).then(idTbl1 => {
                    dao.saveTable(idRoom, idTbl1).then(res => {
                        tableDao.saveTable(tbl2).then(idTbl2 => {
                            dao.saveTable(idRoom, idTbl2).then(res => {
                                dao.getTables(idRoom).then(tables => {
                                    assert.equal(tables.length, 2);
                                    assert.equal(tables[0].getId(), idTbl1);
                                    assert.equal(tables[1].getId(), idTbl2);
                                }).then(res => {
                                    dao.deleteTables(idRoom).then(res => {
                                        roomDao.deleteRoom(idRoom);
                                        tableDao.deleteTable(idTbl1);
                                        tableDao.deleteTable(idTbl2);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#saveGarnish', function () {
        it('gets an employee passed as parameter', function () {
            roomDao.saveRoom(room).then(idRoom => {
                tableDao.saveTable(tbl1).then(idTbl1 => {
                    dao.saveTable(idRoom, idTbl1).then(res => {
                        dao.getTables(idRoom).then(tables => {
                            assert.equal(tables.length, 1);
                        }).then(res => {
                            dao.deleteTables(idRoom).then(res => {
                                roomDao.deleteRoom(idRoom);
                                tableDao.deleteTable(idTbl1);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#deleteGarnish', function () {
        it('gets an employee passed as parameter', function () {
            roomDao.saveRoom(room).then(idRoom => {
                tableDao.saveTable(tbl1).then(idTbl1 => {
                    dao.saveTable(idRoom, idTbl1).then(res => {
                        tableDao.saveTable(tbl2).then(idTbl2 => {
                            dao.saveTable(idRoom, idTbl2).then(res => {
                                dao.getTables(idRoom).then(tables => {
                                    assert.equal(tables.length, 2);
                                }).then(res => {
                                    dao.deleteTable(idRoom, idTbl1).then(res => {
                                        dao.getTables(idRoom).then(result => {
                                            assert.equal(result.length, 1);
                                        }).then(res => {
                                            dao.deleteTables(idRoom).then(res => {
                                                roomDao.deleteRoom(idRoom);
                                                tableDao.deleteTable(idTbl1);
                                                tableDao.deleteTable(idTbl2);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    describe('#deleteGarnishes', function () {
        it('gets an employee passed as parameter', function () {
            roomDao.saveRoom(room).then(idRoom => {
                tableDao.saveTable(tbl1).then(idTbl1 => {
                    dao.saveTable(idRoom, idTbl1).then(res => {
                        tableDao.saveTable(tbl2).then(idTbl2 => {
                            dao.saveTable(idRoom, idTbl2).then(res => {
                                dao.getTables(idRoom).then(tables => {
                                    assert.equal(tables.length, 2);
                                }).then(res => {
                                    dao.deleteTables(idRoom).then(res => {
                                        dao.getTables(idRoom).then(result => {
                                            assert.equal(result.length, 0);
                                        }).then(res => {
                                            roomDao.deleteRoom(idRoom);
                                            tableDao.deleteTable(idTbl1);
                                            tableDao.deleteTable(idTbl2);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});