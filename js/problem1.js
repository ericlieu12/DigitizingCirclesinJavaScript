
//global variables
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
//canvas context is what we are drawing with
var radius= 0;
var centerX = 0;
var centerY = 0;
//global variables to draw circle, you would need center and radius
var isDrawingCircle = false;
var maxPointDistance = 0
var minPointDistance = 50000

redrawGrid() 
var startDrawCircle = function(event){
  //centerX and centerY set to mouse position
  centerX = event.clientX;
  centerY = event.clientY;
  radius = 0;
  //variable checked to make sure circle is being drawn only on drag
  isDrawingCircle = true;
  
}

function redrawGrid(blueSquares) {
    //blueSquares is when there are blue squares highlighted to represent circle
    context.clearRect(0,0,canvas.width, canvas.height)
    for (var i = 0; i < 400; i= i + 20)
    {
        for (var j = 0; j < 400; j = j + 20)
        {
            //#region for highlighting points
            if (typeof blueSquares !== 'undefined')
            {
                //if blueSquares has i and j, fill it with blue
                var contains = blueSquares.some(elem =>{
                    return JSON.stringify({x: i, y: j}) === JSON.stringify(elem);
                      });
                    if (contains)
                    {
                       
                            context.fillStyle = "#0000FF"
                            context.fillRect(i, j, 10, 10)
                       
                        
                    }
                    else
                    {
                        //otherwise black
                        
                        context.fillStyle = "#000000"
                        context.fillRect(i, j, 10, 10)
                    }
                    
            }
            else
                    {
                        //#endregion
                        //fill it with black
                        context.fillStyle = "#000000"
                        context.fillRect(i, j, 10, 10)
                    }
            
           

        }
    }
}
var whileDrawCircle = function(event){
  if(!isDrawingCircle)
    return;
  var changeX = centerX - event.clientX;
  var changeY = centerY - event.clientY;
  //find new radius and redraw circle
  radius = Math.sqrt(changeX * changeX + changeY * changeY)
  redrawGrid() 
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI*2);
  context.stroke();
}



var endDrawCircle = function(e){

    var squaresToRepresentCircle =[]
    
    var maxPointDistance = 0
    var minPointDistance = 50000
  
  
  var factor = (Math.PI * radius)/ 10
  for (var i = 0; i < 360; i = i +(360/factor))
  {
    //find nearest dots and find farthest edge of two circles
    var rad = (i % 360) * Math.PI / 180;
    var x = centerX + radius * Math.cos(rad);
    var y = centerY + radius * Math.sin(rad);
    var nearestPoint = findNearestPoint(x,y);
    
    
    //all possible edge coordinates
    deltaX = [centerX - (nearestPoint.x + 10), centerX - (nearestPoint.x + 0), centerX - (nearestPoint.x + 10), centerX - (nearestPoint.x + 0)]
    deltaY = [centerY - (nearestPoint.y + 10), centerY - (nearestPoint.y + 0), centerY - (nearestPoint.y + 0), centerY - (nearestPoint.y + 10)]
    
    //finds distances to and from the center of the circle
    distances = [Math.sqrt(deltaX[0] * deltaX[0] + deltaY[0] * deltaY[0]), Math.sqrt(deltaX[1] * deltaX[1] + deltaY[1] * deltaY[1])
    ,Math.sqrt(deltaX[2] * deltaX[2] + deltaY[2] * deltaY[2]), Math.sqrt(deltaX[3] * deltaX[3] + deltaY[3] * deltaY[3])]
    
    
    //max is maximum, min is minumum 
    var maxDistance = Math.max(...distances)
    //max distance represents farthest end from the center on this square
    var minDistance = Math.min(...distances)
    //min distance represents least farthest end from the center on this square

    //these are candidates for where the circle of biggest radius and least radius will encircle
    //these are then compared to the current candidate
    //if max or min is greater than or less than current max or min, set them to that
    if (maxDistance > maxPointDistance)
    {  
        maxPointDistance = maxDistance    
    }
    if (minDistance < minPointDistance)
    {        
        minPointDistance = minDistance
       
        
        
    }
    //push point to array that stores squares to represent
    squaresToRepresentCircle.push({x: nearestPoint.x, y: nearestPoint.y})
    
    
  }
  
  redrawGrid(squaresToRepresentCircle)
  //now uses array that stores blueSquares to reDrawGrid, which makes the squares blue instead of black
  context.strokeStyle = "#0000FF"
  context.beginPath();
  //draws circle
  context.arc(centerX, centerY, radius, 0, Math.PI*2);
  context.stroke();
    
  
   

    
  context.strokeStyle = "#FF0000"  
  context.beginPath();
  //draws max circle from candidate square end
  context.arc(centerX, centerY, maxPointDistance, 0, Math.PI*2);
  context.stroke();
  context.beginPath();
  //draws min circle from candidate square end
  context.arc(centerX, centerY, minPointDistance, 0, Math.PI*2);
  context.stroke();
  isDrawingCircle = false;
}

function findNearestPoint(x, y)
{
    //finds nearest multiple of 20
    var xDiv20 = x/20
    
    
    var xNearest20 = Math.round(xDiv20) * 20
    

    var yDiv20 = y/20
    
    
    var yNearest20 =  Math.round(yDiv20) * 20
    return {x: xNearest20,y: yNearest20}
}
canvas.addEventListener('mousedown',startDrawCircle);
canvas.addEventListener('mousemove',whileDrawCircle);
canvas.addEventListener('mouseup',endDrawCircle);

