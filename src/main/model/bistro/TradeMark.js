class TradeMark {
    constructor(id, name, branches, menu){
        this.id = id;
        this.name = name;
        this.branches = branches;
        this.menu = menu;
    }

//GETTERS
    getId(){ return this.id; }
    getName(){ return this.name; }
    getMenu(){ return this.menu; }
    getBranches(){ return this.branches; }

//SETTERS
    setId(newId){ this.id = newId; }
    setName(newName){ this.name = newName; }
    setMenu(newMenu){ this.menu = newMenu; }
    setBranches(newBranches){ this.branches = newBranches; }

//BOOLEANS
    isTheTarget(someId){ return this.id == someId; }

//LIST
    addBranch(newBranch){ this.branches.push(newBranch); }

    findBranch(branchId){ return this.branches.find(branch => branch.isTheTarget(branchId)); }

    removeBranch(branchId){ this.branches = this.branches.filter(branch => !branch.isTheTarget(branchId)); }
}

module.exports = {TradeMark}