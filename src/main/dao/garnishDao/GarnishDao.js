var mysql = require('mysql');
const { Garnish } = require('../../model/dish/Garnish');
const dbConData = require('../../resources/dbCon').conData;

class GarnishDao{
    constructor() {
    }

    getById(someId){
        return this.__getGarnish(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveGarnish(newGarnish){
        return this.__saveGarnish(this.insertQuery(), this.insertValues(newGarnish), mysql.createConnection(dbConData));
    }

    updateGarnish(modGarnish){
        return this.__updateGarnish(this.updateQuery(modGarnish), [modGarnish.getId()], mysql.createConnection(dbConData));
    }

    deleteGarnish(someId){
        return this.__deleteGarnish(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getGarnish(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then((val) => {
            if(val.length == 0) throw Error("id does not exist");
            return val[0];
        }).then(res => {
                var garnish = new Garnish(res.idGarnish, res.name, res.price);
                return garnish;
            }
        );
    }

    selectByIdQuery(){
        return "select * from Garnish where idGarnish = ?" ;
    }

    //save private methods
    __saveGarnish(sql, newValues, con){
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
        return "INSERT INTO Garnish (name, price) VALUES ?";
    }

    insertValues(newGarnish){
        return [
            [newGarnish.getName(), newGarnish.getPrice()]
        ];
    }

    //delete private methods
    __deleteGarnish(sql, fild, con){
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
        return "delete from Garnish where idGarnish = ?";
    }

    //update private methods
    __updateGarnish(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, [fild], function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then(res => {
            if (res.length == 0) throw new Error("id does not exist");
            return fild;
        });
    }

    updateQuery(modGarnish){
        return "UPDATE Garnish SET name = " + mysql.escape(modGarnish.getName())
        + ", price = " + modGarnish.getPrice() 
        + " WHERE idGarnish = ?";
    }
}

module.exports = { GarnishDao };