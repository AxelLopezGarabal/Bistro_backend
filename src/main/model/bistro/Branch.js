class Branch {
    constructor(id, phoneNro, employees, rooms){
        this.id = id;
        this.phoneNro = phoneNro;
        this.employees = employees;
        this.rooms = rooms;
    }

//GETTERS
    getId() { return this.id; }

    getPhoneNro() { return this.phoneNro; }

    getEmployees() { return this.employees; }

    getRooms() { return this.rooms; }

//SETTERS
    setId(newId) { this.id = newId; }

    setphoneNro(newPhoneNro) { this.phoneNro = newPhoneNro; }

    setEmployees(newEmployees) { this.employees = newEmployees; }

    setRooms(newRooms) { this.rooms = newRooms; }

//BOOLEANS
    isTheTarget(someId){ return this.id == someId; }

//LIST
    addEmployee(newEmployee) { this.employees.push(newEmployee); }

    findEmployee(employeeId) { return this.employees.find(employee => employee.isTheTarget(employeeId)); }

    removeEmployee(employeeId) { 
        this.employees = this.employees.filter(employee => !employee.isTheTarget(employeeId)); 
    }

    addRoom(newRoom) { this.rooms.push(newRoom); }

    findRoom(roomId) { return this.rooms.find(room => room.isTheTarget(roomId)); }

    removeRoom(roomId) { this.rooms = this.rooms.filter(room => !room.isTheTarget(roomId)); }
}

module.exports = { Branch }