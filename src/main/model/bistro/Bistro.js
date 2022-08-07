class Bistro{
    constructor(id, tradeMarks){
        this.id = id;//? necesario?
        this.tradeMarks = tradeMarks;//ls
    }

// GETTERS
    getTradeMark(){ return this.tradeMarks; }

//SETTER
    setId(newId){ this.id = newId; }

    setTradeMark(tradeMarks){ this.tradeMarks = tradeMarks; }

//LIST
    addTradeMark(tradeMark){ this.tradeMarks.push(tradeMark); }

    findTradeMark(tradeMarkId){ return this.tradeMarks.find(tradeMark => tradeMark.isTheTarget(tradeMarkId)); }

    removeTradeMark(tradeMarkId){ 
        this.tradeMarks = this.tradeMarks.filter(tradeMark => tradeMark.isTheTarget(tradeMarkId));
    }
}

module.exports = {Bistro};