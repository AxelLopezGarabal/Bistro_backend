const express = require('express');
const router = express.Router();

const { EmployeeDao } = require('../../../main/dao/employeeDao/EmployeeDao');
const { Employee } = require('../../../main/model/employee/Employee');

const dao = new EmployeeDao();


router.get('/employee=:id', (req, res, next) => {
    dao.getById(req.params.id).then(daoRes => {
        res.send({
            title: 'The employee requested by id',
            typeOfRequest: "GET",
            data : daoRes
        });
    }).catch(daoErr => {res.send(daoErr.message)});
});

router.post('/employee', (req, res, next) => {
    const temp = req.body;
    const newEmployee = new Employee(0,0, temp.password, temp.fullname, temp.email, temp.phoneNro, temp.rank);
    dao.saveEmployee(newEmployee).then(daoRes => {
        res.send({
            title: 'A new Employee has been added',
            typeOfRequest: 'POST',
            id: daoRes,
            relatedLinks: ['http://localhost:3001/api/employee='+ daoRes]
        })
    }).catch(daoErr => { res.send(daoErr.message) });
});

router.delete('/employee=:id', (req, res, next) => {
    dao.deleteEmployee(req.params.id).then(daoRes => {
        res.send({
            title: 'The employee has been deleted',
            typeOfRequest: 'DELETE',
            id: req.params.id
        });
    }).catch(daoErr => {res.send(daoErr.message)});
});

module.exports = router;