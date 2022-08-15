var mysql = require('mysql');
const { Dish } = require('../../../model/dish/Dish');
const dbConData = require('../../../resources/dbCon').conData;

class MenuDishDao {
    constructor(){}

    getDishes(menuId){
        return this.__getAllDishes(this.__selectAllQuery(), menuId, mysql.createConnection(dbConData));
    }

    saveDish(menuId, dishId){
        return this.__save(this.__saveQuery(), [[menuId, dishId]], mysql.createConnection(dbConData));
    }

    deleteDish(menuId, dishId){
        return this.__delete(this.__deleteQuery(menuId, dishId), mysql.createConnection(dbConData));
    }

    deleteDishRelation(dishId){
        return this.__delete(this.__deleteDishes(dishId), mysql.createConnection(dbConData));
    }

    deleteDishes(menuId){
        return this.__deleteAllDishes(this.__deleteAllQuery(), [menuId], mysql.createConnection(dbConData));
    }

    __getAllDishes(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then((val) => {
            var temp = [];
            val.forEach(elem => {temp.push(
                new Dish(elem.idDish, elem.name, elem.type, [], elem.price, elem.image)
            )});
            return temp;
        });
    }

    __selectAllQuery() {
        return "SELECT idDish, name, type, price, image "
        + "FROM (mydb.MenuDish join mydb.Dish on MenuDish.dishId = mydb.Dish.idDish)"
        + "where menuId = ?";
    }

    __save(sql, newValues, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, [newValues], function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then(res => {
            return res.insertId;
        });
    }
    __saveQuery(){
        return "insert into mydb.MenuDish (menuId, dishId) values ?";
    }


    __delete(sql,con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });

        return pro.then(res => {
            return res;
        });
    }
    __deleteQuery(menuId, dishId){
        return "delete from mydb.MenuDish where menuId = "+ mysql.escape(menuId) +
        " and dishId = " + mysql.escape(dishId);
    }

    __deleteAllDishes(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });

        return pro.then(res => {
            return res;
        });
    }
        
    __deleteAllQuery(){
        return "delete from mydb.MenuDish where menuId = ?";
    }

    __deleteDishes(dishId){
        return "delete from mydb.MenuDish where dishId =" + mysql.escape(dishId);
    }

}

module.exports = { MenuDishDao }