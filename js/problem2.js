


var dots = document.getElementsByClassName("dots")
var i;
var arrayOfPoints = []
for (i = 0; i < dots.length; i++)
{
    dots[i].addEventListener("click", function(e) {
        //if user selects a dot, then make it red and store it
        //if it is already red, it is already stored so do nothing
        if (this.style.backgroundColor == "red")
        {
            //in the future, will allow for deselect option, for now, use clear button
        }
        else {

            this.style.backgroundColor = "red"
            //pushes pixel locations based on row and column number.
            //as noted in documentation, the center of the dot is 5 off X and 5 off Y 
            arrayOfPoints.push({x: (this.parentElement.id.replace('row','')-1) * 20 + 5, 
            y:(this.classList[1].replace('column','')-1) * 20 + 5})
            console.log(arrayOfPoints)
        }
        
        
    })
    
}

function clearDots() {
    window.location.reload()
}
function multiplyMatrix(a, b) {
    //multiply matrix equation
    var c = [];
    for (var i = 0; i < a.length; i++) {
        c[i] = [];
        for (var j = 0; j < b[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < a[0].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            c[i][j] = sum;
        }
    }
    return c;
}
function generateCircle() {
    //Ax = B
    const A = new Array(arrayOfPoints.length).fill(0).map(() => new Array(3).fill(0));
    
    const B = new Array(arrayOfPoints.length).fill(0).map(() => new Array(1).fill(0));
    for (var i = 0; i < arrayOfPoints.length; i++)
    {
        A[i][0] = arrayOfPoints[i].x * 2
        A[i][1] = arrayOfPoints[i].y * 2
        A[i][2] = 1
        B[i][0] = (arrayOfPoints[i].x* arrayOfPoints[i].x) + (arrayOfPoints[i].y* arrayOfPoints[i].y)
    }

    ATranspose = A[0].map((_, colIndex) => A.map(row => row[colIndex]));
    //transpose A

    //AT AX = AT B
    //find AT AX
    ATransposeA = multiplyMatrix(ATranspose, A)
    
    //find AT B 
    ATransposeB = multiplyMatrix(ATranspose, B)
    
    //solve for by using inversion, X = A-1B

    answer = multiplyMatrix(math.inv(ATransposeA), ATransposeB)
   
    //since answer is (h, k, m, m = r2 - h2 -k2)
    //this solves r
    radius = Math.sqrt(answer[2][0] + (answer[0][0] * answer[0][0]) + (answer[1][0] * answer[1][0]))
    
    var div = document.createElement("div");
    div.style.width = radius * 2 + 'px';
    div.style.position = 'absolute';
    div.style.height = radius * 2 + 'px';
    div.style.background = "transparent";
    div.style.borderStyle = "solid"
    div.style.borderColor = "red"
    div.style.borderRadius = '50%';
    div.style.top = (answer[0][0] - radius) + 'px';
    div.style.left = (answer[1][0] - radius) + 'px';
    document.getElementById("body").appendChild(div);
    console.log(div)
}














