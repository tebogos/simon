
const getRandomInt=(min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const randomColorGenerator=()=>{
     let colors=["red","blue","green","yellow"];
  return colors[getRandomInt(0,3)];
    
};
//Adds the next color to the game play
const addNextPlay=(state,color)=>{ 
    return Object.assign({},state,{colorList:[...state.colorList,color]});
};
const addYourList=(state,color)=>{ 
    return Object.assign({},state,{yourList:[...state.yourList,color]});
};

const changeMode=(state,mode)=>{
    
    return Object.assign({},state,{mode:mode});
};
const clearGame=(state,mode,colorList)=>{
    return Object.assign({},state,{mode:mode,colorList:colorList});
};
const clearYourList=(state,mode,colorList)=>{
    return Object.assign({},state,{mode:mode,colorList:colorList});
};

const increamentCounter=(state)=>{
    
    return Object.assign({},state,{counter:(state.counter+1)});
};

const score=(state={counter:0},action)=>{
    
  switch(action.type){
      case "INCREAMENT_COUNTER":
          return increamentCounter(state);     
          
    default:
          return state;
                    }  
};

const game=(state={colorList:[],yourList:[],mode:"normal"},action)=>{
    
  switch(action.type){
      case "ADD_PLAY":
          return addNextPlay(state,action.color);
      case "ADD_YOUR_LIST":
          return addYourList(state,action.color);
      case "CHANGE_MODE":
          return changeMode(state,action.mode);
      case "CLEAR_GAME":
          return clearGame(state,action.mode,action.colorList);
      case "CLEAR_YOUR_LIST":
          return clearYourList(state,action.mode,action.yourList);
          
    default:
          return state;
                    }  
};




module.exports={    
    addNextPlay:addNextPlay,
    game:game,
    score:score
};