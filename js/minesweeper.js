
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

    
    // Calculate mines surrounding each tile
    for (let i = 0; i < tiles.length; i++) {
        let sum = 0
        
        let width = globalGridSize[0];
        let end = tiles.length;
        const farLeftCol = (i % width === 0);
        const farRightCol = (i % width === width-1);

        // check no mine
        if  (!checkIfMine(tiles[i])) {
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
        } else{}
        
    }
    //console.log(grid);
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

function calculateMine(tiles) {
    for (let i = 0; i < tiles.length; i++) {
        let sum = 0
        
        let width = globalGridSize[0];
        let end = tiles.length;
        const farLeftCol = (i % width === 0);
        const farRightCol = (i % width === width-1);

        // check no mine
        if  (!checkIfMine(tiles[i])) {
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
        } else{}
        return tiles;
    }
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
    
    tile = event.target;
    

    

    // Left Click
    if (event.which === 1) {
        if(clicks == 0 && checkIfMine(tile)){
            tile.setAttribute("data-ismine","false");
            calculateMines(tile);
            
        }
        clicks++;
        //TODO reveal the tile
        if (checkIfMine(tile)){
            tile.classList.add("mine");
            alert("game over");
            let smiley = document.getElementById("smiley")
            smiley.classList.add("face_lose");
            
        }
        else {
            console.log(tile);
            let minesNear = tile.getAttribute("data-count")
            console.log(minesNear);
            if (minesNear !=0) {
                if(minesNear==1){
                    tile.classList.add("tile_1");
                }
                else if(minesNear==2){
                    tile.classList.add("tile_2")
                }
                else if(minesNear==3){
                    tile.classList.add("tile_3")
                }
                else if(minesNear==4){
                    tile.classList.add("tile_4")
                }
                else if(minesNear==5){
                    tile.classList.add("tile_5")
                }
                else if(minesNear==6){
                    tile.classList.add("tile_6")
                }
                else if(minesNear==7){
                    tile.classList.add("tile_7")
                }
                else if(minesNear==8){
                    tile.classList.add("tile_8")
                }
            } 
            else {
                tile.classList.remove("hidden");
            return;
            }
        }
    }
    // Right Click
    else if (event.which === 3) { 
        //TODO toggle a tile flag
        //tile.classlist.remove("mine");
        tile.classList.toggle('mine_marked');
        
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