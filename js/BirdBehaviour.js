//BIRD BEHAVIOUR
BIRD_GOLDILOCKS_ZONE = 0;
const GOLDILOCKS_ZONE_MAGNITUDE = 0.0;


//ALLIGNMENT FUNCTION

function allignment(object1Num, object2Num){

    var allignmentAngleChange = (document.getElementById("allignment").value) * (speed/6);
    
    
    bird1Vector = birdNames[object1Num].returnMoveVector();
    bird2Vector = birdNames[object2Num].returnMoveVector();


    angleDifference = findSmallestAngDifference(birdNames[object1Num].verticalAngle(), birdNames[object2Num].verticalAngle());


    birdNames[object1Num].addVector(bird2Vector[0],bird2Vector[1], allignmentAngleChange);
    birdNames[object1Num].addVector(bird1Vector[0],bird1Vector[1], allignmentAngleChange);

}

//SEPERATION FUNCTION

function separation(bird1Num, bird2Num, birdDistance){

    var separationAngleChange = (document.getElementById("separation").value) * (speed/2);

    if(birdDistance>separationDistance-BIRD_GOLDILOCKS_ZONE){
        var separationAngleChange = GOLDILOCKS_ZONE_MAGNITUDE;
    }

    let bird1Coordinates = getCoordinateOfObject(bird1Num);
    let bird2Coordinates = getCoordinateOfObject(bird2Num);

    birdNames[bird1Num].moveAwayFromCoordinate(bird2Coordinates, separationAngleChange);
    birdNames[bird2Num].moveAwayFromCoordinate(bird1Coordinates, separationAngleChange);
}

//COHESION FUNCTION

function cohesion(validBirdsList){
    var cohesionMagnitude = (document.getElementById("cohesion").value) * (speed/2);

    averageCoordinates = getAverageCoordinatesFromObjectList(validBirdsList);

    for(z=0;z<validBirdsList.length;z++){
        birdNumber = validBirdsList[z];
        
        birdCoordinates = getCoordinateOfObject(birdNumber);
        birdDistance = distBetweenCoordinates(birdCoordinates, averageCoordinates);

        if(birdDistance<separationDistance+BIRD_GOLDILOCKS_ZONE){
            var cohesionMagnitude = GOLDILOCKS_ZONE_MAGNITUDE;
        }

        birdNames[birdNumber].moveTowardCoordinate(averageCoordinates, cohesionMagnitude);
    }
}

angleChangeTester()

function angleChangeTester(){
    
    let testVector1 = new Victor( -1,1);
    testVector1.toString();

    let testVector2 = new Victor( 1,1);
    testVector2.toString();


    let angle1 = testVector1.verticalAngle();
    let angle2 = testVector2.verticalAngle();

    console.log(angle1*(180/Math.PI),angle2*(180/Math.PI));

    test1AngleDelta = findSmallestAngDifference(angle1, angle2);



    if(test1AngleDelta == (Math.PI/2)){
        console.log('angle test 1 PASSED');
    }else{
        console.log(test1AngleDelta);
    }

    let testVector3 = new Victor( 1,0);
    testVector3.toString();

    let testVector4 = new Victor( 0,1);
    testVector4.toString();


    let angle3 = testVector3.verticalAngle();
    let angle4 = testVector4.verticalAngle();

    test2AngleDelta = findSmallestAngDifference(angle3, angle4);

    if(test2AngleDelta == (Math.PI/2)){
        console.log('angle test 2 PASSED');
    }else{
        console.log(test2AngleDelta);
    }

}

function findSmallestAngDifference(angle1, angle2){
    
    //make all angles positive
    if(angle1 <0){
        angle1 = (2*Math.PI)- Math.abs(angle1);
    }
    if(angle2 <0){
        angle2 = (2*Math.PI)-  Math.abs(angle2);
    }


    //find difference in angles
    changeInAngle1 = Math.abs(angle1-angle2);


    alternativeDeltaAngle = (2*Math.PI)-changeInAngle1;


    if(changeInAngle1 > alternativeDeltaAngle){
        mainAngle = alternativeDeltaAngle;
    }else {
        mainAngle = changeInAngle1
    }

    return(mainAngle);
}