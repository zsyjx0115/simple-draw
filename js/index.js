var canvas=null;
var context=null;

window.onload = function(){
	canvas = document.getElementById("draw-canvas");
	context = canvas.getContext("2d");
	
	canvas.onmousedown = startDrawing;
	canvas.onmouseup = stopDrawing;
	canvas.onmouseout = stopDrawing;
	canvas.onmousemove = draw;
	context.strokeStyle = "#000";
	context.lineWidth = 1;
}

var isDrawing = false;

function startDrawing(event){
	isDrawing = true;
	context.beginPath();
	
	context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
}

function stopDrawing(event){
	isDrawing = false;
}

function draw(event){
	if(isDrawing){
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		
		context.lineTo(x, y);
		context.stroke();
	}
}

var previousColor = null;
function changeColor(color,element){
	if(previousColor != element){
		context.strokeStyle = color;
		element.className = "c-select";
		
		if(previousColor)
			previousColor.className = "";
		previousColor = element;
	}
}

var previousThick = null;
function changeThick(thick, element){
	if(previousThick != element){
		context.lineWidth = thick;
		element.className = "t-select";
		
		if(previousThick)
			previousThick.className = "";
		previousThick = element;
	}
}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas(){
	window.location = canvas.toDataURL();
}