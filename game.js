let canvas = document.getElementById("screen"); //getting element from index.html

let context = canvas.getContext('2d'); //rendering context

context.clearRect(0,0,800,600); //clears when update is made

context.fillStyle = 'green'; //sets color of rect
context.fillRect(20,20,100,100); //drawing the rect