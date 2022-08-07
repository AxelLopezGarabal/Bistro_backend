class Menu {
    constructor(id, dishes){
        this.id= id;
        this.dishes = dishes;
    }

//GETTERS
    getId(){ return this.id;}

    getDishes(){ return this.dishes; }

//SETTERS
    setId(newId){ this.id = newId}

    setDishes(newDishes){ this.dishes = newDishes; }

//LIST
    addDish(newDish){ this.dishes.push(newDish); }

    findDish(dishId){ return this.dishes.find(dish => dish.isTheTarget(dishId)); }

    removeDish(dishId){ this.dishes = this.dishes.filter(dish => !dish.isTheTarget(dishId)); }

}

module.exports = {Menu};