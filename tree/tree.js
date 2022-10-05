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
        0, 1, -0.5, 0.5, 0.5, 0.5,
        -0.15, -0.5, 0.15, -0.5, -0.15, -1,
        0.15, -0.5, -0.15, -1, 0.15, -1
    ]);

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, body, gl.STATIC_DRAW); //vertex 버퍼 만들고
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition ); //vposition 연결

    var uOffset = gl.getUniformLocation(program, "uOffset"); //유니폼 uoffset를 세이더에서 찾음
    
    var uColor = gl.getUniformLocation(program,"uColor"); //유니폼 ucolor 찾음

    gl.clear(gl.COLOR_BUFFER_BIT); //한번 싹 지우고?


    gl.uniform4fv(uColor,[0,1,0,1]); //칼라 정의
    for(var i=0; i<3; i++) {
        gl.drawArrays( gl.TRIANGLES, 0, 3 ); //반복될때 같은 3쌍(6점)을 그리겠지
        //셰이더에서 +uOffset에서 반복될때 y좌표에 각각 -0.5, -1, -1.5 해줌
        gl.uniform4fv(uOffset, [0, -0.5*i, 0, 0]); //오프셋 정의 - 업뎃
    }

    gl.uniform4fv(uOffset, [0, 0, 0, 0]); //오프셋 초기화
    gl.uniform4fv(uColor, [0.5,0.25,0,1]) //칼라 재정의 - 다른 색
    gl.drawArrays(gl.TRIANGLES, 3, 6)
 
};

