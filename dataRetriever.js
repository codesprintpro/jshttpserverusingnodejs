const employeeData = require('./dummydata.js');

let findEmployee = (id) => {
    return employeeData.find( (employee) => {
        if(employee._id === id)
            return employee;
    });
}

module.exports = {
    findEmployee: findEmployee
}