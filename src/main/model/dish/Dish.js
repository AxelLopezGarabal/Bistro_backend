class Dish {
    constructor(id, name, type, garnishes, price, image){
        this.id = id;
        this.name = name;
        this.type = type;
        this.garnishes = garnishes;//ls
        this.price = price;
        this.image = image;
    }

//GETTERS
    getId(){ return this.id; }

    getName(){ return this.name; }

    getType(){ return this.type; }

    getGarnishes(){ return this.garnishes; }

    getPrice(){ return this.price; }

    getImage(){ return this.image; }

//SETTERS
    setId(newId){ this.id = newId; }

    setName(newName){ this.name = newName; }

    setType(newType){ this.type = newType; }

    setGarnishes(newGarnishes){ this.garnishes = newGarnishes; }

    setPrice(newPrice){ this.price = newPrice; }

    setImage(newImage){ this.image = newImage; }

//LIST
    addGarnish(newGarnish){ this.garnishes.push(newGarnish); }

    findGarnish(someGarnish){ return this.garnishes.find(garnish => garnish == someGarnish); }

    removeGarnish(someGarnish){ this.garnishes = this.garnishes.filter(garnish => garnish != someGarnish); }

//BOOLEANS
    isTheTarget(someId){ return this.id == someId; }
}

module.exports = {Dish};