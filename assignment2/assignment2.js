var gl;
var points;
var direction = true;
var program;
var uOffset;
var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var moveX = 0;
var moveY = 0;

var seagulls = [];
var max = 10;
var x = 0;
var y = 0;



window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    canvas.addEventListener("mousedown", function(event){ //클릭시 시걸 생성
        var vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

        x = 2 * event.clientX / canvas.width - 1;
        y = 2 * (canvas.height - event.clientY) / canvas.height - 1;

        if(y > -0.5){
           if (seagulls.length >= max) {
            seagulls.reverse().pop();
            seagulls.reverse();
          }

          seagulls.push(vec2(x, y));
        }


    });

    if ( !gl ) { alert( "WebGL isn't available" ); }

    // Add direction event listener
    var dirButton = document.getElementById("Direction");

    dirButton.addEventListener("click", function(){ //버튼 클릭 시
      direction =! direction; //디렉션 반대로 정의
    });

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.0, 0.0, 0.0, 1.0);


    //  Load shaders

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // uniform variable
    uOffset = gl.getUniformLocation(program, "uOffset"); //오프셋 변수 가져옴

    render(); //아래 함수 콜


};

function render() {
  setTimeout(function () {
      // clear buffer bit
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.clearColor( 0.9, 0.5, 0.3, 1.0 );

      if(direction == true)
      {
        if(moveY < -0.24)
         {
           direction =! direction
         }

         moveY -= 0.004

         drawSunlight(moveY);
         drawSun(moveY);

      }
      else if(direction == false)
      {

         if(moveY > 0)
         {
           direction =! direction
         }
         moveY += 0.004

         drawSunlight(moveY);
         drawSun(moveY);
      }

      drawIsland();
      drawSea();

      if(direction == true)
      {
        if(moveX < -0.6)
         {
           direction =! direction
         }

         moveX -= 0.01

         drawShip(moveX);

      }
      else if(direction == false)
      {

         if(moveX > 0)
         {
           direction =! direction
         }
         moveX += 0.01

         drawShip(moveX);
      }

      for (var i = 0; i < seagulls.length; i++) {
         drawSeagulls(seagulls[i][0], seagulls[i][1]);
         console.log(seagulls[i][0]);
      }

      requestAnimFrame(render);
   }, 100);
}

function drawSunlight(transf_y) {
     // Sunlight vertices
     var sunlightVertices1 = [ vec2(-0.5, -0.2),
                      vec2(-0.75, -0.5),
                      vec2(-0.25, -0.5),
                      vec2(-0.25, -0.5),
                      vec2(-0.125, -0.4),
                      vec2(-0.75, -0.5),
                     vec2(-0.75, -0.5),
                     vec2(-0.25, -0.5),
                     vec2(-0.875, -0.4)
                           ];

    var sunlightBufferId1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sunlightBufferId1 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(sunlightVertices1), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, sunlightBufferId1 );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 1.0, 0.0, 0.0, 1.0); // red

    gl.enableVertexAttribArray( vPosition );
    gl.uniform4fv(uOffset, [0, transf_y, 0, 0]);
    // Render sunlight1
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 9);

    var sunlightVertices2 = [ vec2(-0.75, -0.28),
                      vec2(-0.75, -0.5),
                      vec2(-0.25, -0.5),
                      vec2(-0.25, -0.5),
                      vec2(-0.25, -0.28),
                      vec2(-0.75, -0.5)
                           ];

    var sunlightBufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sunlightBufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(sunlightVertices2), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, sunlightBufferId2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 1.0, 0.0, 0.0, 1.0); // red

    gl.enableVertexAttribArray( vPosition );
    gl.uniform4fv(uOffset, [0, transf_y, 0, 0]);
    // Render sunlight2
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6);
}

function drawSun(transf_y){
    // Sun vertices
     var sunVertices = [ vec2(-0.5, -0.5),
                      vec2(-0.75, -0.5),
                      vec2(-0.725, 0.075-0.5),
                     vec2(-0.7, 0.125-0.5),
                     vec2(-0.675, 0.15-0.5),
                     vec2(-0.65, 0.1625-0.5),
                     vec2(-0.625, 0.16875-0.5),
                     vec2(-0.6, 0.18-0.5),
                     vec2(-0.575, 0.19-0.5),
                     vec2(-0.55, 0.1925-0.5),
                     vec2(-0.525, 0.195-0.5),
                     vec2(-0.5, 0.1975-0.5),
                     vec2(-0.475, 0.195-0.5),
                     vec2(-0.45, 0.1925-0.5),
                     vec2(-0.425, 0.19-0.5),
                     vec2(-0.4, 0.18-0.5),
                     vec2(-0.375, 0.16875-0.5),
                     vec2(-0.35, 0.1625-0.5),
                     vec2(-0.325, 0.15-0.5),
                     vec2(-0.3, 0.125-0.5),
                     vec2(-0.275, 0.075-0.5),
                     vec2(-0.25, 0.0-0.5)
                           ];

    var sunBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sunBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(sunVertices), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, sunBufferId );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 1.0, 1.0, 0.0, 1.0); // yellow

    gl.enableVertexAttribArray( vPosition );
    gl.uniform4fv(uOffset, [0, transf_y, 0, 0]);
    // Render sun
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 22);
}

