import util from './util.js';



var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var w = 3;
var h = 19;
var n = 255

var height = h * n;
var width = w * n;

var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var allColors = imageData.data;

var pointer = 0;


function draw() {


  for(var k = 0; k < w; k++){
    for(var l = 0; l < h; l++){
      var red = l * w + k;
      for(var i = 0; i < n; i++){
        var green = i;
        for(var j = 0; j < n; j++){
          var blue = i;
          if(RGBToInt(red, green, blue) < 7 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 2 * 2 * 2 * 5 * 2){
            allColors[pointer + 0] = red;
            allColors[pointer + 1] = green;
            allColors[pointer + 2] = blue;
            allColors[pointer + 3] = 255;

          } else{
            allColors[pointer + 0] = 255;
            allColors[pointer + 1] = 255;
            allColors[pointer + 2] = 255;
            allColors[pointer + 3] = 255;
          }
          pointer += 4; 
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

var color = document.getElementById('color');

function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ', ' + data[1] +
               ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    color.style.background =  rgba;
    color.textContent = util.rgbToPocketCube(data[0], data[1], data[2]);
}
canvas.addEventListener('mousemove', pick);

draw();