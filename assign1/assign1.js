var points;


window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

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

        //fish
        -0.6, -0.3, -0.6, -0.7, -0.35, -0.5,
        -0.35, -0.5, -0.2, -0.6, -0.2, -0.4,

        //dandelion
        0.0, 0.05, -0.1, -0.1, 0.1, -0.1,
        -0.1, 0.0, 0.1, 0.0, 0, -0.15,   
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

        //fish color
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.8, 0.8, 0.8, 0.8),      

        //dandelion color
        vec4(1, 0.8, 0, 1),
        vec4(1, 0.8, 0, 1),
        vec4(1, 0.8, 0, 1),
        vec4(1, 0.8, 0, 1),
        vec4(1, 0.8, 0, 1),
        vec4(1, 0.8, 0, 1),       

    ];

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.05, 0.65, 0.1, 0.8); // initialize canvas color green


    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the vertex data into the GPU
    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Load the color data into the GPU
    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    // Associate color data buffer with shader variables   
    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // find location uOffset in shader and bring as offsetloc
    var offsetloc = gl.getUniformLocation(program, "uOffset");

    // find location size in shader and bring as offsetloc
    var size = gl.getUniformLocation(program, "size");

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

    // draw fish
    gl.uniform4fv(offsetloc, [0.85, 0.75, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 27, 6);

    // draw baby fish - change size using *uniform
    gl.uniform4fv(offsetloc, [0.8, -0.3, 0, 0]);
    gl.uniform4fv(size, [0.32, 0.32, 1, 1]);
    gl.drawArrays(gl.TRIANGLES, 27, 6);

    // draw several dandelion
    gl.uniform4fv(size, [0.6, 0.6, 1, 1]);
    gl.uniform4fv(offsetloc, [0.9, -0.55, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    gl.uniform4fv(offsetloc, [0, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    gl.uniform4fv(offsetloc, [-0.3, -0.3, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    gl.uniform4fv(offsetloc, [-0.8, 0.7, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    gl.uniform4fv(offsetloc, [0.9, -0.55, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    gl.uniform4fv(offsetloc, [-0.13, 0.55, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    // draw small dandelion
    gl.uniform4fv(size, [0.3, 0.3, 1, 1]);
    gl.uniform4fv(offsetloc, [0.93, 0.7, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    gl.uniform4fv(offsetloc, [-0.93, 0.5, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 33, 6);

    
};

