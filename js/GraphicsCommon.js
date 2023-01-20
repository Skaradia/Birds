//DRAW SHAPE FUNCTIONS

function drawBitmapCentredWithRotation(useBitmap, atX,atY, withAng) { //draw image
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function colourRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) { //draw rectangle
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colourCircle(centerX,centerY, radius, fillColor) { //draw Circle
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colourText(showWords, textX,textY, fillColor) { //draw text
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function drawHitPoints(whichObject,radius,colour) {
	colourCircle(whichObject.x,whichObject.y, radius,  colour )

    colourCircle(whichObject.frontX,whichObject.frontY, radius,  colour )
    colourCircle(whichObject.rearX,whichObject.rearY, radius,  colour )


	colourCircle(whichObject.nextFrontXRight,whichObject.nextFrontYRight, 3,  'HotPink' )
    colourCircle(whichObject.nextFrontXLeft,whichObject.nextFrontYLeft, 3,  'HotPink' )

	colourCircle(whichObject.nextRearXLeft,whichObject.nextRearYLeft, 3,  'HotPink' )
    colourCircle(whichObject.nextRearXRight,whichObject.nextRearYRight, 3,  'HotPink' )


}
function drawLine(startX,startY,endX,endY,colour){//draw line function

	canvasContext.beginPath();
	canvasContext.moveTo(startX, startY);
	canvasContext.lineTo(endX, endY);
	canvasContext.strokeStyle = colour;
	canvasContext.stroke();
	
}

function drawLineBetweenCoordinates(coordinate1, coordinate2, colour) {
	x1 = coordinate1[0];
	y1 = coordinate1[1];
	
	x2 = coordinate2[0];
	y2 = coordinate2[1];

	drawLine(x1,y1, x2,y2, colour);
}