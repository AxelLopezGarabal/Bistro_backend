var assert = require('assert');
const { BranchRoomDao } = require('../../../main/dao/relationDao/branchRoomDao/BranchRoomDao');
const { BranchDao } = require('../../../main/dao/branchDao/BranchDao');
const { RoomDao } = require('../../../main/dao/roomDao/RoomDao');
const { Branch } = require('../../../main/model/bistro/Branch');
const { Room } = require('../../../main/model/room/Room');

describe('Tests of the DishGarnish_DAO module', function () {

    var dao = new BranchRoomDao();
    var branchDao = new BranchDao();
    var roomDao = new RoomDao();
    
    const branch = new Branch(0, "11 01010101", [], []);
    const room1 = new Room(0, []);
    const room2 = new Room(0, []);

    describe('#getAllrooms', function () {
        it('gets an employee passed as parameter', function () {
            branchDao.saveBranch(branch).then(idBranch => {
                roomDao.saveRoom(room1).then(idR1 => {
                    dao.saveRoom(idBranch, idR1).then(res => {
                        roomDao.saveRoom(room2).then(idR2 => {
                            dao.saveRoom(idBranch, idR2).then(res => {
                                dao.getRooms(idBranch).then(rooms => {
                                    assert.equal(rooms.length, 2);
                                    assert.equal(rooms[0].getId(), idR1);
                                    assert.equal(rooms[1].getId(), idR2);
                                }).then(res => {
                                    dao.deleteRooms(idBranch).then(res =>{
                                        roomDao.deleteRoom(idR1);
                                        roomDao.deleteRoom(idR2);
                                        branchDao.deleteBranch(idBranch);
                                    });
                                });
                            });
                        });
                    });
                })
            })
        });
    });


    describe('#saveRoom', function () {
        it('gets an employee passed as parameter', function () {
            branchDao.saveBranch(branch).then(idBranch => {
                roomDao.saveRoom(room1).then(idR1 => {
                    dao.saveRoom(idBranch, idR1).then(res => {
                        dao.getRooms(idBranch).then(result => {
                            assert.equal(result.length, 1);
                        }).then(res => {
                            dao.deleteRooms(idBranch).then(res => {
                                branchDao.deleteBranch(idBranch);
                                roomDao.deleteRoom(idR1);
                            }); 
                        });
                    });
                })
            })
        });
    });


    describe('#deleteRoom', function () {
        it('gets an employee passed as parameter', function () {
            branchDao.saveBranch(branch).then(idBranch => {
                roomDao.saveRoom(room1).then(idR1 => {
                    dao.saveRoom(idBranch, idR1).then(res => {
                        roomDao.saveRoom(room2).then(idR2 => {
                            dao.saveRoom(idBranch, idR2).then(res => {
                                dao.getRooms(idBranch).then(rooms => {
                                    assert.equal(rooms.length, 2);
                                    assert.equal(rooms[0].getId(), idR1);
                                    assert.equal(rooms[1].getId(), idR2);
                                }).then(res => {
                                    dao.deleteRoom(idBranch, idR1).then(res => {
                                        dao.getRooms(idBranch).then(rooms => {
                                            assert.equal(rooms.length, 1);
                                            assert.equal(rooms[0].getId(), idR2);
                                        }).then(res => {
                                            dao.deleteRooms(idBranch).then(res => {
                                                branchDao.deleteBranch(idBranch);
                                                roomDao.deleteRoom(idR2);
                                                roomDao.deleteRoom(idR1);
                                            });
                                        });  
                                    });
                                });
                            });
                        });
                    });
                })
            })
        });
    });


    describe('#deleteAllRooms', function () {
        it('gets an employee passed as parameter', function () {
            branchDao.saveBranch(branch).then(idBranch => {
                roomDao.saveRoom(room1).then(idR1 => {
                    dao.saveRoom(idBranch, idR1).then(res => {
                        roomDao.saveRoom(room2).then(idR2 => {
                            dao.saveRoom(idBranch, idR2).then(res => {
                                dao.getRooms(idBranch).then(rooms => {
                                    assert.equal(rooms.length, 2);
                                    assert.equal(rooms[0].getId(), idR1);
                                    assert.equal(rooms[1].getId(), idR2);
                                }).then(res => {
                                    dao.deleteRooms(idBranch).then(res => {
                                        dao.getRooms(idBranch).then(result => {
                                            assert.equal(result.length, 0);
                                        }).then(res => {
                                            branchDao.deleteBranch(idBranch);
                                            roomDao.deleteRoom(idR2);
                                            roomDao.deleteRoom(idR1);
                                        });
                                    });
                                });
                            });
                        });
                    });
                })
            })
        });
    });

});