function drawSea(){
    // Sea vertices
     var seaVertices = [ vec2(-1.0, -0.5),
                      vec2(-1.0, -1.0),
                      vec2(-0.5, -0.5),
                      vec2(-0.5, -0.5),
                      vec2(-1.0, -1.0),
                      vec2(-0.5, -1.0),
                     vec2(-0.5, -1.0),
                     vec2(1.0, -1.0),
                     vec2(1.0, -0.5),
                     vec2(1.0, -0.5),
                     vec2(-0.5, -0.5),
                     vec2(-0.5, -1.0)
                     ];

    var seaColors = [
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(1.0, 1.0, 0.0, 1.0),
         vec4(1.0, 1.0, 0.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
         vec4(1.0, 1.0, 0.0, 1.0),
         vec4(0.0, 1.0, 1.0, 1.0),
    ];

    var seaBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, seaBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(seaVertices), gl.STATIC_DRAW );


    var seaColorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, seaColorBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(seaColors), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, seaBufferId );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer( gl.ARRAY_BUFFER, seaColorBufferId );

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );

    gl.enableVertexAttribArray( vPosition );
    gl.enableVertexAttribArray( vColor );
    gl.uniform4fv(uOffset, [0, 0, 0, 0]);
    // Render sea
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 12);
}

function drawIsland(){
   // Island vertices
     var islandVertices = [ vec2(0.5, 0.5),
                      vec2(0.0, -0.5),
                      vec2(1.0, -0.5),
                           ];

    var islandBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, islandBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(islandVertices), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, islandBufferId );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 1.0, 0.0, 1.0); // green

    gl.enableVertexAttribArray( vPosition );
    gl.uniform4fv(uOffset, [0, 0, 0, 0]);
    // Render island
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3);
}

function drawSeagulls(x, y){
   var sg = [
                     vec2(x - 0.05, y - 0.1),
                     vec2(x, y),
                     vec2(x, y + 0.1),
                     vec2(x, y + 0.1),
                     vec2(x, y), // -0.1, 1.1
                     vec2(x + 0.05, y),
                     vec2(x + 0.05, y),
                     vec2(x, y),
                     vec2(x + 0.05, y - 0.1),
                     vec2(x + 0.05, y - 0.1),
                     vec2(x + 0.1, y),
                     vec2(x + 0.05, y),
                     vec2(x + 0.05, y),
                     vec2(x + 0.1, y),
                     vec2(x + 0.1, y + 0.1),
                     vec2(x + 0.1, y + 0.1),
                     vec2(x + 0.1, y),
                     vec2(x + 0.15, y - 0.1)
                           ];

   var vertexPositionBufferId = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
   gl.bufferData(gl.ARRAY_BUFFER, flatten(sg), gl.STATIC_DRAW);

   var vPosition = gl.getAttribLocation(program, "vPosition");
   gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(vPosition);

   var vColor = gl.getAttribLocation(program, "vColor");
   gl.disableVertexAttribArray(vColor);
   gl.vertexAttrib4f(vColor, 1.0, 1.0, 1.0, 1.0);
   gl.uniform4fv(uOffset, [0, 0, 0, 0]);

   gl.drawArrays( gl.TRIANGLES, 0, 18);
}

function drawShip(transf_x){
    // Ship bottom vertices
     var shipBottomVertices = [
                     vec2(0.2, -0.3),
                      vec2(0.3, -0.6),
                      vec2(0.3, -0.3),
                     vec2(0.3, -0.3),
                     vec2(0.3, -0.6),
                     vec2(0.7, -0.6),
                     vec2(0.7, -0.6),
                     vec2(0.8, -0.3),
                     vec2(0.3, -0.3),
                           ];

    var shipBottomBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, shipBottomBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(shipBottomVertices), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, shipBottomBufferId );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);

    gl.enableVertexAttribArray( vPosition );
    gl.uniform4fv(uOffset, [transf_x, 0, 0, 0]);
    // Render bottom of ship
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 9);

    // Ship top vertices
     var shipTopVertices = [
                     vec2(0.3, -0.2),
                      vec2(0.3, -0.3),
                      vec2(0.7, -0.3),
                     vec2(0.7, -0.3),
                     vec2(0.7, -0.2),
                     vec2(0.3, -0.2)
                           ];

    var shipTopBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, shipTopBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(shipTopVertices), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, shipTopBufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 1.0, 1.0, 1.0, 0.0);

    gl.enableVertexAttribArray( vPosition );
    // Render top of ship
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6);

    // Ship window vertices
     var shipWindowVertices = [
                     vec2(0.3, -0.22),
                      vec2(0.3, -0.28),
                      vec2(0.4, -0.28),
                     vec2(0.4, -0.28),
                     vec2(0.4, -0.22),
                     vec2(0.3, -0.22)
                           ];

    var shipWindowBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, shipWindowBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(shipWindowVertices), gl.STATIC_DRAW );


    gl.bindBuffer( gl.ARRAY_BUFFER, shipWindowBufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 1.0, 1.0);

    gl.enableVertexAttribArray( vPosition );
    // Render window

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6);


}