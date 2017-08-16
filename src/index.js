
//Dell XPS 13 (9360) or Dell XPS 13 2in1 (9365)


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

const updateDisplayAnTone=(color)=>{
    if(color==="red"){
        document.getElementById("red").style.backgroundColor="#ff0000";
//        playRedTone();
    }
    else if(color==="blue"){
        document.getElementById("blue").style.backgroundColor="#0000ff";
//        playBlueTone();
    }
    else if(color==="yellow"){
        document.getElementById("yellow").style.backgroundColor="#ffff00";
//        playBlueTone();
    }
    else if(color==="green"){
        document.getElementById("green").style.backgroundColor="#00ff00";
//        playBlueTone();
    }
    
};
const displayPlay=()=>{
  let list=store.getState().game.colorList;
    if(list.length>0){
        list.forEach((color)=>{
          updateDisplayAnTone(color);
        });
    }
};
const nextPlay=()=>{
    if(start&&win){
    let color =randomColorGenerator();
    store.dispatch({type:"ADD_NEXT_PLAY",color:color});
    }
    displayPlay();
    
};
const start=()=>{
  
    
    setTimeout(play,1000);
    
    
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

const updateWin=(state,win)=>{
    
    return Object.assign({},state,{win:win});
};

const score=(state={counter:0,win:true},action)=>{
    
  switch(action.type){
      case "INCREAMENT_COUNTER":
          return increamentCounter(state);  
      case "UPDATE_WIN":
          return updateWin(state,action.win);  
          
    default:
          return state;
                    }  
};

const updateStart=(state,start)=>{
    start =  typeof start ==="boolean"?start:false;
    return Object.assign({},state,{start:start});
};
const updateOn=(state,on)=>{
    on =  typeof on ==="boolean"?on:false;
    return Object.assign({},state,{on:on});
};
const updateYourTurn=(state,yourTurn)=>{
    yourTurn =  typeof yourTurn ==="boolean"?yourTurn:false;
    return Object.assign({},state,{yourTurn:yourTurn});
};
const game=(state={colorList:[],yourList:[],mode:"normal",start:false,on:false,yourTurn:false},action)=>{
    
  switch(action.type){
      case "ADD_NEXT_PLAY":
          return addNextPlay(state,action.color);
      case "ADD_YOUR_PLAY":
          return addYourList(state,action.color);
      case "CHANGE_MODE":
          return changeMode(state,action.mode);
      case "CLEAR_GAME":
          return clearGame(state,action.mode,action.colorList);
      case "UPDATE_START":
          return updateStart(state,action.start);  
      case "UPDATE_ON":
          return updateOn(state,action.on);  
      case "UPDATE_YOUR_TURN":
          return updateYourTurn(state,action.yourTurn);  
      case "CLEAR_YOUR_LIST":
          return clearYourList(state,action.mode,action.yourList);
          
    default:
          return state;
                    }  
};

document.getElementById("green").addEventListener("click",()=>{
    alert("You click me!, I am red");
});


const { combineReducers } = Redux;
const simonApp = combineReducers({
  game,  score});
const { createStore } =  Redux;
const store = createStore(simonApp);

store.dispatch({type:"ADD_PLAY",color:"blue"});
store.dispatch({type:"ADD_PLAY",color:"red"});

console.log(store.getState());

//module.exports={    
//    addNextPlay:addNextPlay,
//    game:game,
//    score:score
//};