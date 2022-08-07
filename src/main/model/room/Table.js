class Table {
    constructor(id, location, capacity, orders, isReserve){
        this.id = id;
        this.location = location;
        this.capacity = capacity;
        this.orders = orders;
        this.isReserved = isReserve;
    }

//GETTERS
    getId() { return this.id; }

    getLocation() { return this.location; }

    getCapcity() { return this.capacity; }

    getOrders() { return this.orders; }

//SETTERS
    setId(newId) { this.id = newId; }

    setLocation(newLocation) { this.location = newLocation; }

    setCapacity(newCapacity) { this.capacity = newCapacity; }

    setOrders(newOrders) { this.orders = newOrders; }

//BOOLEANS
    isReserve() { return this.isReserved; }

    changeState() { this.isReserved = !this.isReserved; }

    isTheTarget(someId) { return this.id == someId; }

//LIST
    addOrder(newOrder) { this.orders.push(newOrder); }
    
    findOrder(orderId) { return this.orders.find(order => order.isTheTarget(orderId)); }
    
    removeOrder(orderId) { this.orders = this.orders.filter(order => !order.isTheTarget(orderId)); }
    
}

module.exports = {Table}