const findOneById = (id) =>{
    if(id===1){
        return {id:1, name:"John"};
    }
    return null;
}

describe("findOneById", ()=>{
    it("should return null id id is not found", ()=>{
        const id = 2;
        expect(findOneById(id)).toBeNull();
    });

    it("should return the user with id 1", () =>{
        const id = 1;
        const {id: idFound} = findOneById(id);
        expect(idFound).toBe(id);
    })
});