
var time = 0;
var globalMineNum = 0;
var globalGridSize = [9,9];
var clicks = 0;


function buildGrid(difficulty) {
    //Set default difficulty
    setDifficulty();
    // Fetch grid and clear out old elements.
    var grid = document.getElementById("minefield");
    grid.innerHTML = "";

    var columns = globalGridSize[0];
    var rows = globalGridSize[1];

    // Build DOM Grid
    var tile;
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < columns; x++) {
            tile = createTile(x,y);
            grid.appendChild(tile);
            tile.setAttribute("data-isMine","false")
            
            
        }
    }
    
    var style = window.getComputedStyle(tile);

    var width = parseInt(style.width.slice(0, -2));
    var height = parseInt(style.height.slice(0, -2));
    
    grid.style.width = (columns * width) + "px";
    grid.style.height = (rows * height) + "px";

    var tiles = grid.childNodes;

    //place mines
    placeMines(tiles, globalMineNum);

    for (let i = 0; i < tiles.length; i++) {
        calculateMinesAround(i);
    }
}

function createTile(x,y) {
    var tile = document.createElement("div");

    tile.classList.add("tile");
    tile.classList.add("hidden");
    
    tile.addEventListener("auxclick", function(e) { e.preventDefault(); }); // Middle Click
    tile.addEventListener("contextmenu", function(e) { e.preventDefault(); }); // Right Click
    tile.addEventListener("mouseup", handleTileClick ); // All Clicks

    return tile;
}

function checkIfMine(tile){
    let mineValue = tile.getAttribute("data-isMine");
    return (mineValue === "true");
}

function placeMines(tiles, numMines) {
    var remainingMines = numMines;
    let columns = globalGridSize[0];
    let rows = globalGridSize[1];
    do {
        var mineIndex = Math.floor(Math.random() * (columns*rows))
        

        if (checkIfMine(tiles[mineIndex]) ){
 
        } else { 
            tiles[mineIndex].setAttribute("data-isMine","true")
            remainingMines --;
        }

    }
    while (remainingMines >0);
    return tiles;
}

// Parameter i: the index of the tile in the nodelist
function calculateMinesAround(i) {
    //TODO: use isadjacent function to replace code block----------------------------------------------------------------- 

    //This works to get the main grid!
    //let tiles  = document.getElementById("minefield").childNodes;
    let grid  = document.getElementById("minefield");
    let tiles = grid.childNodes;
    // i is the index of the child in the parent
    let sum = 0
    
    let width = globalGridSize[0];
    let end = tiles.length;
    const farLeftCol = (i % width === 0);
    const farRightCol = (i % width === width-1);
    // Check previous tile 
    if (i > 0 && !farLeftCol && checkIfMine(tiles[i -1])) {sum++;}
    // Check top right corner
    if (i > width && !farRightCol && checkIfMine(tiles[i +1 -width])) sum++
    // Check above tile
    if (i > (width) && checkIfMine(tiles[i - width])) sum++
    //Check top left corner
    if(i > (width+2) &&  !farLeftCol && checkIfMine(tiles[i -1 -width])) sum ++
    //Check right
    if(i < (end-1) && !farRightCol && checkIfMine(tiles[i +1])) sum++
    //Check  bottom left corner
    if (i < (end-width) && !farLeftCol && checkIfMine(tiles[i -1 +width])) sum++
    //Check bottom right corner
    if(i<(end-width-1) && !farRightCol && checkIfMine(tiles[i +1 +width])) sum++
    //Check below
    if(i <(end-width) && checkIfMine(tiles[i + width])) sum++
    tiles[i].setAttribute('data-count', sum);
    return sum;
}



function startGame() {
    buildGrid();
    startTimer();
}

function smileyDown() {
    var smiley = document.getElementById("smiley");
    smiley.classList.add("face_down");
}

function smileyUp() {
    var smiley = document.getElementById("smiley");
    smiley.classList.remove("face_down");
}


function handleTileClick(event) {
    var tile = event.target;
    var tiles = document.getElementById("minefield").childNodes;
    
    // Left Click
    if (event.which === 1) {
        // No lose first click
        if(clicks == 0 && checkIfMine(tile)){
            tile.setAttribute("data-isMine","false");
            tile.classList.remove("hidden");
            setTileCountClass(tile);
            placeMines(tiles,1);
            
        }
        clicks++;
        // Game over condition
        if (checkIfMine(tile)){
            tile.classList.add("mine");
            alert("game over");
            let smiley = document.getElementById("smiley")
            smiley.classList.add("face_lose");
            
        }
        // No mine, reveal adjacent
        else { setTileCountClass(tile);
                   // TODO: use is adjacent and handleclick for recursion revealing all adjacent on naked tile
        }
    }
    // Right Click to place flag
    else if (event.which === 3) { 
        //TODO toggle a tile flag
        //tile.classlist.remove("mine");
        tile.classList.toggle('mine_marked');
        
    } 
}

