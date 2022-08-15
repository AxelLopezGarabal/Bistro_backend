var mysql = require('mysql');
const { Employee } = require('../../model/employee/Employee');
const dbConData = require('../../resources/dbCon').conData;

class EmployeeDao{
    constructor() {
        this.conection = mysql.createConnection(dbConData);
    }

    getById(someId){
        return this.__getEmplyee(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveEmployee(newEmp){
        return this.__saveEmployee(this.insertQuery(), this.insertValues(newEmp), mysql.createConnection(dbConData));
    }

    updateEmployee(modEmployee){
        return this.__updateEmployee(this.updateQuery(modEmployee), [modEmployee.getId()], mysql.createConnection(dbConData));
    }

    deleteEmployee(someId){
        return this.__deleteEmployee(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getEmplyee(sql, fild, con){
        let pro = new Promise((resolve,reject) => {
            con.query(sql, fild, function (err, result) {
                if (err) throw err; 
                resolve(result);

                con.end();
            });
        });
        return pro.then((val) => {
            if(val.length == 0) throw new Error('id does not exist');
            return val[0];
        }).then(res => {
                var emp = new Employee(res.idEmployee, 0, res.password, res.fullname, res.email, res.phoneNro, res.rank);
                return emp;
            }
        );
    }

    selectByIdQuery(){
        return "select * from Employee where idEmployee = ?" ;
    }

    //save private methods
    __saveEmployee(sql, newValues, con){
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
        return "INSERT INTO Employee (fullname, password, email, phoneNro, rank) VALUES ?";
    }

    insertValues(newEmp){
        return [
            [newEmp.getFullname(), newEmp.getPassword(), newEmp.getEmail(), newEmp.getPhoneNro(), newEmp.getRank()]
        ];
    }

    //delete private methods
    __deleteEmployee(sql, fild, con){
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
        return "delete from Employee where idEmployee = ?";
    }

    //update private methods
    __updateEmployee(sql, fild, con){
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

    updateQuery(newEmpl){
        return "UPDATE Employee SET fullname = "+ mysql.escape(newEmpl.getFullname()) +", "
        + " password = " + mysql.escape(newEmpl.getPassword()) +", "
        + " email = " + mysql.escape(newEmpl.getEmail()) +", "
        + " phoneNro = " + newEmpl.getPhoneNro() +", "
        + " rank = " + mysql.escape(newEmpl.getRank()) +
        " WHERE idEmployee = ?";
    }
}

module.exports = { EmployeeDao };