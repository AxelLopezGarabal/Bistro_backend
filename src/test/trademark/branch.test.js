var assert = require('assert');
const { Branch } = require('../../main/model/bistro/Branch');
const { Employee } = require('../../main/model/employee/Employee');
const { Room } = require('../../main/model/room/Room');

describe('Tests of the Branch module', function () {

    const employee1 = new Employee(2);
    const employee2 = new Employee(3);
    const employee3 = new Employee(4);

    const room1 = new Room(5);
    const room2 = new Room(6);

    var employees = [employee1, employee2, employee3];
    var rooms = [room1, room2];

    var branch = new Branch(1, "11 12345678", employees, rooms);

    describe('#getId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(branch.getId(), 1);
        });
    });

    describe('#getPhoneNro', function () {
        it('should pass when the phoneNro is equal to 11 12345678', function () {
            assert.equal(branch.getPhoneNro(), "11 12345678");
        });
    });

    describe('#getEmployees', function () {
        it('should pass when the employees is equal to a list with the room1 and room2', function () {
            assert.equal(branch.getEmployees(), employees);
        });
    });

    describe('#getRooms', function () {
        it('should pass when the rooms is equal to a list with the room1 and room2', function () {
            assert.equal(branch.getRooms(), rooms);
        });
    });


    describe('#setId', function () {
        it('should pass when the id is change from 1 to 10', function () {
            assert.equal(branch.getId(), 1);
            branch.setId(10);
            assert.equal(branch.getId(), 10);
        });
    });

    describe('#setPhoneNro', function () {
        it('should pass when the phoneNro is change to 12345678', function () {
            assert.equal(branch.getPhoneNro(), "11 12345678");
            branch.setphoneNro("12345678");
            assert.equal(branch.getPhoneNro(), "12345678");
        });
    });

    describe('#setEmployees', function () {
        it('should pass when the employees is change to an empty list', function () {
            assert.equal(branch.getEmployees(), employees);
            branch.setEmployees([]);
            assert.equal(branch.getEmployees().length, 0);
        });
    });

    describe('#setRooms', function () {
        it('should pass when the rooms is change to an empty list', function () {
            assert.equal(branch.getRooms(), rooms);
            branch.setRooms([]);
            assert.equal(branch.getRooms().length, 0);
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the branch id is equal to the id pass as parameter', function () {
            assert.equal(branch.isTheTarget(10), true);
            assert.notEqual(branch.isTheTarget(11), true);
        });
    });

    describe('#addEmployee', function () {
        it('should pass when the branch id is equal to the id pass as parameter', function () {
            branch.addEmployee(employee3);
            branch.addEmployee(employee1);
            assert.equal(branch.getEmployees().length, 2);
        });
    });

    describe('#findEmployee', function () {
        it('should pass when the requested employee exist and is returned', function () {
            assert.equal(branch.findEmployee(4), employee3);
        });
    });

    describe('#removeEmployee', function () {
        it('should pass when the requested employee is removed from the employees', function () {
            branch.removeEmployee(4);
            assert.equal(branch.getEmployees().length, 1);
            assert.equal(branch.getEmployees()[0], employee1);
        });
    });

    describe('#addRoom', function () {
        it('should pass when a room is added to the rooms', function () {
            branch.addRoom(room2);
            branch.addRoom(room2);
            branch.addRoom(room1);
            assert.equal(branch.getRooms().length, 3);
            assert.equal(branch.getRooms()[0], room2);
            assert.equal(branch.getRooms()[1], room2);
            assert.equal(branch.getRooms()[2], room1);
        });
    });

    describe('#findRoom', function () {
        it('should pass when the requested employee exist and is returned', function () {
            assert.equal(branch.findRoom(5), room1);
        });
    });

    describe('#removeRoom', function () {
        it('should pass when the requested room is removed from the rooms', function () {
            branch.removeRoom(5);
            assert.equal(branch.getRooms().length, 2);
            assert.equal(branch.getRooms()[0], room2);
            assert.equal(branch.getRooms()[1], room2);
        });
    });
});
