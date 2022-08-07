class Employee{
    constructor(id, branchId, password,fullname, email, phoneNro, rank){
        this.id = id;
        this.branchId = branchId;
        this.fullname = fullname;
        this.password = password;
        this.email = email;
        this.phoneNro = phoneNro;
        this.rank = rank;
    }

//GETTERS
    getId(){ return this.id; }

    getBranchId(){ return this.branchId; }

    getFullname(){ return this.fullname; }

    getPassword(){ return this.password; }

    getEmail(){ return this.email; }

    getPhoneNro(){ return this.phoneNro; }
    
    getRank(){ return this.rank; }
    

//SETTERS
    setId(newId){ this.id = newId; }
    
    setBranchId(newBranchId){ this.branchId = newBranchId; }
    
    setFullname(newFullname){ this.fullname = newFullname; }

    setPassword(newPassword){ this.password = newPassword; }
    
    setEmail(newEmail){ this.email = newEmail; }
    
    setPhoneNro(newPhoneNro){ this.phoneNro = newPhoneNro; }
    
    setRank(newRank){ this.rank = newRank; }
    

//BOOLEANS
    isTheTarget(someId){ return this.id == someId; }
}

module.exports = {Employee};