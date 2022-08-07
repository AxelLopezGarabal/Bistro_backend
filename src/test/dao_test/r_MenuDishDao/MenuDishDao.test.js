var assert = require('assert');

const { DishDao } = require('../../../main/dao/dishDao/DishDao');
const { MenuDao } = require('../../../main/dao/menuDao/MenuDao');
const { Menu } = require('../../../main/model/menu/Menu');
const { Dish } = require('../../../main/model/dish/Dish');
const { MenuDishDao } = require('../../../main/dao/relationDao/menuDishDao/MenuDishDao');


describe('Tests of the DishGarnish_DAO module', function () {

    var dao = new MenuDishDao();
    var dishDao = new DishDao();
    var menuDao = new MenuDao();

    const menu = new Menu(0, []);
    const dish1 = new Dish(0, "some dish", "main plate", [], 1110.0, "./dishImage");
    const dish2 = new Dish(0, "other dish", "main plate", [], 1110.0, "./otherDishImage");

    describe('#getAllGarnishes', function () {
        it('gets an employee passed as parameter', function () {
            menuDao.saveMenu(menu).then(menuId => {
                dishDao.saveDish(dish1).then(idD1 => {
                    dao.saveDish(menuId, idD1).then(res => {
                        dishDao.saveDish(dish2).then(idD2 => {
                            dao.saveDish(menuId, idD2).then(res => {
                                dao.getDishes(menuId).then(dishes => {
                                    assert.equal(dishes.length, 2);
                                    assert.equal(dishes[0].getName(), dish1.getName());
                                    assert.equal(dishes[1].getName(), dish2.getName());
                                }).then(res => {
                                    dao.deleteDishes(menuId).then(res => {
                                        menuDao.deleteMenu(menuId);
                                        dishDao.deleteDish(idD1);
                                        dishDao.deleteDish(idD2);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    describe('#saveGarnish', function () {
        it('gets an employee passed as parameter', function () {
            menuDao.saveMenu(menu).then(menuId => {
                dishDao.saveDish(dish1).then(idD1 => {
                    dao.saveDish(menuId, idD1).then(res => {
                        dao.getDishes(menuId).then(result => {
                            assert.equal(result.length, 1);
                        }).then(res => {
                            dao.deleteDish(menuId, idD1).then(res => {
                                menuDao.deleteMenu(menuId);
                                dishDao.deleteDish(idD1);
                            });
                        });
                    });
                });
            });
        });
    });


    describe('#deleteGarnish', function () {
        it('gets an employee passed as parameter', function () {
            menuDao.saveMenu(menu).then(menuId => {
                dishDao.saveDish(dish1).then(idD1 => {
                    dao.saveDish(menuId, idD1).then(res => {
                        dishDao.saveDish(dish2).then(idD2 => {
                            dao.saveDish(menuId, idD2).then(res => {
                                dao.getDishes(menuId).then(dishes => {
                                    assert.equal(dishes.length, 2);
                                    assert.equal(dishes[0].getName(), dish1.getName());
                                    assert.equal(dishes[1].getName(), dish2.getName());
                                }).then(res => {
                                    dao.deleteDish(menuId, idD2).then(res => {
                                        dao.getDishes(menuId).then(result => {
                                            assert.equal(result.length, 1);
                                            assert.equal(result[0].getId(), idD1);
                                        }).then(res => {
                                            dao.deleteDishes(menuId).then(res => {
                                                menuDao.deleteMenu(menuId);
                                                dishDao.deleteDish(idD1);
                                                dishDao.deleteDish(idD2);
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

    describe('#deleteGarnishes', function () {
        it('gets an employee passed as parameter', function () {
            menuDao.saveMenu(menu).then(menuId => {
                dishDao.saveDish(dish1).then(idD1 => {
                    dao.saveDish(menuId, idD1).then(res => {
                        dishDao.saveDish(dish2).then(idD2 => {
                            dao.saveDish(menuId, idD2).then(res => {
                                dao.getDishes(menuId).then(dishes => {
                                    assert.equal(dishes.length, 2);
                                    assert.equal(dishes[0].getName(), dish1.getName());
                                    assert.equal(dishes[1].getName(), dish2.getName());
                                }).then(res => {
                                    dao.deleteDishes(menuId).then(res => {
                                        dao.getDishes(menuId).then(result => {
                                            assert.equal(result.length, 0);
                                        }).then(res => {
                                            menuDao.deleteMenu(menuId);
                                            dishDao.deleteDish(idD1);
                                            dishDao.deleteDish(idD2);
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