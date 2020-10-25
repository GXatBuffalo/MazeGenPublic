let canvas = document.getElementById("screen"); //getting element from index.html

let context = canvas.getContext('2d'); //rendering context

context.clearRect(0,0,800,600); //clears when update is made

context.fillStyle = 'green'; //sets color of rect
context.fillRect(20,20,100,100); //drawing the rect

var MAZEX = 32; //how wide the maze is in terms of blocks
var MAZEY = 24; //height of the maze

function newMaze(){
    var maze = new Array(MAZEY); //making a 2d array
    for(let i = 0;i<MAZEY;i++){
        maze[i] = new Array(MAZEX);
    }
    var area = MAZEX * MAZEY
    var pathtiles = area/2
    for(let i = 0;i<pathtiles;i++){  //populating roughly half the maze with "walls"
        var randx = Math.floor(Math.random() * MAZEX);
        var randy = Math.floor(Math.random() * MAZEY);
        maze[randy][randx] = "■";
    }
    for(let y = 0;y<MAZEY;y++){ // any place that is not a "wall" will be marked as a "path"
        for(let x=0;x<MAZEX;x++){
            if((!maze[y][x]) || maze[y][x] !== "■"){
                maze[y][x] = "□";
            }
        }
    }
    var hasblocks = true;
    while(hasblocks){ //while the maze is not in a "stable" iteration (one where no changes needs to be made)
    	hasblocks = false;
    	for(let y = 1;y<MAZEY-1;y++){ 
        	for(let x=1;x<MAZEX-1;x++){ //for each block in the 2d array (not counting the sides)
            	blockCount = 0; //this basically tells us there is a 2x2 block of wall or path when it is 0 or 4
                if(maze[y][x] == "□"){ // this and the next three statements count path blocks
                	blockCount+=1;
                }
                if(maze[y-1][x] == "□"){
                	blockCount+=1;
                }
                if(maze[y][x-1] == "□"){
                	blockCount+=1;
                }
                if(maze[y-1][x-1] == "□"){
                	blockCount+=1;
                }
            	if(blockCount == 0){ //2x2 block of wall detected
            		hasblocks = true; //a change has been made, so this iteration of maze is unstable.
            		var del = Math.floor((Math.random() * 4)); //randomly choose one of the 2x2 to change to path
            		switch(del){
                    	case 0:
                   		maze[y][x] = "□";
                    	break;
                    case 1:
                    	maze[y-1][x] = "□";
                    	break;
                    case 2:
                    	maze[y][x-1] = "□";
                    	break;
                    case 3:
                    	maze[y-1][x-1] = "□";
                    	break;
              		}
                    blockCount++;
              	}
				if(blockCount == 4){ //2x2 block of path detected
                  	hasblocks = true;//a change has been made, so this iteration of maze is unstable.
                  	var del = Math.floor((Math.random() * 4)); //randomly choose one of the 2x2 to change to wall
                	switch(del){
                      case 0:
                          maze[y][x] = "■";
                          break;
                      case 1:
                          maze[y-1][x] = "■";
                          break;
                      case 2:
                          maze[y][x-1] = "■";
                          break;
                      case 3:
                          maze[y-1][x-1] = "■";
                          break;
					}
					blockCount -=1;
				}
                if(maze[y][x] == "□"){//if the current block is a path
                	var pathCount = 0; // count how many adjacent paths with the next four if statements
                	if(maze[y+1][x] == "□"){
                		pathCount+=1;
                	}
                	if(maze[y-1][x] == "□"){
                		pathCount+=1;
                	}
                	if(maze[y][x-1] == "□"){
                		pathCount+=1;
                	}
                	if(maze[y][x+1] == "□"){
                		pathCount+=1;
                	}
                	if(pathCount == 1 || pathCount == 0 ){ //if only one path detected
						hasblocks = true;
            			var del = Math.floor((Math.random() * 4));//choose one random wall to make path
            			switch(del){
                    		case 0:
                            	if(maze[y+1][x] == "■"){
                   					maze[y+1][x] = "□";
                                }else{
                                	maze[y-1][x] = "□";
                                }
                    			break;
                    		case 1:
                            	if(maze[y-1][x] == "■"){
                   					maze[y-1][x] = "□";
                                }else{
                                	maze[y+1][x] = "□";
                                }
                    			break;
                    		case 2:
                            	if(maze[y][x+1] == "■"){
                   					maze[y][x+1] = "□";
                                }else{
                                	maze[y][x-1] = "□";
                                }
                    			break;
                    		case 3:
                            	if(maze[y][x-1] == "■"){
                   					maze[y][x-1] = "□";
                                }else{
                                	maze[y][x+1] = "□";
                                }
                    			break;
              			}
                    }
                }
			}
		}
    }
    /*
    for(let i=0;i<MAZEX;i++){ //loop to make the edges all walls
    	maze[0][i]="■";
        maze[MAZEY-1][i]= "■";
    }
    for(let i = 0;i<MAZEY;i++){
    	maze[i][0]="■";
        maze[i][MAZEX-1]= "■";
    }
    */
    return maze;
}

