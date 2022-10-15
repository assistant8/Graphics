var points;
var direction = true;
var moveY=1;
var program;
var offsetloc;
var size;

var dandelion = [];
var x = 0;
var y = 0;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.05, 0.65, 0.1, 0.8); // initialize canvas color green

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var dirButton = document.getElementById("direction");

    dirButton.addEventListener("click", function(){ // if press button, change direction
      direction =! direction; 
    });
    
    canvas.addEventListener("mousedown", function(event){ // if click background, dandelion appear
        var vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

        x = 2 * event.clientX / canvas.width - 1;
        y = 2 * (canvas.height - event.clientY) / canvas.height - 1;

        if(x<0.1){ //left side of river
            dandelion.push(vec2(x, y));
        }
        
    });

    render();
    
};

function render() {
    setTimeout(function () {
        // clear buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);  
        gl.clearColor(0.05, 0.65, 0.1, 0.8); //draw background

        drawback(); //draw static objects - house, river, mountain

        if(direction == true) 
        {
          if(moveY < -0.12) //when goes down max
           {
             direction =! direction
           }
  
           moveY -= 0.01
  
           drawFish(moveY);  
           drawdand(0.0,0.0);
        }

        else if(direction == false)
        {  
           if(moveY > 1.62) //when goes up max
           {
             direction =! direction
           }

           moveY += 0.01
  
           drawFish(moveY);
        }
        
  
        for (var i = 0; i < dandelion.length; i++) { //draw dandelion everywhere clicked
           drawdand(dandelion[i][0], dandelion[i][1]);
           console.log(dandelion[i][0]);
        }
  
        requestAnimFrame(render);
     }, 300);
  }

  function drawdand(x, y){
   var dandVertex = new Float32Array([ //draw with points where I clicked
        x, y+0.05, x-0.1, y-0.1, x+0.1, y-0.1,
        x-0.1, y, x+0.1, y, x, y-0.15,    
    ]);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // find location uOffset in shader and bring as offsetloc
    var offsetloc = gl.getUniformLocation(program, "uOffset");

    // find location size in shader and bring as offsetloc
    var size = gl.getUniformLocation(program, "size");

   var dandBufferId = gl.createBuffer(); //create dand vertex buffer
   gl.bindBuffer(gl.ARRAY_BUFFER, dandBufferId);
   gl.bufferData(gl.ARRAY_BUFFER, dandVertex, gl.STATIC_DRAW);

   var vPosition = gl.getAttribLocation(program, "vPosition");
   gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(vPosition);

   var vColor = gl.getAttribLocation(program, "vColor"); //set color just one, not using vertex info
   gl.disableVertexAttribArray(vColor);
   gl.vertexAttrib4f(vColor, 1.0, 0.8, 0.0, 1.0);

   gl.uniform4fv(size, [1, 1, 1, 1]); /////////////size initialize was important
   gl.uniform4fv(offsetloc, [0, 0, 0, 0]);

   gl.drawArrays( gl.TRIANGLES, 0, 6);
}

function drawFish (moveY) {
    var fishvertices = new Float32Array([ 
        -0.6, -0.3, -0.5, -0.3, -0.55, -0.4,
        -0.55, -0.4, -0.58, -0.45, -0.52, -0.45,    
    ]); 

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // find location uOffset in shader and bring as offsetloc
    var offsetloc = gl.getUniformLocation(program, "uOffset");

    // find location size in shader and bring as offsetloc
    var size = gl.getUniformLocation(program, "size");

    var fishBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fishBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, fishvertices, gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, fishBufferId );

    var vPosition = gl.getAttribLocation(program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.5, 0.8); // grey fish color

    gl.enableVertexAttribArray( vPosition );

    // fish drawing
    gl.uniform4fv(size, [2, 2, 2, 1]);
    gl.uniform4fv(offsetloc, [1.5, moveY, 0, 0]);    

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function drawback () {
    var vertices = new Float32Array([

        //river
        0.2, 1, 0.8, 1, 0.2, -1,
        0.8, 1, 0.2, -1, 0.8, -1,
    
        //mountain far
        -0.75, 0.4, -0.4, 0.4, -0.6, 0.5,
    
        //mountain near
        -0.9, 0.2, -0.6, 0.2, -0.75, 0.6,
    
        //house
        -0.5, -0.5, -0.5, -0.1, -0.0, -0.1, //house body
        -0.5, -0.5, -0.0, -0.5, -0.0, -0.1,
        -0.35, -0.5, -0.35, -0.2, -0.15, -0.2, //house door
        -0.35, -0.5, -0.15, -0.5, -0.15, -0.2,
        -0.5, -0.1, -0.0, -0.1, -0.25, 0.25, //house roof
    
    ]);
    
    var colors = [
    
        //river color
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1), //difference for gradation
    
        //mountain color
        vec4(0, 0.1, 0, 1),
        vec4(0, 0.4, 0, 1),
        vec4(0, 1, 0, 1),
    
        //mountain color2
        vec4(0, 1, 0.5, 1),
        vec4(0, 1, 0.5, 1),
        vec4(0, 1, 0.8, 0.7),
    
        // house body color
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
    
        // door color
        vec4(1, 0, 0.7, 1),
        vec4(1, 0, 0.7, 1),
        vec4(1, 0, 0.7, 1),
        vec4(1, 0, 0.7, 1),
        vec4(1, 0, 0.7, 1),
        vec4(1, 0, 0.7, 1),
    
        // roof color
        vec4(1, 0, 0, 0.8),
        vec4(1, 0, 0, 0.8),
        vec4(1, 0, 0, 0.8),     
    
    ];

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // find location uOffset in shader and bring as offsetloc
    var offsetloc = gl.getUniformLocation(program, "uOffset");

    // find location size in shader and bring as offsetloc
    var size = gl.getUniformLocation(program, "size");

    var backBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, backBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, backBufferId );


    var vPosition = gl.getAttribLocation(program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    // Load the color data into the GPU
    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    // Associate color data buffer with shader variables   
    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.enableVertexAttribArray( vPosition );

    // size initialize
    gl.uniform4fv(size, [1, 1, 1, 1]);

    // draw river
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // draw near and then far mountain
    gl.drawArrays(gl.TRIANGLES, 6, 3);
    gl.drawArrays(gl.TRIANGLES, 9, 3);

    // set location using +uniform and draw house
    gl.uniform4fv(offsetloc, [-0.4, -0.4, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 12, 6); //body
    gl.drawArrays(gl.TRIANGLES, 18, 6); //door
    gl.drawArrays(gl.TRIANGLES, 24, 3); //roof
}