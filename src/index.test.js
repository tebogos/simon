var expect = require('chai').expect;
var assert = require('chai').assert;
var simon =require('./index');
var chai=require('chai');
var deepFreeze=require('deep-freeze');

chai.should();
//describe('all',function(){
//    it('Should be a Array of strings',function(){
//        expect(simon.all).to.satisfy(isArrayOfStrings);
//        
//        function isArrayOfStrings(array){
//            
//            return array.every(function(item){
//                return typeof item ==="string";
//            });
//            
//        }
//    });
//    
//});


describe("Game Reducer",()=>{
    it("Add color to color list",()=>{
        let beforeState={colorList:[],yourList:[],mode:"normal"};
        let afterState={colorList:["red"],yourList:[],mode:"normal"};  
        let action={type:"ADD_PLAY",color:"red"};
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.game(beforeState,action)).to.deep.equals(afterState);
        
    });
    it("Change mode",()=>{
        let beforeState={colorList:[],yourList:[],mode:"normal"};
        let afterState={colorList:[],yourList:[],mode:"strict"};  
        let action ={type:"CHANGE_MODE",mode:"strict"};
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.game(beforeState,action)).to.deep.equals(afterState);
        
    });
    it("Clear play list" ,()=>{
        let beforeState={colorList:[],yourList:[],mode:"normal"};
        let afterState={colorList:[],yourList:[],mode:"normal"};  
        let action ={type:"CLEAR_GAME",mode:"normal",colorList:[]};
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.game(beforeState,action)).to.deep.equals(afterState);
        
    });
    it("Clear your list" ,()=>{
        let beforeState={colorList:[],yourList:[],mode:"normal"};
        let afterState={colorList:[],yourList:[],mode:"normal"};  
        let action ={type:"CLEAR_YOUR_LIST",mode:"normal",yourList:[]};
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.game(beforeState,action)).to.deep.equals(afterState);
        
    });
    it("Add color to your play list",()=>{
        let beforeState={colorList:[],yourList:[],mode:"normal"};
        let afterState={colorList:[],yourList:["red"],mode:"normal"};  
        let action={type:"ADD_YOUR_LIST",color:"red"};
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.game(beforeState,action)).to.deep.equals(afterState);
        
    });
    
    
    
});

describe("Score Reducer",()=>{
    it("Increament the counter",()=>{
        let beforeState={counter:0};
        let afterState={counter:1};  
        let action={type:"INCREAMENT_COUNTER"};
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.score(beforeState,action)).to.deep.equals(afterState);
        
    });
    it("Call SOMETHING_ELSE",()=>{
        let beforeState={counter:0};
        let afterState={counter:0};  
        let action={type:"SOMETHING_ELSE"};
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.score(beforeState,action)).to.deep.equals(afterState);
        
    });
    
    it("undefind state",()=>{
        let beforeState=undefined;
        let afterState={counter:1};  
        let action={type:"INCREAMENT_COUNTER"};
//        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(simon.score(beforeState,action)).to.deep.equals(afterState);
        
    });
});

//describe("Random",function(){
//         
//         it("It should be random",function(){
//        
//        expect(simon.all).to.include(simon.random);
//    })
//         });
//
//describe("Say Hello",function(){
//    it("Should say Hello",function(){
//        simon.sayHello().should.equal("Hello");
//    });
//    it("Should return a string ",function(){
//        expect(simon.sayHello()).to.be.a("string");
//    });
//    
//});
//
//describe("Say Hello name",function(){
//    let name="Timi";
//    it("Should say Hello"+name,function(){
//        expect(simon.sayHelloName(name)).to.equal("Hello "+name);
//    });
//    
//});