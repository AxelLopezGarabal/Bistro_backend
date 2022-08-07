var assert = require('assert');
const { BranchDao } = require('../../../main/dao/branchDao/BranchDao');
const { Branch } = require('../../../main/model/bistro/Branch');


describe('Tests of the Branch_DAO module', function () {

    var dao = new BranchDao();
    const branch = new Branch(0, "11 12345678", [], []);
    const branchP = new Branch(2, "11 56781234", [], []);
    
    describe('#saveBranch', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveBranch(branch).then(res => {
              lastId = res;
              return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    dao.deleteBranch(res);
                });
            });
        });
    });


    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveBranch(branch).then(result => {
                dao.getById(result).then(res => {
                    assert.equal(res.getId(), result);
                    assert.equal(res.getPhoneNro(), branch.getPhoneNro());
                    return res.getId();
                }).then( res => {
                    dao.deleteBranch(res);
                })
            })
        });
    });


    describe('#deleteEmployee', function () {
        it('deletes an employee passed as parameter', function () {
            dao.saveBranch(branch).then(res => {
                dao.deleteBranch(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            });
        });
    });

    describe('#updateBranch', function () {
        it('update an employee passed as parameter', function () {
            dao.saveBranch(branch).then(res => {
                lastId = res;
                return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getPhoneNro(), branch.getPhoneNro());
                    
                    return result;
                }).then(res => {
                    res.setphoneNro("15 61616262");
                        
                    dao.updateBranch(res).then(res => {
                        dao.getById(res).then(res => {
                            assert.notEqual(res.getPhoneNro(), branch.getPhoneNro());

                            assert.equal(res.getPhoneNro(), "15 61616262");
                            return res.getId();
                        }).then(res => {
                            dao.deleteBranch(res);
                        });
                    });     
                });
            });
            
        });
    });


});