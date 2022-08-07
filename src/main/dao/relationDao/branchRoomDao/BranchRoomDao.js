var mysql = require('mysql');
const { Room } = require('../../../model/room/Room');
const dbConData = require('../../../resources/dbCon').conData;

class BranchRoomDao {
    constructor(){}

    getRooms(branchId){
        return this.__getAllRooms(this.__selectAllQuery(), branchId, mysql.createConnection(dbConData));
    }

    saveRoom(branchId, roomId){
        return this.__save(this.__saveQuery(), [[branchId, roomId]], mysql.createConnection(dbConData));
    }

    deleteRoom(branchId, roomId){
        return this.__delete(this.__deleteQuery(branchId, roomId), mysql.createConnection(dbConData));
    }

    deleteRooms(branchId){
        return this.__deleteAllRooms(this.__deleteAllQuery(), [branchId], mysql.createConnection(dbConData));
    }

    __getAllRooms(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then((val) => {
            var temp = [];
            val.forEach(elem => {temp.push(new Room(elem.idRoom, []))});
            return temp;
        });
    }

    __selectAllQuery() {
        return "SELECT idRoom FROM (mydb.BranchRoom join mydb.Room on BranchRoom.roomId = mydb.Room.idRoom)"
        + "where branchId = ?";
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
        return "insert into mydb.BranchRoom (branchId, roomId) values ?";
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
    __deleteQuery(branchId, roomId){
        return "delete from mydb.BranchRoom where branchId = "+ mysql.escape(branchId) +
        " and roomId = " + mysql.escape(roomId);
    }

    __deleteAllRooms(sql, fild, con){
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
        return "delete from mydb.BranchRoom where branchId = ?";
    }

}

module.exports = { BranchRoomDao }