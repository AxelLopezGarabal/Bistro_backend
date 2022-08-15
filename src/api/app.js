// importing the dependencies
const testRoutes = require('./routes/testRoute');
const garnishRoutes = require('./routes/garnishRoutes/GarnishRoute');
const dishRoutes = require('./routes/dishRoutes/DishRoutes');
const menuRoutes = require('./routes/menuRoutes/MenuRoutes');
const employeeRoutes = require('./routes/employeeRoutes/EmployeeRoutes');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// defining the Express app
const app = express();
// Rest API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS
app.use(cors());
app.use(morgan('combined'));

app.use('/', testRoutes);
app.use('/api/', garnishRoutes);
app.use('/api/', dishRoutes);
app.use('/api/', menuRoutes);
app.use('/api/', employeeRoutes)

.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
.use((error, req, res, next) => {
    res
        .status(error.status)
        .json({
            errorCode: error.message
        })
})

module.exports = app;