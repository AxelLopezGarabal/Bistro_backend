class Garnish {
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

//GETTERS
    getId(){ return this.id; }

    getName(){ return this.name; }

    getPrice(){ return this.price; }

//SETTERS
    setId(newId){ this.id = newId; }

    setName(newName){ this.name = newName; }

    setPrice(newPrice){ this.price = newPrice; }

//BOOLEANS
    isTheTarget(someId){ return this.id == someId; }
}

module.exports = {Garnish}