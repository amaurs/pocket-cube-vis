import util from './util.js';



var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var height = 5040;
var width = 729;

var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var allColors = imageData.data;

var pointer = 0;


function draw() {

  for(var permutation = 0; permutation < util.factorial(7); permutation++){
      for(var orientation = 0; orientation < Math.pow(3,6); orientation++){
        var rgb = util.pocketCubeToRGB(orientation, permutation);
        allColors[pointer + 0] = rgb[0];
        allColors[pointer + 1] = rgb[1];
        allColors[pointer + 2] = rgb[2];
        allColors[pointer + 3] = 255;
        pointer += 4;        
    }
  }
  console.log(allColors);
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