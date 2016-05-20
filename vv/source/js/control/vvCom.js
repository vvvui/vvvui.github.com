$(function( window ) {
	console.log(vv);
	console.log($("#a1"));
	console.log($("#a2"));
	var eo = {};
	var eo2 = {};
	
	
	
	$("#a2,#a1").vvAnimate({
		left : 300,
		top  : 400,
		rotateY : 360,
		//rotateX : 360,
		//rotateZ : 360,
		opacity : 0.1,
		scale   : 0.8,
		width   : 300,
		height  : 300,
		color   : "#000000",
		'background-color' : "#00ffee",
		'border-radius' : 300
	},function(){
		$("#a2").vvAnimate({
			left : 0,
			top  : 0,
			rotateY : 0,
			rotateX : 0,
			rotateZ : 0,
			opacity : 1,
			scale   : 1,
			width   : 100,
			height  : 100,
			color   : "#ff0000",
			'background-color' : "#ffeedd",
			'border-radius' : 0
		});
		$("#a1").vvAnimate({
			left : 100,
			top  : 100,
			rotateY : 0,
			rotateX : 0,
			rotateZ : 0,
			opacity : 1,
			scale   : 1,
			width   : 150,
			height  : 150,
			color   : "#ff0000",
			'background-color' : "#ffeedd",
			'border-radius' : 0
		});
	},{
		acTime : 3000,
		delay  : 1000,
		loop   : 3,
		tween  : 11
	},eo);
	
	
	
	setTimeout(function(){
		// clearInterval(eo.animate);
	},1100);
	
	eo.touchStart = function (e){
		var pos = vv.event.getPosition(e);
		console.log(pos);
	}
	eo.touchMove = function (){
		// console.log(2);
	}
	eo.touchEnd = function (){
		console.log(3);
	}
	eo2.touchStart = function (e){
		console.log(4);
	}
	eo2.touchMove = function (){
		// console.log(2);
	}
	eo2.touchEnd = function (){
		console.log(5);
	}
	eo.a1 = function (e){
		console.log(e);
	}
	
	$("#a1").touchGroup(eo);
	// $("#a1").touch(eo.a1);
	// $("#a1").touch(eo.a3);
	
});