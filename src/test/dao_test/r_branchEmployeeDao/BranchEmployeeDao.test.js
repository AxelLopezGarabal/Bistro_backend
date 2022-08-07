var assert = require('assert');
const { BranchEmployeeDao } = require('../../../main/dao/relationDao/branchEmployeeDao/BranchEmployeeDao');
const { BranchDao } = require('../../../main/dao/branchDao/BranchDao');
const { EmployeeDao } = require('../../../main/dao/employeeDao/EmployeeDao');
const { Branch } = require('../../../main/model/bistro/Branch');
const { Employee } = require('../../../main/model/employee/Employee');
describe('Tests of the DishGarnish_DAO module', function () {

    var branchDao = new BranchDao();
    var employeeDao = new EmployeeDao();
    var dao = new BranchEmployeeDao();

    const branch = new Branch(0, "1112345678", [], []);
    const empl1 = new Employee(0, 0, "password", "Noir Vesper", "@gmail.com", "1552522525", "admin");
    const empl2 = new Employee(0, 0, "password2", "Ceres Fauna", "@email.com", "1523344567", "cook");
      
    describe('#getAllEmployees', function () {
        it('gets all the employee of a branch', function () {
            branchDao.saveBranch(branch).then(idBranch => {
                employeeDao.saveEmployee(empl1).then(idEmp1 => {
                    dao.saveEmployee(idBranch, idEmp1).then(res => {
                        employeeDao.saveEmployee(empl2).then(idEmp2 => {
                            dao.saveEmployee(idBranch, idEmp2).then(res => {
                                dao.getEmployees(idBranch).then(employees => {
                                    assert.equal(employees.length, 2);
                                    assert.equal(employees[0].getId(), idEmp1);
                                    assert.equal(employees[1].getId(), idEmp2);
                                }).then(res => {
                                    dao.deleteEmployees(idBranch).then(res => {
                                        branchDao.deleteBranch(idBranch);
                                        employeeDao.deleteEmployee(idEmp1);
                                        employeeDao.deleteEmployee(idEmp2);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#saveEmployee', function () {
        it('saves an employee in a branch', function () {
            branchDao.saveBranch(branch).then(idBranch => {
                employeeDao.saveEmployee(empl1).then(idEmp1 => {
                    dao.saveEmployee(idBranch, idEmp1).then(res => {
                        dao.getEmployees(idBranch).then(employees => {
                            assert.equal(employees.length, 1);
                        }).then(res => {
                            dao.deleteEmployees(idBranch).then(res => {
                                branchDao.deleteBranch(idBranch);
                                employeeDao.deleteEmployee(idEmp1);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#deleteEmployee', function () {
        it('deletes an employee from a branch', function () {
            branchDao.saveBranch(branch).then(idBranch => {
                employeeDao.saveEmployee(empl2).then(idEmp2 => {
                    dao.saveEmployee(idBranch, idEmp2).then(res => {
                        dao.getEmployees(idBranch).then(employees => {
                            assert.equal(employees.length, 1);
                        }).then(res => {
                            dao.deleteEmployee(idBranch, idEmp2).then(res => {
                                dao.getEmployees(idBranch).then(res => {
                                    assert.equal(res.length, 0);
                                }).then(res => {
                                    employeeDao.deleteEmployee(idEmp2);
                                    branchDao.deleteBranch(idBranch);
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});