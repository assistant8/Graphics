var gl;
var points;

window.onload = function init() {

    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {alert("WebGL isn't available");}

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
	// clear buffer bit
    gl.clear( gl.COLOR_BUFFER_BIT );
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var backgroundVertices1 = [ //sky
        vec2(-1, 1),
        vec2(-1, -1),
        vec2(1, 1),
        vec2(1, -1),
    ];
    var backgroundVertices2 = [ //ground
        vec2(-1, -0.03),
        vec2(-1, -1),
        vec2(1, -0.03),
        vec2(1, -1),
    ];

    var hexagonVertices = [ //hexagon
	//snowman head
        vec2(0.2, 0.52),
        vec2(0.2, 0.68),
        vec2(0.1, 0.8),
        vec2(-0.1, 0.8),
        vec2(-0.2, 0.68),
        vec2(-0.2, 0.52),
        vec2(-0.1, 0.4),
        vec2(0.1, 0.4),
        vec2(0.2, 0.52), 
	//snowman body
        vec2(0.33, 0.48),
        vec2(0.33, 0.64),
        vec2(0.22, 0.8),
        vec2(-0.22, 0.8),
        vec2(-0.33, 0.64),
        vec2(-0.33, 0.48),
        vec2(-0.22, 0.32),
        vec2(0.22, 0.32),
        vec2(0.33, 0.48)
    ];

    var squareVertices = [ //square
	//snowman scarf
        vec2(-0.22, 0.43),
        vec2(-0.22, 0.3),
        vec2(0.22, 0.43),
        vec2(0.22, 0.3),
        vec2(0.05, 0.43),
        vec2(0.05, 0),
        vec2(0.18, 0.43),
        vec2(0.18, 0),
	//snowman eyes, buttons
        vec2(-0.015, 0.015),
        vec2(-0.015, -0.015),
        vec2(0.015, 0.015),
        vec2(0.015, -0.015),		
	//snowman hat
        vec2(-0.2, 0.9),
        vec2(-0.2, 0.8),
        vec2(0.2, 0.9),
        vec2(0.2, 0.8),
        vec2(-0.13, 1),
        vec2(-0.13, 0.9),
        vec2(0.13, 1),
        vec2(0.13, 0.9),
    ];
	
    var triangleVertices = [ //triangle
	//snowman nose
        vec2(0, 0.6),
        vec2(0, 0.52),
        vec2(0.2, 0.56),
    ];

    var vertices = [ //lines
	//snowman arm
        vec2(-0.22, 0.18),
        vec2(-0.44, 0.4),
        vec2(0.22, 0.18),
        vec2(0.44, 0.4),
	//snowflake
        vec2(0, 0.03),
        vec2(0, -0.03),
        vec2(0.03, 0),
        vec2(-0.03, 0),
        vec2(0.02, 0.02),
        vec2(-0.02, -0.02),
        vec2(-0.02, 0.02),
        vec2(0.02, -0.02),
    ];

    var colors1 = [
        vec4(0.0, 0.0, 1.0, 0.2), 
        vec4(0.0, 0.0, 1.0, 0.1), 
        vec4(0.0, 0.0, 1.0, 0.2), 
        vec4(0.0, 0.0, 1.0, 0.1)
    ];
    var colors2 = [
        vec4(0.0, 1.0, 1.0, 0.7),
        vec4(0.0, 1.0, 1.0, 0.5),
        vec4(0.0, 1.0, 1.0, 0.7), 
        vec4(0.0, 1.0, 1.0, 0.5)
    ];
    var colors3 = [
        vec4(0.0, 0.2, 0.0, 0), 
        vec4(0.0, 0.2, 1.0, 0.5), 
        vec4(0.0, 0.2, 1.0, 0.5), 
    ];

	
    var all = new Float32Array([ //tree
	//leaf
                0, 0.4, -0.2, 0.2, 0.2, 0.2, 
                0, 0.2, -0.2, 0, 0.2, 0,
                0, 0, -0.2, -0.2, 0.2, -0.2, 
	//body
                -0.05, -0.2, 0.05, -0.2, -0.05, -0.5, 
                0.05, -0.2, -0.05, -0.5, 0.05, -0.5 
            ]);
			
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//background-sky

    // create a buffer on gpu and bind point    
    var backgroundBufferId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBufferId1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(backgroundVertices1), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer   
	// attribute variable
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
	
	// attribute variable
    var vColor = gl.getAttribLocation(program, "vColor");
    gl.disableVertexAttribArray(vColor); 

    var ColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors1), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

	//render
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//background-ground

    var backgroundBufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(backgroundVertices2), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, ColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors2), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//snowman-head,body

    var hexagonBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, hexagonBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(hexagonVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 1.0, 1.0, 0.1);

	// uniform variable
    var offsetLoc = gl.getUniformLocation(program, "offset");
	
    gl.uniform4fv(offsetLoc, [0, -0.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 9);

    gl.uniform4fv(offsetLoc, [0, -0.7, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_FAN, 9, 9);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var squareBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(squareVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

	//snowman-scarf
	gl.vertexAttrib4f(vColor, 1.0, 0.0, 0.0, 1);
    gl.uniform4fv(offsetLoc, [0, -0.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);
	
	//snowman-eyes
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1);
    gl.uniform4fv(offsetLoc, [-0.07, 0.45, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.uniform4fv(offsetLoc, [0.07, 0.45, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);

	//snowman-buttons
    gl.vertexAttrib4f(vColor, 0.6, 0.3, 0.0, 1);
    gl.uniform4fv(offsetLoc, [0, -0.05, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.uniform4fv(offsetLoc, [0, -0.15, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.uniform4fv(offsetLoc, [0, -0.25, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
	
	//snowman-hat
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1);
    gl.uniform4fv(offsetLoc, [0, -0.25, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 16, 4);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//snowman-nose

    var triangleBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.disableVertexAttribArray(vColor); 
    gl.vertexAttrib4f(vColor, 1.0, 0.5, 0.0, 1.0);
	gl.uniform4fv(offsetLoc, [0, -0.2, 0, 0]);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//tree

    var bufferId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
    gl.bufferData(gl.ARRAY_BUFFER, all, gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, ColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors3), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

//top of trees
    gl.uniform4fv(offsetLoc, [0.7, 0.3, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.uniform4fv(offsetLoc, [-0.7, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
	
//leaf
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.2, 1.0, 0.5);
    gl.drawArrays(gl.TRIANGLES, 3, 6);
//body
    gl.vertexAttrib4f(vColor, 0.6, 0.3, 0.0, 1.0);
    gl.drawArrays(gl.TRIANGLES, 9, 6);

//leaf
    gl.uniform4fv(offsetLoc, [0.7, 0.3, 0, 0]);
    gl.vertexAttrib4f(vColor, 0.0, 0.2, 1.0, 0.5);
    gl.drawArrays(gl.TRIANGLES, 3, 6);
//body
    gl.vertexAttrib4f(vColor, 0.6, 0.3, 0.0, 1.0);
    gl.drawArrays(gl.TRIANGLES, 9, 6);
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var bufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

//snowman-arm
    gl.uniform4fv(offsetLoc, [0, -0.2, 0, 0]);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);
    gl.drawArrays(gl.LINE_LOOP, 0, 2);
    gl.drawArrays(gl.LINE_LOOP, 2, 2);
   
//snowflakes
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 0.0);
    gl.uniform4fv(offsetLoc, [-0.3, 0.2, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
    gl.uniform4fv(offsetLoc, [-0.5, 0.4, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [-0.6, 0.2, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [-0.65, 0.1, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
    gl.uniform4fv(offsetLoc, [0.4, 0.5, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [0.6, 0.8, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [-0.1, 0.7, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [0, 0.9, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [-0.8, 0.7, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [0.8, 0.45, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
	gl.uniform4fv(offsetLoc, [0.75, 0.4, 0, 0]);
    gl.drawArrays(gl.LINE_LOOP, 4, 2);
    gl.drawArrays(gl.LINE_LOOP, 6, 2);
    gl.drawArrays(gl.LINE_LOOP, 8, 2);
    gl.drawArrays(gl.LINE_LOOP, 10, 2);
};