function isAdjacent(mainIdx,questionIdx){ // parameter i: index of exploding tile in node list
    // make parameters less verbose
    let i = mainIdx;
    let q = questionIdx;
    //Load minefield
    let grid  = document.getElementById("minefield");
    let tiles = grid.childNodes;
    // i is the index of the child in the parent
    let width = globalGridSize[0];
    let end = tiles.length;
    const farLeftCol = (i % width === 0);
    const farRightCol = (i % width === width-1);

    // Check previous tile 
    
    if (i > 0 && !farLeftCol && (tiles[i -1])) {return true;}
    // Check top right corner
    else if (i > width && !farRightCol && checkIfMine(tiles[i +1 -width])) {return true;}
    // Check above tile
    else if (i > (width) && checkIfMine(tiles[i - width])){return true;}
    //Check top left corner
    else if(i > (width+2) &&  !farLeftCol && checkIfMine(tiles[i -1 -width])){return true;}
    //Check right
    else if(i < (end-1) && !farRightCol && checkIfMine(tiles[i +1])){return true;}
    //Check  bottom left corner
    else if (i < (end-width) && !farLeftCol && checkIfMine(tiles[i -1 +width])){return true;}
    //Check bottom right corner
    else if(i<(end-width-1) && !farRightCol && checkIfMine(tiles[i +1 +width])){return true;}
    //Check below
    else if(i <(end-width) && checkIfMine(tiles[i + width])){return true;}
    
    else {return false;}
    //-------------------------------
    // if (i > 0 && !farLeftCol && checkIfMine(tiles[i -1])) {return true;}
    // // Check top right corner
    // else if (i > width && !farRightCol && checkIfMine(tiles[i +1 -width])) {return true;}
    // // Check above tile
    // else if (i > (width) && checkIfMine(tiles[i - width])){return true;}
    // //Check top left corner
    // else if(i > (width+2) &&  !farLeftCol && checkIfMine(tiles[i -1 -width])){return true;}
    // //Check right
    // else if(i < (end-1) && !farRightCol && checkIfMine(tiles[i +1])){return true;}
    // //Check  bottom left corner
    // else if (i < (end-width) && !farLeftCol && checkIfMine(tiles[i -1 +width])){return true;}
    // //Check bottom right corner
    // else if(i<(end-width-1) && !farRightCol && checkIfMine(tiles[i +1 +width])){return true;}
    // //Check below
    // else if(i <(end-width) && checkIfMine(tiles[i + width])){return true;}
    
    // else {return false;}
}

function setTileCountClass(tile) {
            let minesAround = tile.getAttribute("data-count")
            console.log(minesAround);
            if (minesAround !=0) {
                if(minesAround==1){
                    tile.classList.add("tile_1");
                    return;
                }
                else if(minesAround==2){
                    tile.classList.add("tile_2")
                    return;
                }
                else if(minesAround==3){
                    tile.classList.add("tile_3")
                    return;
                }
                else if(minesAround==4){
                    tile.classList.add("tile_4")
                    return;
                }
                else if(minesAround==5){
                    tile.classList.add("tile_5")
                    return;
                }
                else if(minesAround==6){
                    tile.classList.add("tile_6")
                    return;
                }
                else if(minesAround==7){
                    tile.classList.add("tile_7")
                    return;
                }
                else if(minesAround==8){
                    tile.classList.add("tile_8")
                    return;
                }
            } 
            else {
                tile.classList.remove("hidden");
                return;
            }
}

function setDifficulty() {
    var difficultySelector = document.getElementById("difficulty");
    var difficulty = difficultySelector.selectedIndex;
    console.log(difficulty);
    // alert(difficulty);
    switch(difficulty) {
        case 0:
            globalGridSize =[9,9];
            globalMineNum = 10;
            //minecount = globalGridSize;
            console.log(globalMineNum);
            break;
        case 1:
            globalGridSize = [16,16];
            globalMineNum = 40;
            //minecount = globalGridSize;
            break;
        case 2:
            globalGridSize = [30,16];
            globalMineNum = 99;
            //minecount = globalGridSize;
            break;
        default:
            globalGridSize =[9,9];
            globalMineNum = 10;
            //minecount = globalGridSize;
    }
    //TODO implement me
}

function startTimer() {
    timeValue = 0;
    window.setInterval(onTimerTick, 1000);
}

function onTimerTick() {
    timeValue++;
    updateTimer();
}

function updateTimer() {
    document.getElementById("timer").innerHTML = timeValue;
}