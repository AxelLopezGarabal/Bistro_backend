var assert = require('assert');
const { MenuDao } = require('../../../main/dao/menuDao/MenuDao');
const { Menu } = require('../../../main/model/menu/Menu');


describe('Tests of the DishGarnish_DAO module', function () {

    var menuDao = new MenuDao();

    const menu = new Menu(0, []);

    describe('#getMenu', function () {
        it('gets an employee passed as parameter', function () {
            menuDao.saveMenu(menu).then(menuId => {
                menuDao.getMenu(menuId).then(menuR => {
                    assert.equal(menuR.getId(), menuId);
                }).then(res => {menuDao.deleteMenu(menuId)});
            })
        });
    });

    describe('#saveMenu', function () {
        it('gets an employee passed as parameter', function () {
            menuDao.saveMenu(menu).then(menuId => {
                menuDao.getMenu(menuId).then(menuR => {
                    assert.equal(menuR.getId(), menuId);
                }).then(res => {menuDao.deleteMenu(menuId)});
            })
        });
    });

    describe('#deleteMenu', function () {
        it('gets an employee passed as parameter', function () {
            menuDao.saveMenu(menu).then(menuId => {
                menuDao.getMenu(menuId).then(menuR => {
                    assert.equal(menuR.getId(), menuId);
                }).then(res => {menuDao.deleteMenu(menuId)});
            })
        });
    });


});