let canvas = document.getElementById("screen"); //getting element from index.html

let context = canvas.getContext('2d'); //rendering context

context.clearRect(0,0,800,600); //clears when update is made

context.fillStyle = 'green'; //sets color of rect
context.fillRect(20,20,100,100); //drawing the rect

var MAZEX = 32;
var MAZEY = 24;

function newMaze(){
    var maze = new Array(MAZEY);
    for(let i = 0;i<MAZEY;i++){
        maze[i] = new Array(MAZEX);
    }
    var area = MAZEX * MAZEY
    var pathtiles = area/2
    for(let i = 0;i<pathtiles;i++){
        var randx = Math.floor(Math.random() * MAZEX);
        var randy = Math.floor(Math.random() * MAZEY);
        maze[randy][randx] = "x";
    }
    for(let y = 0;y<MAZEY;y++){
        for(let x=0;x<MAZEX;x++){
            if((!maze[y][x]) || maze[y][x] !== "x"){
                maze[y][x] = '+';
            }
        }
    }
    var hasblocks = true;
    while(hasblocks){
    	hasblocks = false;
    	for(let y = 1;y<MAZEY-1;y++){
        	for(let x=1;x<MAZEX-1;x++){
            	blockCount = 0;
                if(maze[y][x] == "+"){
                	blockCount+=1;
                }
                if(maze[y-1][x] == "+"){
                	blockCount+=1;
                }
                if(maze[y][x-1] == "+"){
                	blockCount+=1;
                }
                if(maze[y-1][x-1] == "+"){
                	blockCount+=1;
                }
            	if(blockCount == 0){
            		hasblocks = true;
            		var del = Math.floor((Math.random() * 4));
            		switch(del){
                    	case 0:
                   		maze[y][x] = "+";
                    	break;
                    case 1:
                    	maze[y-1][x] = "+";
                    	break;
                    case 2:
                    	maze[y][x-1] = "+";
                    	break;
                    case 3:
                    	maze[y-1][x-1] = "+";
                    	break;
              		}
                    blockCount++;
              	}
				if(blockCount == 4){
                  	hasblocks = true;
                  	var del = Math.floor((Math.random() * 4));
                	switch(del){
                      case 0:
                          maze[y][x] = "x";
                          break;
                      case 1:
                          maze[y-1][x] = "x";
                          break;
                      case 2:
                          maze[y][x-1] = "x";
                          break;
                      case 3:
                          maze[y-1][x-1] = "x";
                          break;
					}
					blockCount -=1;
				}
                if(maze[y][x] == "+"){
                	var pathCount = 0;
                	if(maze[y+1][x] == "+"){
                		pathCount+=1;
                	}
                	if(maze[y-1][x] == "+"){
                		pathCount+=1;
                	}
                	if(maze[y][x-1] == "+"){
                		pathCount+=1;
                	}
                	if(maze[y][x+1] == "+"){
                		pathCount+=1;
                	}
                	if(pathCount == 1){
						hasblocks = true;
            			var del = Math.floor((Math.random() * 4));
            			switch(del){
                    		case 0:
                            	if(maze[y+1][x] == "x"){
                   					maze[y+1][x] = "+";
                                }else{
                                	maze[y-1][x] = "+";
                                }
                    			break;
                    		case 1:
                            	if(maze[y-1][x] == "x"){
                   					maze[y-1][x] = "+";
                                }else{
                                	maze[y+1][x] = "+";
                                }
                    			break;
                    		case 2:
                            	if(maze[y][x+1] == "x"){
                   					maze[y][x+1] = "+";
                                }else{
                                	maze[y][x-1] = "+";
                                }
                    			break;
                    		case 3:
                            	if(maze[y][x-1] == "x"){
                   					maze[y][x-1] = "+";
                                }else{
                                	maze[y][x+1] = "+";
                                }
                    			break;
              			}
                    }
                }
			}
		}
    }
    /*
    for(let i=0;i<MAZEX;i++){
    	maze[0][i]="x";
        maze[MAZEY-1][i]= "x";
    }
    for(let i = 0;i<MAZEY;i++){
    	maze[i][0]="x";
        maze[i][MAZEX-1]= "x";
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

maze= newMaze();
printMaze(maze);