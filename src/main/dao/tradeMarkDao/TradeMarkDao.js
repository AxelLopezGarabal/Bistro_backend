var mysql = require('mysql');
const { TradeMark } = require('../../model/bistro/TradeMark');
const dbConData = require('../../resources/dbCon').conData;

class TradeMarkDao{
    constructor() {
    }

    getById(someId){
        return this.__getTradeMark(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveTradeMark(newTradeMark){
        return this.__saveTradeMark(this.insertQuery(), this.insertValues(newTradeMark), mysql.createConnection(dbConData));
    }

    updateTradeMark(modTradeMark){
        return this.__updateTradeMark(this.updateQuery(modTradeMark), [modTradeMark.getId()], mysql.createConnection(dbConData));
    }

    deleteTradeMark(someId){
        return this.__deleteTradeMark(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getTradeMark(sql, fild, con){
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
                var tradeMark = new TradeMark(res.idTradeMark, res.name, [], );
                return tradeMark;
            }
        );
    }

    selectByIdQuery(){
        return "select * from mydb.TradeMark where idTradeMark = ?" ;
    }

    //save private methods
    __saveTradeMark(sql, newValues, con){
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

    insertQuery(){ return "INSERT INTO mydb.TradeMark (name) VALUES ?"; }

    insertValues(newTradeMark){
        return [
            [newTradeMark.getName()]
        ];
    }

    //delete private methods
    __deleteTradeMark(sql, fild, con){
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

    deleteQuery(){ return "delete from mydb.TradeMark where idTradeMark = ?"; }

    //update private methods
    __updateTradeMark(sql, fild, con){
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

    updateQuery(modTradeMark){
        return "UPDATE mydb.TradeMark SET name = " + mysql.escape(modTradeMark.getName())
        + " WHERE idTradeMark= ?";
    }
}

module.exports = { TradeMarkDao };