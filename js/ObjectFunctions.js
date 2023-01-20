function drawLineBetweenObjects(object1Num, object2Num, colour){

	object1X = getCoordinateOfObject(object1Num)[0];
	object1Y = getCoordinateOfObject(object1Num)[1];
	
	object2X = getCoordinateOfObject(object2Num)[0];
	object2Y = getCoordinateOfObject(object2Num)[1];

	drawLine(object1X,object1Y, object2X,object2Y, colour);
}
function drawLineBetweenCoordinates(coordinate1, coordinate2, colour){
    drawLine(coordinate1[0],coordinate1[1], coordinate2[0],coordinate2[1], colour);
}

function distBetweenObjects(object1Num, object2Num) {
	
	//birdCoordianteList = getCoordinatesOfTwoObjects(object1Num, object2Num);

	object1X = getCoordinateOfObject(object1Num)[0];
	object1Y = getCoordinateOfObject(object1Num)[1];
	
	object2X = getCoordinateOfObject(object2Num)[0];
	object2Y = getCoordinateOfObject(object2Num)[1];

	
	distance = distBetweenPoints(object1X,object1Y, object2X,object2Y);

	return(distance);
}

function getAverageCoordinatesFromObjectList(objectList){
    let sumOfXCoordinates = 0;
    let sumOfYCoordinates = 0;
    let divider = objectList.length;

    
    for(z=0;z<objectList.length;z++){

        let objectNumber = objectList[z];
        
        let objectCoordinate = getCoordinateOfObject(objectNumber);

        sumOfXCoordinates += objectCoordinate[0];
        sumOfYCoordinates += objectCoordinate[1];
    }

    let averageXCoordinate = sumOfXCoordinates/divider;
    let averageYCoordinate = sumOfYCoordinates/divider;

    return([averageXCoordinate,averageYCoordinate]);
}

function getCoordinateOfObject(objectNum) {
	return(birdNames[objectNum].birdCoordinates())
}

function findNextPositionOfObject(birdNumber){
    return(birdNames[birdNumber].getNextBirdPosition());
}