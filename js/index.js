var EventUtil = {
		addHandler:function(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}
			else if (element.attachEvent){
				element.attachEvent("on"+type, handler);
			}
			else{
				element["on"+type] = handler;
			}
		},
		removeHandler:function(element, type, handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);
			}
			else if (element.detachEvent){
				element.detachEvent("on"+type, handler);
			}
			else{
				element["on"+type] = null;
			}
		}
};
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
	
	var erase = document.getElementById("erase-little");
	var erase-select=0;
	EventUtil.addHandler(erase,"click",function(event){
		context.strokeStyle = "#fff";
		context.lineWidth = 1;
		if(erase-select != 1){
			var element=event.target;
			element.style.cssText = "border:1px solid grey";
			if(erase-select == 2){
				document.getElementById("erase-mid").style.cssText = "border:1px solid #000";
			}
			else if(erase-select == 3){
				document.getElementById("erase-big").style.cssText = "border:1px solid #000";
			}
			erase-select = 1;
		}
	});
	erase = document.getElementById("erase-mid");
	EventUtil.addHandler(erase,"click",function(){
		context.strokeStyle = "#fff";
		context.lineWidth = 10;
		if(erase-select != 2){
			var element=event.target;
			element.style.cssText = "border:1px solid grey";
			if(erase-select == 1){
				document.getElementById("erase-little").style.cssText = "border:1px solid #000";
			}
			else if(erase-select == 3){
				document.getElementById("erase-big").style.cssText = "border:1px solid #000";
			}
			erase-select = 2;
		}
	});
	erase = document.getElementById("erase-big");
	EventUtil.addHandler(erase,"click",function(){
		context.strokeStyle = "#fff";
		context.lineWidth = 20;
		if(erase-select != 3){
			var element=event.target;
			element.style.cssText = "border:1px solid grey";
			if(erase-select == 2){
				document.getElementById("erase-mid").style.cssText = "border:1px solid #000";
			}
			else if(erase-select == 1){
				document.getElementById("erase-little").style.cssText = "border:1px solid #000";
			}
			erase-select = 3;
		}
	});
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