function printMaze(maze){
    for(let y = 0;y<MAZEY;y++){
        for(let x=0;x<MAZEX;x++){
            document.write(maze[y][x]);
            document.write(" ");
        }
        document.write("<br>");
    }
}


var Pacman = { //Pacman's numbers and number altering methods
	coordX: Math.floor(Math.random() * MAZEX), //current x coord
	coordY: Math.floor(Math.random() * MAZEY), //current y coord
	oldX: 0, // previous x coord
    oldY: 0, // previous y coord
    randLoc: function(){ // randomly puts pacman on a path, only call at start of round please.
    	this.oldX = this.coordX;
        this.oldY = this.coordY;
    	while(maze[this.coordY][this.coordX] == "■"){
        	this.oldX = this.coordX;
        	this.oldY = this.coordY;
			this.coordX = Math.floor(Math.random() * MAZEX);
			this.coordY = Math.floor(Math.random() * MAZEY);
        }
    },
    updateOld: function(){ //updates pacman's previous location. update every 2-3 sec maybe.
    	this.oldX = this.coordX;
        this.oldY = this.coordY;
    },
    dirX: function(){ //detects direction pacman is going. used for the ghosts inky and pinky
    	return this.coordX*2-this.oldX;
    },
	dirY: function(){
    	return this.coordY*2-this.oldY;
    }
}

var Blinky = { // red ghost numbers and stuff
	coordX: Math.floor(Math.random() * MAZEX), 
	coordY: Math.floor(Math.random() * MAZEY),
	targetX: 0, // x coord that Blinky wants to go (its gonna be where Pacman is right now)
    targetY: 0, // y coord Blinky wants to go.
    randLoc: function(){ // sets Blinky on a random path tile. only call at beginning of round.
    	while(maze[this.coordY][this.coordX] == "■"){
			this.coordX = Math.floor(Math.random() * MAZEX);
			this.coordY = Math.floor(Math.random() * MAZEY);
        }
    },
    setTarget: function(){ //sets Blinky's target to Pacman's current location
    	this.targetX = Pacman.coordX;
        this.targetY = Pacman.coordY;
    }

}

