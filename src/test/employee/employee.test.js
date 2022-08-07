const Employee = require("../../main/model/employee/Employee").Employee;

var assert = require('assert');

describe('Tests of the Employee module', function () {

    var employee = new Employee(1, 1232, "root1234", "Jin Sakai", "@email.com", "12345678", "admin");

    describe('#getId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(employee.getId(), 1);
        });
    });

    describe('#getBranchId', function () {
        it('should pass when the branch id is equal to 1232', function () {
            assert.equal(employee.getBranchId(), 1232);
        });
    });

    describe('#getFullname', function () {
        it('should pass when the fullname is equal to Jin Sakai', function () {
            assert.equal(employee.getFullname(), "Jin Sakai");
        });
    });

    describe('#getPassword', function () {
        it('should pass when the password is equal to root1234', function () {
            assert.equal(employee.getPassword(), "root1234");
        });
    });

    describe('#getEmail', function () {
        it('should pass when the email is equal to @email.com', function () {
            assert.equal(employee.getEmail(), "@email.com");
        });
    });

    describe('#getPhoneNro', function () {
        it('should pass when the phoneNro is equal to 12345678', function () {
            assert.equal(employee.getPhoneNro(), "12345678");
        });
    });

    describe('#getRank', function () {
        it('should pass when the rank is equal to admin', function () {
            assert.equal(employee.getRank(), "admin");
        });
    });

    describe('#setId', function () {
        it('should pass when the id is change from 1 to 2', function () {
            assert.equal(employee.getId(), 1);
            employee.setId(2);
            assert.equal(employee.getId(), 2);
        });
    });

    describe('#setBranchId', function () {
        it('should pass when the branch id is change from 1232 to 0', function () {
            assert.equal(employee.getBranchId(), 1232);
            employee.setBranchId(0);
            assert.equal(employee.getBranchId(), 0);
        });
    });

    describe('#setFullname', function () {
        it('should pass when the fullname is change from Jin Sakai to Shimura', function () {
            assert.equal(employee.getFullname(), "Jin Sakai");
            employee.setFullname("Shimura");
            assert.equal(employee.getFullname(), "Shimura");
        });
    });

    describe('#setPassword', function () {
        it('should pass when the password is change from root1234 to 1234root', function () {
            employee.setPassword("1234root");
            assert.equal(employee.getPassword(), "1234root");
        });
    });

    describe('#setEmail', function () {
        it('should pass when the email is change from @email.com to @gmail.com', function () {
            assert.equal(employee.getEmail(), "@email.com");
            employee.setEmail("@gmail.com");
            assert.equal(employee.getEmail(), "@gmail.com");
        });
    });

    describe('#setPhoneNro', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(employee.getPhoneNro(), "12345678");
            employee.setPhoneNro("87654321");
            assert.equal(employee.getPhoneNro(), "87654321");
        });
    });

    describe('#setRank', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(employee.getRank(), "admin");
            employee.setRank("cook");
            assert.equal(employee.getRank(), "cook");
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the id is equal to the id passed as parameter', function () {
            assert.equal(employee.isTheTarget(2), true);
            assert.equal(employee.isTheTarget(1), false);
        });
    });

});