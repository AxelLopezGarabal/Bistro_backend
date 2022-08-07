var mysql = require('mysql');
const { Branch } = require('../../../model/bistro/Branch');
const dbConData = require('../../../resources/dbCon').conData;

class TradeMarkBranchDao {
    constructor(){}

    getBranches(trademarkId){
        return this.__getAllBranches(this.__selectAllQuery(), trademarkId, mysql.createConnection(dbConData));
    }

    saveBranch(trademarkId, BranchId){
        return this.__save(this.__saveQuery(), [[trademarkId, BranchId]], mysql.createConnection(dbConData));
    }

    deleteBranch(trademarkId, BranchId){
        return this.__delete(this.__deleteQuery(trademarkId, BranchId), mysql.createConnection(dbConData));
    }

    deleteBranches(trademarkId){
        return this.__deleteAllBranches(this.__deleteAllQuery(), [trademarkId], mysql.createConnection(dbConData));
    }

    __getAllBranches(sql, fild, con){
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
                new Branch(elem.idBranch, elem.phoneNro, [], [])
            )});
            return temp;
        });
    }

    __selectAllQuery() {
        return "SELECT idBranch, phoneNro FROM "+
        "(mydb.TrademarkBranch join mydb.Branch on TrademarkBranch.BranchId = Branch.idBranch)"+
        "where trademarkId = ?";
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
        return "insert into mydb.TrademarkBranch (trademarkId, branchId) values ?";
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
    __deleteQuery(trademarkId, BranchId){
        return "delete from mydb.TrademarkBranch where trademarkId = "+ mysql.escape(trademarkId) +
        " and BranchId = " + mysql.escape(BranchId);
    }

    __deleteAllBranches(sql, fild, con){
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
        return "delete from mydb.TrademarkBranch where trademarkId = ?";
    }
}

module.exports = { TradeMarkBranchDao }