var Inky = { // Blue Ghost.
	coordX: Math.floor(Math.random() * MAZEX),
	coordY: Math.floor(Math.random() * MAZEY),
	targetX: 0, //x coord where Inky wants to go
    targetY: 0,
    randLoc: function(){ // sets Inky's starting location
    	while(maze[this.coordY][this.coordX] == "■"){
			this.coordX = Math.floor(Math.random() * MAZEX);
			this.coordY = Math.floor(Math.random() * MAZEY);
        }
    },
    setTarget: function(){ // sets Inky on the other side of Blinky to catch pacman
    	dirX = Pacman.dirX()*2 - Blinky.targetX;
        dirY= Pacman.dirY()*2 - Blinky.targetY;
        if(dirX < 0 || dirY < 0 || dirX >=MAZEX || dirY >= MAZEY){ //makes sure the target location is not outside the array/maze
			var xFactor = 0;
            var yFactor = 0;
            if(dirX < 0){
            	xFactor = 1;
                dirX = 0;
            }
            if(dirY < 0){
            	yFactor = 1;
                dirY = 0;
            }
            if(dirX >= MAZEX){
            	xFactor = -1
                dirX = MAZEX-1
            }
            if(dirY >= MAZEY){
            	yFactor = -1
                dirY = MAZEY-1
            }
            while(maze[dirY][dirX] == "■"){
            	dirX += Math.floor(Math.random()) * xFactor;
                dirY += Math.floor(Math.random()) * yFactor;
            }
            
            
        }
        this.targetX = dirX;
        this.targetY = dirY;
    },
    targetPac: function(){ // set path on course to just chase pacman directly
        this.targetX = Pacman.coordX;
        this.targetY = Pacman.coordY;
    }
}

var Pinky = { //pink ghost, tries to go where pacman is currently heading.
	coordX: Math.floor(Math.random() * MAZEX),
	coordY: Math.floor(Math.random() * MAZEY),
	targetX: 0,
    targetY: 0,
    randLoc: function(){
    	while(maze[this.coordY][this.coordX] == "■"){
			this.coordX = Math.floor(Math.random() * MAZEX);
			this.coordY = Math.floor(Math.random() * MAZEY);
        }
    },
    setTarget: function(){
    	dirX = Math.floor(Pacman.dirX()*1.6);
        dirY= Math.floor(Pacman.dirY()*1.6);
        if(dirX < 0 || dirY < 0 || dirX >=MAZEX || dirY >= MAZEY){
			var xFactor = 0;
            var yFactor = 0;
            if(dirX < 0){
            	xFactor = 1;
                dirX = 0;
            }
            if(dirY < 0){
            	yFactor = 1;
                dirY = 0;
            }
            if(dirX >= MAZEX){
            	xFactor = -1
                dirX = MAZEX-1
            }
            if(dirY >= MAZEY){
            	yFactor = -1
                dirY = MAZEY-1
            }
            while(maze[dirY][dirX] == "■"){
            	dirX += Math.floor(Math.random()) * xFactor;
                dirY += Math.floor(Math.random()) * yFactor;
            }
            
            
        }
        this.targetX = dirX;
        this.targetY = dirY;
    },
    targetPac: function(){
        this.targetX = Pacman.coordX;
        this.targetY = Pacman.coordY;
    }
}


document.write("<br>"); //these are all debugging prints
maze= newMaze();
printMaze(maze);
document.write("<br>");

Pacman.randLoc()
document.write("Pacman coord: " + Pacman.coordX + "  " + Pacman.coordY + "<br>");//these are all debugging prints
document.write("Pacman oldcoord: " + Pacman.oldX + "  " + Pacman.oldY + "<br>");

Blinky.randLoc();
Blinky.setTarget();
document.write("Blinky coord: " + Blinky.coordX + "  " + Blinky.coordY + "<br>");
document.write("Blinky target: " + Blinky.targetX + "  " + Blinky.targetY + "<br>");

Inky.randLoc();
Inky.setTarget();
document.write("Inky coord: " + Inky.coordX + "  " + Inky.coordY + "<br>");
document.write("Inky target: " + Inky.targetX + "  " + Inky.targetY + "<br>");//these are all debugging prints

Pinky.randLoc();
Pinky.setTarget();
document.write("Pinky coord: " + Pinky.coordX + "  " + Pinky.coordY + "<br>");
document.write("Pinky target: " + Pinky.targetX + "  " + Pinky.targetY + "<br>");//these are all debugging prints

