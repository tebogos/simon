
    //Dell XPS 13 (9360) or Dell XPS 13 2in1 (9365)
const RED_SOUND = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
const BLUE_SOUND = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
const GREEN_SOUND = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
const YELLOW_SOUND = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
    let START_GAME;
    /**
     * Generates random numbers
     * @param {number} min the minimum number in the range
     * @param {number} max the maximum number in the range
     * @returns {number} The randam number between the min and max range
     */
    const getRandomInt=(min, max)=> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    /**
     * Gernerates a random color between red blue green and yellow
     * @returns {string} Returns a color of type string
     */
    const randomColorGenerator=()=>{
        let colors = ["red", "blue", "green", "yellow"];
    
        return colors[getRandomInt(0, 3)];     
    };
    //Adds the next color to the game play
    const addNextPlay=(state,color)=>{ 
        return Object.assign({},state,{colorList:[...state.colorList,color]});
    };
    /**
     * Adds the color to the yourList array
     * @param {object} state The state objtect
     * @param {string} color the color of type string
     * @returns {object} Returns the state object
     */
    const addYourList=(state,color)=>{ 
        return Object.assign({},state,{yourList:[...state.yourList,color]});
    };

    const youPlay = (color) => {   
        let canAdd = store.getState().game.yourList.length < store.getState().game.colorList.length;
    
        if (canAdd) {
            store.dispatch({ type: "ADD_YOUR_PLAY", color: color });
            let canTogglePlay = store.getState().game.yourList.length >= store.getState().game.colorList.length;
            if (canTogglePlay)
                store.dispatch({ type: "REPLAY_TRUE" });
            console.log("youPlay ::->")
            console.log(store.getState().game);
        }
        else {
            store.dispatch({ type: "CLEAR_YOUR_LIST" });
            store.dispatch({ type: "REPLAY_TRUE" });
        }
    
        console.log("youPlay function :")
        console.log(store.getState().game);
        console.log(store.getState().score);
    };

    const changeToColor = (color) => {
        if(color==="red")
            document.getElementById(color).style.backgroundColor = "#990000";
        if (color === "blue")
            document.getElementById(color).style.backgroundColor = "#000099";
        if (color === "yellow")
            document.getElementById(color).style.backgroundColor = "#dddd00";
        if (color === "green")
            document.getElementById(color).style.backgroundColor = "#009900";
    };


    const playAudio = (file) => {

        var audio = new Audio(file);
        audio.play();
    };

    /**
     * Updates the the div color and tone acording the color  passed to the method. It dose not return anything
     * @param {string} color the color to update the diplay and tone
     *
     */
    const updateDisplayAnTone = (color) => {    
        if(color==="red"){
            document.getElementById("red").style.backgroundColor = "#ff0000";
            setTimeout(() => { changeToColor("red") }, 300);
            playAudio(RED_SOUND);
        

    //        playRedTone();
        }
        else if(color==="blue"){
            document.getElementById("blue").style.backgroundColor = "#0000ff";
            setTimeout(() => { changeToColor("blue") }, 300);  
            playAudio(BLUE_SOUND);
    //        playBlueTone();
        }
        else if(color==="yellow"){
            document.getElementById("yellow").style.backgroundColor = "#ffff00";
            setTimeout(() => { changeToColor("yellow") }, 300);
            playAudio(YELLOW_SOUND);
    //        playBlueTone();
        }
        else if(color==="green"){
            document.getElementById("green").style.backgroundColor = "#00ff00";
            setTimeout(() => { changeToColor("green") }, 300);
            playAudio(GREEN_SOUND);
    //        playBlueTone();
        }
    
    };
    /**
     * Iterats the color array and calls the updateDiplayAndTone method with the color in the list
     */
    const displayPlay=()=>{
      let list=store.getState().game.colorList;
      if (list.length > 0) {
          let length = list.length;
          let i = 0;
          function f() {
              updateDisplayAnTone(list[i]);
              i++;
              if (i < length) {
                  setTimeout(f, 600);
              }
          }
          f();
        
        }
    };

    const canReplay = () => {
        let repeatDisplay = store.getState().game.yourList.length >= store.getState().game.colorList.length;
        let canReplay = store.getState().game.canReplay;
        let colorListLength = store.getState().game.colorList.length;

        return canReplay && repeatDisplay && (colorListLength > 0) === true ? true : false;

    };
    /**
     * It checks if the players move has won. If it win then it update win property to true else to false
     */
    const checkSequence = () => {

        let colorList = store.getState().game.colorList;
        let yourList = store.getState().game.yourList;
    

       let equal= colorList.reduce((acc, next, index) => {

            return yourList[index] === next ? true&&acc:false;
        }, true
        );
        if (equal && colorList.length>0) {
           store.dispatch({ type: "UPDATE_WIN", win: true });
           store.dispatch({ type: "INCREAMENT_COUNTER" });
           let digits = "0";
           if (store.getState().score.counter < 10)
               digits = digits + store.getState().score.counter;
           else
               digits = store.getState().score.counter;


           document.getElementById("show-counter").innerHTML = digits;
       }

        else if (canReplay()) {
            if (store.getState().game.mode==="normal")
                displayPlay();
            if (store.getState().game.mode === "strict") {
                store.dispatch({ type: "CLEAR_GAME" });
                store.dispatch({ type: "CLEAR_SCORE" });
            
            }
            store.dispatch({ type: "REPLAY_FALSE" });
            store.dispatch({ type: "CLEAR_YOUR_LIST" });
       
        }
       
    };

    let checkForWin = () => {
        let counter = store.getState().score.counter;
        if (counter >= 20) {
            store.dispatch({ type: "CLEAR_GAME" });
            store.dispatch({ type: "CLEAR_SCORE" });
            document.getElementById("show-counter").innerHTML = "-&nbsp;-";
            alert("Congratualtions. You have won ");
        }

    };
    /**
     * The computer will add a color in the colorList  array and then call the displayPlay to display the updated colorList array
     */
    const nextPlay = () => {

        checkSequence();
        checkForWin();
        let mode = store.getState().game.mode;
        if (mode === "strict")
            document.getElementById("mode-status").style.backgroundColor = "#ff0000";
        else if (mode === "normal")
            document.getElementById("mode-status").style.backgroundColor = "#990000";
        let start = store.getState().game.start;
        let win = store.getState().score.win;

        if (start && win) {        
        let color =randomColorGenerator();
        store.dispatch({ type: "ADD_NEXT_PLAY", color: color });
        store.dispatch({ type: "UPDATE_WIN", win: false });   
        displayPlay();
        store.dispatch({ type: "CLEAR_YOUR_LIST" });
   
        }
    
    
    };
    /**
     * Starts the game
     */
    const start=()=>{
  

        START_GAME= setInterval(nextPlay, 1000);
    
    
    };



    const changeMode=(state,mode)=>{
    
        return Object.assign({},state,{mode:mode});
    };
    const clearGame=(state,mode)=>{
        return Object.assign({}, state, { colorList: [], yourList: [],  yourTurn: false, canReplay: true });
    };
    const clearYourList=(state)=>{
        return Object.assign({}, state, {yourList: []});
    };

    const increamentCounter=(state)=>{
    
        return Object.assign({},state,{counter:(state.counter+1)});
    };

    const updateWin=(state,win)=>{
    
        return Object.assign({},state,{win:win});
    };


    const clearScore = (state) => {
        return { counter: 0, win: true };
    };
    const score=(state={counter:0,win:true},action)=>{
    
      switch(action.type){
          case "INCREAMENT_COUNTER":
              return increamentCounter(state);  
          case "UPDATE_WIN":
              return updateWin(state, action.win);  
          case "CLEAR_SCORE":
              return clearScore(state);  
          
        default:
              return state;
                        }  
    };

    const replayFalse = (state) => {
        return Object.assign({}, state, { canReplay: false });
    };
    const replayTrue = (state) => {
        return Object.assign({}, state, { canReplay: true });
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
    const game = (state = { colorList: [], yourList: [], mode: "normal", start: false, on: false, yourTurn: false, canReplay: true }, action) => {
    
      switch(action.type){
          case "ADD_NEXT_PLAY":
              return addNextPlay(state,action.color);
          case "ADD_YOUR_PLAY":
              return addYourList(state,action.color);
          case "CHANGE_MODE":
              return changeMode(state,action.mode);
          case "CLEAR_GAME":
              return clearGame(state,action.mode);
          case "UPDATE_START":
              return updateStart(state,action.start);  
          case "UPDATE_ON":
              return updateOn(state,action.on);  
          case "UPDATE_YOUR_TURN":
              return updateYourTurn(state,action.yourTurn);  
          case "CLEAR_YOUR_LIST":
              return clearYourList(state);
          case "REPLAY_FALSE":
              return replayFalse(state);
          case "REPLAY_TRUE":
              return replayTrue(state);
          
        default:
              return state;
                        }  
    };



    document.getElementById("red").addEventListener("click", () => {
        let on = store.getState().game.on;
        if (on === true) {
            youPlay("red");
            changeColor("red");
            playAudio(RED_SOUND);
        }

    });

    const changeColor = (color) => {
        let colorCode = "#000000";
        if (color === "red") {
            document.getElementById(color).style.backgroundColor = "#ff0000";
            setTimeout(() => { document.getElementById(color).style.backgroundColor = "#990000"; }, 300);
        }       
        else if (color === "blue") {
            document.getElementById(color).style.backgroundColor = "#0000ff";
            setTimeout(() => { document.getElementById(color).style.backgroundColor = "#000099"; }, 300)
        }
       
        else if (color === "yellow")
        {
            document.getElementById(color).style.backgroundColor = "#ffff00";
            setTimeout(() => { document.getElementById(color).style.backgroundColor = "#dddd00"; }, 300)
        }
        else if (color === "green") {
            document.getElementById(color).style.backgroundColor = "#00ff00";
            setTimeout(() => { document.getElementById(color).style.backgroundColor = "#009900"; }, 300)
        }       
        
    
    };
    document.getElementById("blue").addEventListener("click", () => {

        let on = store.getState().game.on;
        if (on === true) {
            youPlay("blue");
            changeColor("blue");
            playAudio(BLUE_SOUND);
        }

    });
    document.getElementById("yellow").addEventListener("click", () => {
        let on = store.getState().game.on;
        if (on === true) {
            youPlay("yellow");
            changeColor("yellow");
            playAudio(YELLOW_SOUND);
        }
    });
    document.getElementById("green").addEventListener("click", () => {
        let on = store.getState().game.on;
        if (on === true) {
            youPlay("green");
            changeColor("green");
            playAudio(GREEN_SOUND);
        }
    });


    document.getElementById("strict").addEventListener("click", () => {
        let on = store.getState().game.on;
        if (on === true) {
            let mode = store.getState().game.mode;
            if (mode === "normal")
                store.dispatch({ type: "CHANGE_MODE", mode: "strict" });
            else if (mode === "strict")
                store.dispatch({ type: "CHANGE_MODE", mode: "normal" })
        }

    });
    document.getElementById("on").addEventListener("click", () => {

        let on = store.getState().game.on;
        if (on === false) {
            store.dispatch({ type: "UPDATE_ON", on: true });
            document.getElementById("on").style.left = "36px";
       
        }
        else {  
       
            document.getElementById("on").style.left = "0px";
            store.dispatch({ type: "UPDATE_ON", on: false });
            store.dispatch({ type: "UPDATE_START", start: false });
            store.dispatch({ type: "CLEAR_GAME" });
            store.dispatch({ type: "CLEAR_SCORE" });
            document.getElementById("show-counter").innerHTML = "-&nbsp;-";
            document.getElementById("mode-status").style.backgroundColor = "#440000";
            store.dispatch({ type: "CHANGE_MODE", mode: "normal" });
        
            clearInterval(START_GAME);
        }   
    });

    document.getElementById("start").addEventListener("click", () => {
        let on = store.getState().game.on;    
    
        if (on === true) {
        
            store.dispatch({ type: "UPDATE_START", start: true });
            start();
        
        }        
   
    
    });
   



    const { combineReducers } = Redux;
    const simonApp = combineReducers({
      game,  score});
    const { createStore } =  Redux;
    const store = createStore(simonApp);

   