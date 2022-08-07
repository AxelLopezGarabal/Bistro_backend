class Room {
    constructor(id, tables){
        this.id = id;
        this.tables = tables;
    }

//GETTERS
    getId() { return this.id; }

    getTables() { return this.tables; }

//SETTERS
    setId(newId) { this.id = newId; }

    setTables(newTables) { this.tables = newTables; }

//BOOLEANS
    isTheTarget(someId) { return this.id == someId; }

//LIST
    addTable(newTable){ this.tables.push(newTable); }

    findTable(tableId){ return this.tables.find(table => table.isTheTarget(tableId)); }

    removeTable(tableId){ this.tables = this.tables.filter(table => !table.isTheTarget(tableId)); }
}

module.exports = { Room }