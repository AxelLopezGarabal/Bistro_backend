var mysql = require('mysql');
const { Branch } = require('../../model/bistro/Branch');
const dbConData = require('../../resources/dbCon').conData;

class BranchDao{
    constructor() {
    }

    getById(someId){
        return this.__getBranch(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveBranch(newBranch){
        return this.__saveBranch(this.insertQuery(), this.insertValues(newBranch), mysql.createConnection(dbConData));
    }

    updateBranch(modBranch){
        return this.__updateBranch(this.updateQuery(modBranch), [modBranch.getId()], mysql.createConnection(dbConData));
    }

    deleteBranch(someId){
        return this.__deleteBranch(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getBranch(sql, fild, con){
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
                var branch = new Branch(res.idBranch , res.phoneNro, [], []);
                return branch;
            }
        );
    }

    selectByIdQuery(){
        return "select * from mydb.Branch where idBranch = ?" ;
    }

    //save private methods
    __saveBranch(sql, newValues, con){
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
        return "INSERT INTO mydb.Branch (phoneNro) VALUES ?";
    }

    insertValues(newBranch){
        return [
            [newBranch.getPhoneNro()]
        ];
    }

    //delete private methods
    __deleteBranch(sql, fild, con){
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
        return "delete from mydb.Branch where idBranch = ?";
    }

    //update private methods
    __updateBranch(sql, fild, con){
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

    updateQuery(modBranch){
        return "UPDATE mydb.Branch SET phoneNro = " + mysql.escape(modBranch.getPhoneNro())
        + " WHERE idBranch = ?";
    }
}

module.exports = { BranchDao };