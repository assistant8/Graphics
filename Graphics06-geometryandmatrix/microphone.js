var canvas;
var gl;

var axis = 0;
var theta = [0,0,0];
var thetaLoc;

var flag = false;

var points = [];
var colors = [];

window.onload = function init(){
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if(!gl){alert("WebGL isn't available");}

    var mySphere = sphere();
    mySphere.scale(0.5, 0.5, 0.5);
    mySphere.rotate(45.0, [1,1,1]);
    mySphere.translate(0.0, 0.5, 0.0);

    points = points.concat(mySphere.TriangleVertices);
    colors = colors.concat(mySphere.TriangleVertexColors);

    var myCylinder = cylinder(72, 3, true);
    myCylinder.scale(0.4, 0.7, 0.5);
    myCylinder.rotate(0.0, [1,1,1]);
    myCylinder.translate(0.0, -0.3, 0.0);

    points = points.concat(myCylinder.TriangleVertices);
    colors = colors.concat(myCylinder.TriangleVertexColors);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");

    document.getElementById("xButton").onclick = function(){
        axis = 0;
    }
    document.getElementById("yButton").onclick = function(){
        axis = 1;
    }
    document.getElementById("zButton").onclick = function(){
        axis = 2;
    }
    document.getElementById("tButton").onclick = function(){flag = !flag;};
    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    if(flag){
        theta[axis] += 2.0;
    }
    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
    requestAnimFrame(render);
}
