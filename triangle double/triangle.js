
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // var vertices = [vec2(-1, -1), vec2(-0.5, 1), vec2(0, -1)]; //이걸로 아래에서 flatten 하면 작동됨

    var vertices = new Float32Array([-1, -1, -0.5, 1, 0, -1, 0, -1, 0.5, 1, 1, -1]); //좌표정함 - typedarray 형식

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); //캔버스 초기화, 배경색

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program ); //shader 연결 2개

    // Load the data into the GPU

    var bufferId = gl.createBuffer(); //gpu 메모리에 말록처럼 공간 생성
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); //OpenGL의 버퍼 유형인 ARRAY_BUFFER로 바인딩
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); //좌표 사용,  버텍스 데이터를 버퍼의 메모리에 복사
    //데이터를 복사하여 집어넣을 버퍼의 유형, 버퍼에 저장할 데이터 크기, 보낼 실 데이터, 그래픽 카드가 데이터를 관리하는 방법

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 ); //vposition이 2개씩 참조, 각각은 float
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3); //3점씩이 아니라, 3점만 그려라 (2개가 1점이라 생각)
}
