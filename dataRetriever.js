const employeeData = require('./dummydata.js');

let findEmployee = (id) => {
    return employeeData.find((employee) => {
        if (employee._id === id)
            return employee;
    });
}

let addEmployee = (employee) => {
    employeeData.push(employee);
}

let findAndReplace = (employee) => {
    let employeeFound = findEmployee(employee._id);
    if (employeeFound) {
        for (var key in employee) {
            employeeFound[key] = employee[key];
        }
        return true;
    } else {
        return false;
    }
}

module.exports = {
    findEmployee: findEmployee,
    addEmployee: addEmployee,
    findAndReplace: findAndReplace
}