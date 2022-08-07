var assert = require('assert');
const { TradeMark } = require('../../main/model/bistro/TradeMark');
const { Menu } = require('../../main/model/menu/Menu');
const { Dish } = require('../../main/model/dish/Dish');
const { Branch } = require('../../main/model/bistro/Branch');
const { Employee } = require('../../main/model/employee/Employee');
const { Room } = require('../../main/model/room/Room');

describe('Tests of the TradeMark module', function () {

        const employee1 = new Employee(2);
        const employee2 = new Employee(3);
        const employee3 = new Employee(4);

        const room1 = new Room(5);
        const room2 = new Room(6);

        const employees = [employee1, employee2, employee3];
        const rooms = [room1, room2];

        const branch = new Branch(1, "11 12345678", employees, rooms);
        const branch9 = new Branch(9);
        const branch7 = new Branch(7);

        const branches = [branch7, branch, branch9];

        const dish = new Dish(3432);
        const dish2= new Dish(53);

        var dishes = [dish, dish2];
        
        var menu = new Menu(32, dishes);
        const newMenu = new Menu();

        var mark = new TradeMark(696, "Mc Donals", branches, menu);

    describe('#getId', function () {
        it('should pass when the id is equal to 1', function () {
            assert.equal(mark.getId(), 696);
        });
    });

    describe('#getName', function () {
        it('should pass when the name is equal to name', function () {
            assert.equal(mark.getName(), "Mc Donals");
        });
    });

    describe('#getBranches', function () {
        it('should pass when the branches is equal to branches', function () {
            assert.equal(mark.getBranches(), branches);
        });
    });

    describe('#getMenu', function () {
        it('should pass when the menu is equal to menu', function () {
            assert.equal(mark.getMenu(), menu);
        });
    });

    describe('#setId', function () {
        it('should pass when the id is change to 0', function () {
            assert.equal(mark.getId(), 696);
            mark.setId(0);
            assert.equal(mark.getId(), 0);
        });
    });

    describe('#setName', function () {
        it('should pass when the name is change to an empty String', function () {
            assert.equal(mark.getName(), "Mc Donals");
            mark.setName("");
            assert.equal(mark.getName(), "");
        });
    });

    describe('#setBranches', function () {
        it('should pass when the branches is change to an empty list', function () {
            assert.equal(mark.getBranches(), branches);
            mark.setBranches([]);
            assert.equal(mark.getBranches().length, 0);
        });
    });

    describe('#setMenu', function () {
        it('should pass when the menu is change to newMenu', function () {
            assert.equal(mark.getMenu(), menu);
            mark.setMenu(newMenu);
            assert.equal(mark.getMenu(), newMenu);
        });
    });

    describe('#isTheTarget', function () {
        it('should pass when the menu is change to newMenu', function () {
            assert.equal(mark.isTheTarget(0), true);
        });
    });

    describe('#addBranches', function () {
        it('should pass when the menu is change to newMenu', function () {
            mark.addBranch(branch7);
            mark.addBranch(branch);
            assert.equal(mark.getBranches().length, 2);
            assert.equal(mark.getBranches()[0], branch7);
            assert.equal(mark.getBranches()[1], branch);
        });
    });

    describe('#finBranchesd', function () {
        it('should pass when the menu is change to newMenu', function () {
            assert.equal(mark.findBranch(7), branch7);
        });
    });

    describe('#remBranchesove', function () {
        it('should pass when the menu is change to newMenu', function () {
            mark.removeBranch(7);
            assert.equal(mark.getBranches().length, 1);
            assert.equal(mark.getBranches()[0], branch);
        });
    });

});
