var mysql = require('mysql');
const { Order } = require('../../model/dish/Order');
const dbConData = require('../../resources/dbCon').conData;

class OrderDao{
    constructor() {
    }

    getById(someId){
        return this.__getOrder(this.selectByIdQuery(), [someId], mysql.createConnection(dbConData));
    }

    saveOrder(newOrder){
        return this.__saveOrder(this.insertQuery(), this.insertValues(newOrder), mysql.createConnection(dbConData));
    }

    updateOrder(modOrder){
        return this.__updateOrder(this.updateQuery(modOrder), [modOrder.getId()], mysql.createConnection(dbConData));
    }

    deleteOrder(someId){
        return this.__deleteOrder(this.deleteQuery(), [someId], mysql.createConnection(dbConData));
    }


    //get private methods
    __getOrder(sql, fild, con){
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
                var order = new Order(res.idOrder, res.name, res.price, []);
                return order;
            }
        );
    }

    selectByIdQuery(){
        return "select * from mydb.Order where idOrder = ?" ;
    }

    //save private methods
    __saveOrder(sql, newValues, con){
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
        return "INSERT INTO mydb.Order (name, price) VALUES ?";
    }

    insertValues(newOrder){
        return [
            [newOrder.getDishName(), newOrder.getPrice()]
        ];
    }

    //delete private methods
    __deleteOrder(sql, fild, con){
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
        return "delete from mydb.Order where idOrder = ?";
    }

    //update private methods
    __updateOrder(sql, fild, con){
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
}

module.exports = { OrderDao };