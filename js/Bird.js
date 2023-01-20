//BIRD CLASS


//bird picture
var birdPic = document.createElement("img");
birdPic.src = "images/starling.png";


const PHYSICAL_EDGE = 0;//5;//Math.PI/16;

const EDGE_DISTANCE = 100;

const SPEED = 6;
const MOVE_AWAY = SPEED/3;



class bird{
    
    constructor() {
        this.speed = SPEED;
        
        this.x = 0;
        this.y = 0;

        this.birdMoveVector = new Victor((Math.random()) * 2 - 1,(Math.random()) * 2 - 1);
        this.birdMoveVector.toString();

        this.targetCoordinates = [];
    }// end of constructor

    reset() {

        this.x = Math.floor(Math.random() * (canvas.width-EDGE_DISTANCE) + EDGE_DISTANCE);
        this.y = Math.floor(Math.random() *  (canvas.height-EDGE_DISTANCE) + EDGE_DISTANCE);
        this.ang = Math.random() * 2*Math.PI;

    }// end of reset

    move(){

        this.checkIfNearWalls();

        this.birdMoveVector.normalize();
        this.birdMoveVector.multiplyScalar(SPEED);


        this.x = this.x+this.birdMoveVector.x;
        this.y = this.y+this.birdMoveVector.y;

        this.ang = this.birdMoveVector.angle() - Math.PI/2;


    }// end of move

    birdCoordinates() {
        this.coordinates = [this.x,this.y];
        return(this.coordinates);
    }

    horizontalAngle() {
        return(this.birdMoveVector.horizontalAngle());
    }
    verticalAngle(){
        return(this.birdMoveVector.verticalAngle());
    }

    getNextBirdPosition(){
        this.nextX = this.x + (Math.cos(this.ang) * this.speed);
        this.nextY = this.y + (Math.sin(this.ang) * this.speed);
        return([this.nextX,this.nextY]);
    }

    draw(){
        //colourCircle(this.x, this.y, 4 , 'white')
        drawBitmapCentredWithRotation(birdPic, this.x,this.y, this.ang+Math.PI/2);//+Math.PI/2); //draw bird
    }

    moveAwayFromCoordinate(coordinate, force){

        this.awayDeltaX = coordinate[0]-this.x;
        this.awayDeltaY = coordinate[1]-this.y;

        let moveAwayVector = new Victor(this.awayDeltaX, this.awayDeltaY);
        moveAwayVector.toString();
        moveAwayVector.normalize()
        moveAwayVector.multiplyScalar(force);

        this.birdMoveVector.subtract(moveAwayVector);
    }

    moveTowardCoordinate(coordinate, force){

        this.awayDeltaX = coordinate[0]-this.x;
        this.awayDeltaY = coordinate[1]-this.y;

        let moveAwayVector = new Victor(this.awayDeltaX, this.awayDeltaY);
        moveAwayVector.toString();
        moveAwayVector.normalize()
        moveAwayVector.multiplyScalar(force);

        this.birdMoveVector.add(moveAwayVector);
    }

    rotate(angle){
        if(this.nearWalls){
            return;
        }
        this.birdMoveVector.rotate(angle);

    }
    addVector(i,j, magnitude){
        
        if(this.nearWalls){
            return;
        }

        let addedVector = new Victor(i,j);
        addedVector.toString();
        addedVector.normalize();
        
        this.previousVector = this.birdMoveVector;

        addedVector.multiplyScalar(magnitude);

        this.birdMoveVector.add(addedVector);
        this.birdMoveVector.normalize();
        this.birdMoveVector.multiplyScalar(SPEED);  
    }
    
    returnMoveVector(){
        return( [this.birdMoveVector.x, this.birdMoveVector.y] );
    }

    checkIfNearWalls(){

        if(this.x < EDGE_DISTANCE) { // left of screen
            
            if(this.x <= PHYSICAL_EDGE){
                this.x = PHYSICAL_EDGE;
            }
            this.targetCoordinates = [-EDGE_DISTANCE, this.y];
            this.moveAwayFromCoordinate(this.targetCoordinates,MOVE_AWAY);

        }else if(this.x >= canvas.width-EDGE_DISTANCE){// right of screen
            
            if(this.x  > canvas.width+PHYSICAL_EDGE){
                this.x = canvas.width+PHYSICAL_EDGE;    
            }

            this.targetCoordinates = [canvas.width+EDGE_DISTANCE, this.y];
            this.moveAwayFromCoordinate(this.targetCoordinates,MOVE_AWAY);


        }else if(this.y < EDGE_DISTANCE) {// top of screen
            
            if(this.y <= PHYSICAL_EDGE){
                this.y = PHYSICAL_EDGE;
            }

            this.targetCoordinates = [this.x, -EDGE_DISTANCE];
            this.moveAwayFromCoordinate(this.targetCoordinates,MOVE_AWAY);

        }else if(this.y > canvas.height-EDGE_DISTANCE){ // bottom of screen
            
            if(this.y >= canvas.height-PHYSICAL_EDGE){
                this.y = canvas.height-PHYSICAL_EDGE;
            }

            this.targetCoordinates = [this.x, canvas.height+EDGE_DISTANCE];
            this.moveAwayFromCoordinate(this.targetCoordinates,MOVE_AWAY);
        }     
    }
}//end of bird class

