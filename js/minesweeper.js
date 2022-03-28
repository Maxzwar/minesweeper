
var time = 0;
var globalbombnum = 0;
var globalgridsize = [9,9];



function buildGrid(difficulty) {
    //Set default difficulty
    setDifficulty();
    // Fetch grid and clear out old elements.
    var grid = document.getElementById("minefield");
    grid.innerHTML = "";

    var columns = globalgridsize[0];
    var rows = globalgridsize[1];

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

    //console.log(grid.childNodes);
    var tiles = grid.childNodes;

    //place mines
   
    for (var i = 0; i < globalbombnum; i++) {
        var bombIndex = Math.floor(Math.random() * (columns*rows))
        //tiles[bombIndex].classList.add("mine")
        //if (tiles[bombIndex].classList.contains("mine") ){
        if (checkIfMine(tiles[bombIndex]) ){
            console.log(checkIfMine(tiles[bombIndex]));
        } else { 

            tiles[bombIndex].classList.add("mine");
            tiles[bombIndex].setAttribute("data-isMine","true")
            //tiles[bombIndex].style.visibility = "hidden";
            //tiles[bombIndex].classList.add("hidden");
        }
        
    }

    
    // calculate bombs
    for (let i = 0; i < tiles.length; i++) {
        let total = 0
        let width = globalgridsize[0];
        let end = tiles.length;
        const leftEdge = i % width == 0;
        const rightEdge = i === width-1;
        if (!tiles[i].classList.contains('mine')) {
            if (i > 0 && !leftEdge && tiles[i-1].classList.contains("mine")) total++
            if (i > width && !rightEdge && tiles[i+1-width].classList.contains("mine")) total++
            if (i > width+1 && tiles[i - width].classList.contains("mine")) total++
            if(i > width+2 && !leftEdge && tiles[i-1-width].classList.contains("mine")) total ++
            if(i < end-1 && !rightEdge && tiles[i+1].classList.contains("mine")) total++
            if (i < end-width && !leftEdge && tiles[i -1+width].classList.contains("mine")) total++
            if(i<(end-width-1) && !rightEdge && tiles[i+1+width].classList.contains("mine")) total++
            if(i <end-width && tiles[i + width].classList.contains("mine")) total++
            tiles[i].setAttribute('data-count', total);
            
            
            
        } else{
            //console.log("bomb")
        }
        
    }
    console.log(grid);
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

function checkIfStringDoesNotEqualMine(str){
    return str!="mine";

}

function checkIfMine(tile){
    let mineValue = tile.getAttribute("data-isMine");
    return (mineValue === "true");
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
    // Left Click
    tile = event.target;
    
    if (event.which === 1) {
        //TODO reveal the tile
        //if (tile.classList.contains("mine")){
        if (checkIfMine(tile)){
            alert("game over");
            let smiley = document.getElementById("smiley")
            smiley.classList.add("face_lose");
            
        }
        else {
            console.log(tile);
            let minesnear = tile.getAttribute("data-count")
            console.log(minesnear);
            if (minesnear !=0) {
                if(minesnear==1){
                    tile.classList.add("tile_1");
                }
                else if(minesnear==2){
                    tile.classList.add("tile_2")
                }
                else if(minesnear==3){
                    tile.classList.add("tile_3")
                }
                else if(minesnear==4){
                    tile.classList.add("tile_4")
                }
                else if(minesnear==5){
                    tile.classList.add("tile_5")
                }
                else if(minesnear==6){
                    tile.classList.add("tile_6")
                }
                else if(minesnear==7){
                    tile.classList.add("tile_7")
                }
                else if(minesnear==8){
                    tile.classList.add("tile_8")
                }
                // switch(total){
                //     case 1: 
                //         tile.classList.add("tile_1");
                //         tile.classList.remove("hidden");
                //         break;
                //     case 2: 
                //         tile.classList.add("tile_2")
                //         tile.classList.remove("hidden");
                //         break;
                //     case 3: 
                //         tile.classList.add("tile_3")
                //         tile.classList.remove("hidden");
                //         break;
                //     case 4: 
                //         tile.classList.add("tile_4")
                //         tile.classList.remove("hidden");
                //         break;
                //     case 5: 
                //         tile.classList.add("tile_5")
                //         tile.classList.remove("hidden");
                //         break;
                //     case 6: 
                //         tile.classList.add("tile_6")
                //         tile.classList.remove("hidden");
                //         break;
                //     case 7: 
                //         tile.classList.add("tile_7")
                //         tile.classList.remove("hidden");
                //         break;
                //     case 8: 
                //         tile.classList.add("tile_8")
                //         tile.classList.remove("hidden");
                //         break;
                //     default:
                //         break;
                // }
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
        tile.classList.add('mine_marked');
        
    }
}

function setDifficulty() {
    var difficultySelector = document.getElementById("difficulty");
    var difficulty = difficultySelector.selectedIndex;
    console.log(difficulty);
    // alert(difficulty);
    switch(difficulty) {
        case 0:
            globalgridsize =[9,9];
            globalbombnum = 10;
            //bombcount = globalgridsize;
            console.log(globalbombnum);
            break;
        case 1:
            globalgridsize = [16,16];
            globalbombnum = 40;
            //bombcount = globalgridsize;
            break;
        case 2:
            globalgridsize = [30,16];
            globalbombnum = 99;
            //bombcount = globalgridsize;
            break;
        default:
            globalgridsize =[9,9];
            globalbombnum = 10;
            //bombcount = globalgridsize;
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