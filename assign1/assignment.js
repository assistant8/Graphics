var points;


window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    var vertices = new Float32Array([

        // backgroundColor
        -1.0, 1.0, -1, -0.5, 1, 1,
        -1.0, -0.5, 1, 1, 1, -0.5,

        //mountain
        0.4, -0.5, 0.9, -0.5, 0.65, 0.6,

        //mountain2
        0.2, -0.5, 0.4, -0.5, 0.3, -0.1,

        //house
        -0.5, -0.5, -0.5, -0.1, -0.0, -0.1,
        -0.5, -0.5, -0.0, -0.5, -0.0, -0.1,
        -0.2, -0.5, -0.2, -0.2, -0.05, -0.2,
        -0.2, -0.5, -0.05, -0.5, -0.05, -0.2,
        -0.5, -0.1, -0.0, -0.1, -0.25, 0.25,

        //tree
        -0.65, 0.8, -0.4, 0.4, -0.9, 0.4,
        -0.65, 0.5, -0.4, 0.05, -0.9, 0.05,
        -0.65, 0.2, -0.4, -0.3, -0.9, -0.3,
        -0.55, -0.3, -0.75, -0.3, -0.55, -0.7,
        -0.55, -0.7, -0.75, -0.7, -0.75, -0.3,

        // star
        0.0, 0.05, -0.1, -0.1, 0.1, -0.1,
        -0.1, 0.0, 0.1, 0.0, 0, -0.15,

        //flower
        -0.5, -0.4, -0.5, -0.6, -0.35, -0.5,
        -0.35, -0.5, -0.2, -0.6, -0.2, -0.4,

    ]);

    var colors = [
        //backgroundColor
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),

        //mountain
        vec4(0, 1, 0, 1),
        vec4(0, 1, 0, 1),
        vec4(0, 1, 0, 1),

        //mountain2
        vec4(0, 1, 0, 0.7),
        vec4(0, 1, 0, 0.7),
        vec4(0, 1, 0, 0.7),

        // house
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),

        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),

        vec4(1, 0, 0, 0.8),
        vec4(1, 0, 0, 0.8),
        vec4(1, 0, 0, 0.8),

        //tree
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),

        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),

        // star
        vec4(1, 1, 0.7, 1),
        vec4(1, 1, 0.7, 1),
        vec4(1, 1, 0.7, 1),
        vec4(1, 1, 0.7, 1),
        vec4(1, 1, 0.7, 1),
        vec4(1, 1, 0.7, 1),

        //flower
        vec4(1, 0.3, 0, 0.8),
        vec4(1, 0.5, 0, 0.8),
        vec4(1, 0.3, 0.2, 0.8),
        vec4(1, 0.5, 0, 0.8),
        vec4(1, 0.3, 0, 0.8),
        vec4(1, 0.5, 0.2, 0.8),

    ];

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.1, 0.65, 0.2, 1.0);


    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // vertex color
    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // uniform variable
    var L_offset = gl.getUniformLocation(program, "uOffset");

    // uniform variable
    var size = gl.getUniformLocation(program, "size");

    // size 
    gl.uniform4fv(size, [1, 1, 1, 1]);

    // backgroundColor
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    //mountain
    gl.drawArrays(gl.TRIANGLES, 6, 3);

    //mountain2
    gl.drawArrays(gl.TRIANGLES, 9, 3);

    //house
    gl.drawArrays(gl.TRIANGLES, 12, 6);
    gl.drawArrays(gl.TRIANGLES, 18, 6);
    gl.drawArrays(gl.TRIANGLES, 24, 3);

    //tree
    gl.drawArrays(gl.TRIANGLES, 27, 6);
    gl.drawArrays(gl.TRIANGLES, 33, 6);
    gl.drawArrays(gl.TRIANGLES, 39, 3);

    // star
    gl.uniform4fv(L_offset, [-0.1, 0.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    // size 
    gl.uniform4fv(size, [0.4, 0.4, 1, 1]);

    // star
    gl.uniform4fv(L_offset, [0.5, 0.5, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    // star
    gl.uniform4fv(L_offset, [0.9, 0.9, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    // size 
    gl.uniform4fv(size, [0.8, 0.8, 1, 1]);
    // star
    gl.uniform4fv(L_offset, [0.1, 0.6, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    // star
    gl.uniform4fv(L_offset, [-0.5, 0.9, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    // star
    gl.uniform4fv(L_offset, [-0.9, 0.6, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    // size 
    gl.uniform4fv(size, [0.6, 0.6, 1, 1]);

    // star
    gl.uniform4fv(L_offset, [0.9, 0.1, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    // star
    gl.uniform4fv(L_offset, [0.4, -0.3, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    //flower
    gl.drawArrays(gl.TRIANGLES, 48, 6);

    //size & Location
    gl.uniform4fv(L_offset, [-0.5, -0.6, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 48, 6);

    //size & Location
    gl.uniform4fv(size, [0.4, 0.4, 1, 1]);
    gl.uniform4fv(L_offset, [0.9, -0.55, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 48, 6);

    gl.uniform4fv(size, [0.3, 0.3, 1, 1]);
    gl.uniform4fv(L_offset, [0.93, -0.7, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 48, 6);
};

