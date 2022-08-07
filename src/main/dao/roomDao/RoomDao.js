var mysql = require('mysql');
const { Room } = require('../../model/room/Room');
const dbConData = require('../../resources/dbCon').conData;

class RoomDao{
    constructor() {
    }

    getById(someId){
        return this.__getRoom(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveRoom(newRoom){
        return this.__saveRoom(this.insertQuery(), this.insertValues(newRoom), mysql.createConnection(dbConData));
    }

    updateRoom(modRoom){
        return this.__updateRoom(this.updateQuery(modRoom), [modRoom.getId()], mysql.createConnection(dbConData));
    }

    deleteRoom(someId){
        return this.__deleteRoom(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getRoom(sql, fild, con){
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
                var room = new Room(res.idRoom, []);
                return room;
            }
        );
    }

    selectByIdQuery(){
        return "select * from mydb.Room where idRoom = ?" ;
    }

    //save private methods
    __saveRoom(sql, newValues, con){
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
        return "INSERT INTO mydb.Room () VALUES ?";
    }

    insertValues(newRoom){
        return [
            []
        ];
    }

    //delete private methods
    __deleteRoom(sql, fild, con){
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
        return "delete from mydb.Room where idRoom = ?";
    }

    //update private methods
/*
    __updateRoom(sql, fild, con){
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

    updateQuery(modOrder){
        return "UPDATE mydb.Order SET name = " + mysql.escape(modOrder.getDishName())
        + ", price = " + modOrder.getPrice() 
        + " WHERE idOrder = ?";
    }
*/
}

module.exports = { RoomDao };