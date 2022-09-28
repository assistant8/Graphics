var gl;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var body = new Float32Array([
        0, 1, -0.5, 0.5, 0.5, 0.5
        // 0, 1, -0.5, 0.5, 0.5, 0.5,
        // 0, 0.5, -0.5, 0, 0.5, 0,
        // 0, 0, -0.5, -0.5, 0.5, -0.5,
        // -0.15, -0.5, 0.15, -0.5, -0.15, -1,
        // 0.15, -0.5, -0.15, -1, 0.15, -1
    ]);

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, body, gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uOffset = gl.getUniformLocation(program, "uOffset");
    gl.uniform4fv(uOffset, [0, 0, 0, 0]); 
    
    // var uColor=gl.getUniformLocation(program,"uColor");

    gl.clear(gl.COLOR_BUFFER_BIT);   

    var a = 0;
    for(var i=0; i<3; i++) {
        gl.uniform4fv(uOffset, [0, a, 0, 0]); 
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
        a=a+0.5;        
    }

    // // gl.uniform4fv(uColor,[0,1,0,1]);
    // gl.drawArrays( gl.TRIANGLES, 0, 9 );

    // // gl.uniform4fv(uColor, [0.5,0.25,0,1]);
    // gl.drawArrays( gl.TRIANGLES, 9, 6 );  
};

