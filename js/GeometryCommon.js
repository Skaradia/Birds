function distBetweenPoints(x1,y1, x2,y2) {// use pythagoras to find distance
	deltaX = x1-x2;
	deltaY = y1-y2;

	distance = Math.sqrt( Math.pow(deltaX, 2)+Math.pow(deltaY, 2) );// pythagoras

	return(Math.abs(distance));
}

function distBetweenCoordinates(coordinate1, coordinate2){
	return(distBetweenPoints(coordinate1[0],coordinate1[1], coordinate2[0],coordinate2[1]));
}

function cosineRuleAngle(a,b,c) {
    a2 = Math.pow(a,2);
    b2 = Math.pow(b,2);
    c2 = Math.pow(c,2);

    numerator = a2-b2-c2;
    denominator = -2*b*c;

    angleA = Math.acos(numerator/denominator);

    return(angleA);
}

function findAngleBetweenTwoPoints(coordinate1, coordinate2) {// finds angle of coordinate 1 from 2

    var fixedDistance = 1;// fixed distance in order to create triangle

    let coordinate3Y = coordinate2[1]+fixedDistance;
    let coordinate3 = [coordinate2[0],coordinate3Y];

    let distCoord1to2 = distBetweenCoordinates(coordinate1,coordinate2);
    let distCoord2to3 = distBetweenCoordinates(coordinate2,coordinate3); // constant distance
    let distCoord3to1 = distBetweenCoordinates(coordinate3,coordinate1);

    let angle= cosineRuleAngle(distCoord1to2, distCoord3to1, distCoord2to3);

    return(angle);
}