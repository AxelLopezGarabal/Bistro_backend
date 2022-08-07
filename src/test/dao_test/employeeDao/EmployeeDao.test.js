var assert = require('assert');
const { EmployeeDao } = require("../../../main/dao/employeeDao/EmployeeDao");
const { Employee } = require('../../../main/model/employee/Employee');

describe('Tests of the Employee_DAO module', function () {

    var emp = new Employee(0, 1232, "root1234", "Jin Sakai", "@email.com", "12345678", "admin");
    var dao = new EmployeeDao();

    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveEmployee(emp).then(res => {
                dao.getById(res).then(res => {
                    assert.equal(res.getFullname(), emp.getFullname());
                    assert.equal(res.getPassword(), emp.getPassword());
                    assert.equal(res.getEmail(), emp.getEmail());
                    assert.equal(res.getPhoneNro(), emp.getPhoneNro());
                    assert.equal(res.getRank(), emp.getRank());
                    return res.getId();
                }).then(res => {
                    dao.deleteEmployee(res);
                })
            })
        });
    });

    describe('#saveEmployee', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveEmployee(emp).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    return res; 
                }).then(res => {
                    dao.deleteEmployee(res);
                });
            });
        });
    });

    describe('#deleteEmployee', function () {
        it('deletes an employee passed as parameter', function () {
            dao.saveEmployee(emp).then(res => {
                dao.deleteEmployee(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            });
        });
    });

    describe('#update Employee', function () {
        it('update an employee passed as parameter', function () {
            dao.saveEmployee(emp).then(res => {
                lastId = res;
                return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getFullname(), emp.getFullname());
                    assert.equal(result.getPassword(), emp.getPassword());
                    assert.equal(result.getEmail(), emp.getEmail());
                    assert.equal(result.getPhoneNro(), emp.getPhoneNro());
                    assert.equal(result.getRank(), emp.getRank());
                    return result;
                }).then(res => {
                    res.setFullname("Sakai Kasumasa");
                    res.setPassword("secret");
                    res.setEmail("gmail.com");
                        
                    dao.updateEmployee(res).then(res => {
                        dao.getById(res).then(res => {
                            assert.notEqual(res.getFullname(), emp.getFullname());
                            assert.notEqual(res.getFullname(), emp.getPassword());
                            assert.equal(res.getPhoneNro(), emp.getPhoneNro());
                            assert.equal(res.getRank(), emp.getRank());

                            return res.getId();
                        }).then(res => {
                            dao.deleteEmployee(res);
                        });
                    });
                        
                })
            });
            
        });
    });

});