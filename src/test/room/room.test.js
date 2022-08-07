var assert = require('assert');
const { Table } = require('../../main/model/room/Table');
const { Room } = require('../../main/model/room/Room');

describe('Tests of the Table module', function () {
    
    const table1 = new Table(128);
    const table2 = new Table(148);
    const tables = [table1, table2];
    var room = new Room(324, tables);

    describe('#getId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(room.getId(), 324);
        });
    }); 

    describe('#getTables', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(room.getTables().length, 2);
            assert.equal(room.getTables()[0], table1);
            assert.equal(room.getTables()[1], table2);
        });
    });

    describe('#setId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(room.getId(), 324);
            room.setId(3);
            assert.equal(room.getId(), 3);
        });
    }); 

    describe('#setTables', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(room.getTables().length, 2);
            assert.equal(room.getTables()[0], table1);
            assert.equal(room.getTables()[1], table2);
            room.setTables([]);
            assert.equal(room.getTables().length, 0);
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(room.isTheTarget(3), true);
        });
    }); 

    describe('#addTable', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(room.getTables().length, 0);
            room.addTable(table2);
            assert.equal(room.getTables().length, 1);
            assert.equal(room.getTables()[0], table2);
        });
    });

    describe('#findTable', function () {
        it('should pass when the id is equal to 1', function () {
            room.addTable(table1);
            assert.equal(room.findTable(148), table2);
        });
    });

    describe('#removeTable', function () {
        it('should pass when the id is equal to 1', function () {
            room.removeTable(148);
            assert.equal(room.getTables().length, 1);
            assert.equal(room.getTables()[0], table1);
        });
    });
});