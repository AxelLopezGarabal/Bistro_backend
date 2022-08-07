var assert = require('assert');
const { TradeMarkBranchDao } = require('../../../main/dao/relationDao/tradeMarkBranchDao/TradeMarkBranchDao');
const { TradeMarkDao } = require('../../../main/dao/tradeMarkDao/TradeMarkDao');
const { BranchDao } = require('../../../main/dao/branchDao/BranchDao');
const { TradeMark } = require('../../../main/model/bistro/TradeMark');
const { Branch } = require('../../../main/model/bistro/Branch');

describe('Tests of the TrademarkBranch_DAO module', function () {

    var dao = new TradeMarkBranchDao();
    var markDao = new TradeMarkDao();
    var branchDao = new BranchDao();

    const mark = new TradeMark(0, "MC Donalds", [], undefined);
    const branch1 = new Branch(0, "1123456789", [], []);
    const branch2 = new Branch(0, "1523456789", [], []);
    
    describe('#getBranches', function () {
        it('gets an employee passed as parameter', function () {
            markDao.saveTradeMark(mark).then(idMark => {
                branchDao.saveBranch(branch1).then(idB1 => {
                    dao.saveBranch(idMark, idB1).then(res => {
                        branchDao.saveBranch(branch2).then(idB2 => {
                            dao.saveBranch(idMark, idB2).then(res => {
                                dao.getBranches(idMark).then(branches => {
                                    assert.equal(branches.length, 2);
                                    assert.equal(branches[0].getId(), idB1);
                                    assert.equal(branches[1].getId(), idB2);
                                }).then(res => {
                                    dao.deleteBranches(idMark).then(res => {
                                        branchDao.deleteBranch(idB1);
                                        branchDao.deleteBranch(idB2);
                                        markDao.deleteTradeMark(idMark);
                                    })
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    describe('#saveBranches', function () {
        it('gets an employee passed as parameter', function () {
            markDao.saveTradeMark(mark).then(idMark => {
                branchDao.saveBranch(branch1).then(idB1 => {
                    dao.saveBranch(idMark, idB1).then(res => {
                        dao.getBranches(idMark).then(result => {
                            assert.equal(result.length, 1);
                        }).then(res => {
                            dao.deleteBranch(idMark, idB1).then(res => {
                                markDao.deleteTradeMark(idMark);
                                branchDao.deleteBranch(idB1);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#deleteBranch', function () {
        it('gets an employee passed as parameter', function () {
            markDao.saveTradeMark(mark).then(idMark => {
                branchDao.saveBranch(branch1).then(idB1 => {
                    dao.saveBranch(idMark, idB1).then(res => {
                        dao.getBranches(idMark).then(result => {
                            assert.equal(result.length, 1);
                        }).then(res => {
                            dao.deleteBranch(idMark, idB1).then(res => {
                                dao.getBranches(idMark).then(result => {
                                    assert.equal(result.length, 0);
                                }).then(res => {
                                    markDao.deleteTradeMark(idMark);
                                    branchDao.deleteBranch(idB1);
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    describe('#deleteBranches', function () {
        it('gets an employee passed as parameter', function () {
            markDao.saveTradeMark(mark).then(idMark => {
                branchDao.saveBranch(branch1).then(idB1 => {
                    dao.saveBranch(idMark, idB1).then(res => {
                        branchDao.saveBranch(branch2).then(idB2 => {
                            dao.saveBranch(idMark, idB2).then(res => {
                                dao.getBranches(idMark).then(branches => {
                                    assert.equal(branches.length, 2);
                                    assert.equal(branches[0].getId(), idB1);
                                    assert.equal(branches[1].getId(), idB2);
                                }).then(res => {
                                    dao.deleteBranches(idMark).then(res => {
                                        dao.getBranches(idMark).then(result => {
                                            assert.equal(result.length, 0);
                                        }).then(res => {
                                            branchDao.deleteBranch(idB1);
                                            branchDao.deleteBranch(idB2);
                                            markDao.deleteTradeMark(idMark);
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
