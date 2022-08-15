var mysql = require('mysql');
const { Menu } = require('../../model/menu/Menu');
const dbConData = require('../../resources/dbCon').conData;

class MenuDao{
    constructor(){}

    getMenu(menuId){
        return this.__getMenu(this.__selectQuery(), menuId, mysql.createConnection(dbConData));
    }

    saveMenu(){
        return this.__save(this.__saveQuery(), [], mysql.createConnection(dbConData));
    }

    deleteMenu(menuId){
        return this.__delete(this.__deleteQuery(), menuId, mysql.createConnection(dbConData));
    }

    __getMenu(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then((val) => {
            if(val.length == 0) throw new Error('id does not exist');
            var temp = new Menu(val[0].idMenu, []);
            return temp;
        });
    }

    __selectQuery(){
        return "select * from mydb.Menu where idMenu = ?";
    }

    __save(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, [fild], function (err, result) {
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
        return "insert into mydb.Menu () values ()";
    }

    __delete(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, [fild], function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });

        return pro.then(res => {
            return res;
        });
    }

    __deleteQuery(){
        return "delete from mydb.Menu where idMenu = ?";
    }

}

module.exports = { MenuDao }