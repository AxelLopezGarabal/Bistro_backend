class Order {
    constructor(id, dishName, price, garnishes){
        this.id = id;
        this.dishName = dishName;
        this.price = price;
        this.garnishes = garnishes;
    }

//GETTERS
    getId(){ return this.id; }

    getDishName(){ return this.dishName; }

    getPrice(){ return this.price; }

    getGarnishes(){ return this.garnishes; }

//SETTERS
    setId(newId){ this.id = newId; }

    setDishName(newName){ this.dishName = newName; }

    setPrice(newPrice){ this.price = newPrice; }

    setGarnishes(newGarnishes){ this.garnishes = newGarnishes; }

//BOOLEANS
    isTheTarget(someId) { return this.id == someId; }

//LIST
    addGarnish(newGarnish){ this.garnishes.push(newGarnish); }

    findGarnish(garnishId){ return this.garnishes.find(garnish => garnish.isTheTarget(garnishId)); }
    
    removeGarnish(garnishId){this.garnishes = this.garnishes.filter(garnish => !garnish.isTheTarget(garnishId)); }
}

module.exports = {Order}