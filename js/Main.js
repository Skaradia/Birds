//MAIN

var canvas, canvasContext;

var numberOfBirds = 0;

var  seperationDistance = 25;
var newNumberofBirds;

const BIRD_SIGHT_DISTANCE = 100;

const MIN_NUMBER_OF_BIRDS = 0;
const MAX_NUMBER_OF_BIRDS = 30;

const BACKGROUND_COLOUR = 'DarkSlateGrey';

var mouseX = 0;
var mouseY = 0;

var behaviourButton;

var birdNames = [];

var backgroundPic = document.createElement("img");
backgroundPic.src = "images/sky.jpg";



while (birdNames.length<numberOfBirds) { //make bird names
	const birds = new bird();
	birdNames.push(birds);
}


window.onload = function(){	
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mousedown',handleMouseClick);


	for (let i=0;i<birdNames.length;i++) {// reset all birds
		birdNames[i].reset();

	}
	
	var framesPerSecond = 20;
	setInterval(updateAll, 1000/framesPerSecond);

}



function updateMousePos(evt) {
    
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left-root.scrollLeft;
    mouseY = evt.clientY - rect.left-root.scrollTop;
} // end of mouse controls

function handleMouseClick(evt) {
	console.log('mouse down')
}


function updateAll(){
	drawEverything();

	changeNumberOfBirds();

	birdBehaviour();
	
	for (let i=0;i<birdNames.length;i++) { // draw and move all birds
		birdNames[i].move();
		birdNames[i].draw();
	}
}



function birdBehaviour() {

	seperationDistance = (document.getElementById("SeperaionDistance").value);

	for(i=0;i<birdNames.length;i++){	

		var validBirds = [];
		for (j=0;j<birdNames.length;j++) {
		
			const DISTANCE_BETWEEN_BIRDS = distBetweenObjects(i,j);
			let lineColour;

			if(i!=j) {
				if (DISTANCE_BETWEEN_BIRDS <= BIRD_SIGHT_DISTANCE) {
				
					if(DISTANCE_BETWEEN_BIRDS <= seperationDistance){//bird is too close
						seperation(i,j,DISTANCE_BETWEEN_BIRDS);
						lineColour = 'yellow';
					}else if(DISTANCE_BETWEEN_BIRDS > seperationDistance){

						allignment(i,j);
						validBirds.push(j);
						lineColour = 'red';
					}
					//drawLineBetweenObjects(i, j,lineColour);
				}
			}
		}
		if(validBirds.length>1){
			cohesion(validBirds);
		}
	}		
}


function drawEverything() {	
	drawBitmapCentredWithRotation(backgroundPic, canvas.width/2,canvas.height/2, 0);	//draws background image
}

function changeNumberOfBirds(){
	//get current number of birds
	let newNumberofBirds = Number(document.getElementById("numberOfBirdsSlider").value);//Number(document.getElementById("numberOfBirds").value);


	//make sure number of birds added or subtracted is not excessive
	if(newNumberofBirds>MAX_NUMBER_OF_BIRDS){
		newNumberofBirds = MAX_NUMBER_OF_BIRDS;
	}else if(newNumberofBirds<MIN_NUMBER_OF_BIRDS){
		newNumberofBirds = MIN_NUMBER_OF_BIRDS;
	}
	


	if(newNumberofBirds > numberOfBirds){ // if birds are added
		
		let addedBirds = Math.abs(newNumberofBirds - numberOfBirds);
		
		for(i=0;i<addedBirds;i++){
			const birds = new bird();
			birdNames.push(birds);

			birdNames[birdNames.length-1].reset();
		}
		
	}
	if(newNumberofBirds < numberOfBirds){ //if birds are removed
		
		let subtractedBirds = Math.abs(newNumberofBirds - numberOfBirds);
		
		for(i=0;i<subtractedBirds;i++){
			birdNames.pop();// removes last bird from array
		}
	}

	numberOfBirds = newNumberofBirds;
}