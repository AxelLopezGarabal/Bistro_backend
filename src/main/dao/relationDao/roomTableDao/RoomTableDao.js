var mysql = require('mysql');
const { Table } = require('../../../model/room/Table');
const dbConData = require('../../../resources/dbCon').conData;

class RoomTableDao {
    constructor(){}

    getTables(roomId){
        return this.__getAllTables(this.__selectAllQuery(), roomId, mysql.createConnection(dbConData));
    }

    saveTable(roomId, TableId){
        return this.__save(this.__saveQuery(), [[roomId, TableId]], mysql.createConnection(dbConData));
    }

    deleteTable(roomId, TableId){
        return this.__delete(this.__deleteQuery(roomId, TableId), mysql.createConnection(dbConData));
    }

    deleteTables(roomId){
        return this.__deleteAllTables(this.__deleteAllQuery(), [roomId], mysql.createConnection(dbConData));
    }

    __getAllTables(sql, fild, con){
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
                new Table(elem.idTable, elem.location, elem.capacity, [], this.toBool(elem.isReserved)))
            });
            return temp;
        });
    }

    __selectAllQuery() {
        return "SELECT idTable, location, capacity, isReserved FROM " 
        + "(mydb.RoomTable join mydb.Table on RoomTable.tableId = mydb.Table.idTable)"
        + "where roomId = ?";
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
        return "insert into mydb.RoomTable (roomId, tableId) values ?";
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
    __deleteQuery(roomId, tableId){
        return "delete from mydb.RoomTable where roomId = "+ mysql.escape(roomId) +
        " and tableId = " + mysql.escape(tableId);
    }

    __deleteAllTables(sql, fild, con){
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
        return "delete from mydb.RoomTable where roomId = ?";
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

module.exports = { RoomTableDao }