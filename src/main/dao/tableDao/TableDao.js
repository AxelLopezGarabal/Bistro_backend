var mysql = require('mysql');
const { Table } = require('../../model/room/Table');
const dbConData = require('../../resources/dbCon').conData;

class TableDao{
    constructor() {
    }

    getById(someId){
        return this.__getTable(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveTable(newTable){
        return this.__saveTable(this.insertQuery(), this.insertValues(newTable), mysql.createConnection(dbConData));
    }

    updateTable(modTable){
        return this.__updateTable(this.updateQuery(modTable), [modTable.getId()], mysql.createConnection(dbConData));
    }

    deleteTable(someId){
        return this.__deleteTable(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getTable(sql, fild, con){
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
                var table = new Table(res.idTable, res.location, res.capacity, [], this.toBool(res.isReserved));
                return table;
            }
        );
    }

    selectByIdQuery(){
        return "select * from mydb.Table where idTable = ?" ;
    }

    //save private methods
    __saveTable(sql, newValues, con){
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
        return "INSERT INTO mydb.Table (location, capacity, isReserved) VALUES ?";
    }

    insertValues(newTable){
        return [
            [newTable.getLocation(), newTable.getCapcity(), this.toInt(newTable.isReserve())]
        ];
    }

    //delete private methods
    __deleteTable(sql, fild, con){
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
        return "delete from mydb.Table where idTable = ?";
    }

    //update private methods
    __updateTable(sql, fild, con){
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

    updateQuery(modTable){
        return "UPDATE mydb.Table SET location = " + mysql.escape(modTable.getLocation())
        + ", capacity = " + modTable.getCapcity() 
        + ", isReserved = " + this.toInt(modTable.isReserve())
        + " WHERE idTable = ?";
    }

    toInt(boolean){
        if(boolean) { return 1; }
        else { return 0; }
    }

    toBool(int){
        if(int == 1) { return true; }
        else { return false; }
    }
}

module.exports = { TableDao };