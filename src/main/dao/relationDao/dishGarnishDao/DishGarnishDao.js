var mysql = require('mysql');
const { Garnish } = require('../../../model/dish/Garnish');
const dbConData = require('../../../resources/dbCon').conData;

class DishGarnishDao {
    constructor(){}

    getGarnishes(dishId){
        return this.__getAllGarnishes(this.__selectAllQuery(), dishId, mysql.createConnection(dbConData));
    }

    saveGarnish(dishId, garnishId){
        return this.__save(this.__saveQuery(), [[dishId, garnishId]], mysql.createConnection(dbConData));
    }

    deleteGarnish(dishId, garnishId){
        return this.__delete(this.__deleteQuery(dishId, garnishId), mysql.createConnection(dbConData));
    }

    deleteGarnishes(dishId){
        return this.__deleteAllGarnishes(this.__deleteAllQuery(), [dishId], mysql.createConnection(dbConData));
    }

    deleteGarnishFromAllDishes(garnishId){
        return this.__deleteGarnishFromAllDishes(this.__deleteGarnishQuery(), [garnishId], mysql.createConnection(dbConData));
    }

    __getAllGarnishes(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then((val) => {
            var temp = [];
            val.forEach(garnish => {temp.push(new Garnish(garnish.idGarnish, garnish.name, garnish.price))});
            return temp;
        });
    }

    __selectAllQuery() {
        return " SELECT idGarnish, name, price FROM " 
        + "(mydb.DishGarnish join mydb.Garnish on DishGarnish.garnishId = Garnish.idGarnish)"
        + "where dishId = ?";
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
    __saveQuery(dishId, garnishId){
        return "insert into mydb.DishGarnish (dishId, garnishId) values ?";
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
    __deleteQuery(dishId, garnishId){
        return "delete from mydb.DishGarnish where dishId = "+ mysql.escape(dishId) +
        " and garnishId = " + mysql.escape(garnishId);
    }

    __deleteAllGarnishes(sql, fild, con){
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
        return "delete from mydb.DishGarnish where dishId = ?";
    }

    __deleteGarnishFromAllDishes(sql, fild, con){
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
        
    __deleteGarnishQuery(){
        return "delete from mydb.DishGarnish where garnishId = ?";
    }
}

module.exports = { DishGarnishDao }