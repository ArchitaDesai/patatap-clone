// Array to keep track of circles
var circles = [];

// When key is pressed down
function onKeyDown(event){
	keyPressedCode = event.event.keyCode;
	if(keyPressedCode>=97 && keyPressedCode<=122)
		generateCirclesAndSound(keyPressedCode-96);
	else if(keyPressedCode>=65 && keyPressedCode<=90)
		generateCirclesAndSound(keyPressedCode-64);
}

function generateCirclesAndSound(n){
	// maxPoint will have size of the canvas, will be end point
	var maxPoint = new Point(view.size.width, view.size.height);
	// Point.random() generates point's X-Y values between 0 and 1
	var randomPoint = Point.random()*maxPoint;
	// 350 is radius
	var newCircle = new Path.Circle(randomPoint,350);
	newCircle.fillColor = generateRandomColor();

	/* howlerjs - play sound */
	new Howl({
		src: ['assets/sounds/' + n + '.mp3']
	}).play();

	circles.push(newCircle);
	
}

function generateRandomColor(){
	return 'rgb(' + Math.random()*256 + ',' + Math.random()*256 + ',' + Math.random()*256 + ')';
}

// Animation handler, to animate all circles
function onFrame(event){
	for (var i = 0; i < circles.length; i++) {
		// To animate its color
		circles[i].fillColor.hue += 1;
		// Circle's size will scale to 0.9 its original size
		// Hence, will decrement and fade eventually
		circles[i].scale(0.9);

		//remove the circle from array if it's faded
		if(circles[i].area < 1){
			circles[i].remove();
			circles.splice(i,1);
		}
	}
}
