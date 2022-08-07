var mysql = require('mysql');
const { Dish } = require('../../model/dish/Dish');
const dbConData = require('../../resources/dbCon').conData;

class DishDao{
    constructor() {
    }

    getById(someId){
        return this.__getDish(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveDish(newDish){
        return this.__saveDish(this.insertQuery(), this.insertValues(newDish), mysql.createConnection(dbConData));
    }

    updateDish(modDish){
        return this.__updateDish(this.updateQuery(modDish), [modDish.getId()], mysql.createConnection(dbConData));
    }

    deleteDish(someId){
        return this.__deleteDish(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getDish(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then((val) => {
            return val[0];
        }).then(res => {
                var dish = new Dish(res.idDish, res.name, res.type, [], res.price, res.image);
                return dish;
            }
        );
    }

    selectByIdQuery(){
        return "select * from Dish where idDish = ?" ;
    }

    //save private methods
    __saveDish(sql, newValues, con){
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

    insertQuery(){
        return "INSERT INTO Dish (name, type, price, image) VALUES ?";
    }

    insertValues(newDish){
        return [
            [newDish.getName(), newDish.getType(), newDish.getPrice(), newDish.getImage()]
        ];
    }

    //delete private methods
    __deleteDish(sql, fild, con){
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

    deleteQuery(){
        return "delete from Dish where idDish = ?";
    }

    //update private methods
    __updateDish(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, [fild], function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then(res => {
            return fild;
        });
    }

    updateQuery(modDish){
        return "UPDATE Dish SET name = " + mysql.escape(modDish.getName())
        + ", type = " + mysql.escape(modDish.getType())
        + ", price = " + modDish.getPrice()
        + ", image = " + mysql.escape(modDish.getImage())
        + " WHERE idDish = ?";
    }
}

module.exports = { DishDao };