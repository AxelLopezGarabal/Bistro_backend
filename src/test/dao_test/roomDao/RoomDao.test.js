var assert = require('assert');
const { RoomDao } = require('../../../main/dao/roomDao/RoomDao');
const { Room } = require('../../../main/model/room/Room');


describe('Tests of the Room_DAO module', function () {

    var dao = new RoomDao();
    var room = new Room(0, []);

    describe('#saveOrder', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveRoom(room).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    return res;
                }).then(res => {
                    dao.deleteRoom(res);
                });
            });
        });
    });


    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveRoom(room).then(result => {
                dao.getById(result).then(res => {
                    assert.equal(res.getId(), result);
                    assert.equal(res.getTables().length, 0);
                    return result;
                }).then(res => {
                    dao.deleteRoom(res);
                });
            });
        });
    });


    describe('#deleteEmployee', function () {
        it('deletes an employee passed as parameter', function () {
            dao.saveRoom(room).then(res => {
                dao.deleteRoom(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            });
        });
    });
    
});