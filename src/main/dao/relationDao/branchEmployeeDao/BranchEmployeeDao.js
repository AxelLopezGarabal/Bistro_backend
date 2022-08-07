var mysql = require('mysql');
const { Employee } = require('../../../model/employee/Employee');
const dbConData = require('../../../resources/dbCon').conData;

class BranchEmployeeDao {
    constructor(){}

    getEmployees(branchId){
        return this.__getAllEmployees(this.__selectAllQuery(), branchId, mysql.createConnection(dbConData));
    }

    saveEmployee(branchId, employeeId){
        return this.__save(this.__saveQuery(), [[branchId, employeeId]], mysql.createConnection(dbConData));
    }

    deleteEmployee(branchId, employeeId){
        return this.__delete(this.__deleteQuery(branchId, employeeId), mysql.createConnection(dbConData));
    }

    deleteEmployees(branchId){
        return this.__deleteAllEmployees(this.__deleteAllQuery(), [branchId], mysql.createConnection(dbConData));
    }

    __getAllEmployees(sql, fild, con){
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
                new Employee(elem.idEmployee, 0, elem.password, elem.fullname, elem.email, elem.phoneNro, elem.rank)
            )});
            return temp;
        });
    }

    __selectAllQuery() {
        return "SELECT idEmployee, fullname, password, email, phoneNro, rank FROM "+
        "(mydb.BranchEmployee join mydb.Employee on BranchEmployee.employeeId = Employee.idEmployee)"+
        "where branchId = ?";
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
        return "insert into mydb.BranchEmployee (branchId, employeeId) values ?";
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
    __deleteQuery(branchId, employeeId){
        return "delete from mydb.BranchEmployee where branchId = "+ mysql.escape(branchId) +
        " and employeeId = " + mysql.escape(employeeId);
    }

    __deleteAllEmployees(sql, fild, con){
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
        return "delete from mydb.BranchEmployee where branchId = ?";
    }
}

module.exports = { BranchEmployeeDao }