'use strict';

var util = {
    toTernary: function(decimal){
        return this.toBaseN(decimal, 3);
    },
    fromTernary: function(ternary){
        return this.fromBaseN(ternary, 3);
    },
    toBinary: function(decimal){
        return this.toBaseN(decimal, 2);
    },
    fromBinary: function(binary){
        return this.fromBaseN(binary, 2);
    },
    toBaseN: function(decimal, base){
        var remainder = 0;
        var quotient = decimal;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % base;
            quotient = Math.floor(quotient / base);
            result = result + this.pow(10, i) * remainder;
            i++;
        }
        return result;
    },
    fromBaseN: function(decimal, base){
        var remainder = 0;
        var quotient = decimal;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % 10;
            quotient = Math.floor(quotient / 10);
            result = result + this.pow(base, i) * remainder;
            i++;
        }
        return result;
    },
    toFactoradic: function(decimal){
        var remainder = 0;
        var quotient = decimal;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % (i + 1);
            quotient = Math.floor(quotient / (i + 1));
            result = result + this.pow(10, i) * remainder;
            i++;
        }
        return result;
    },
    fromFactoradic: function(factoradic){
        var remainder = 0;
        var quotient = factoradic;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % 10;
            quotient = Math.floor(quotient / 10);
            result = result + this.factorial(i) * remainder;
            i++;
        }
        return result;
    },  
    pow: function(a, b){
        var result = 1;
        for(var i = 0; i < b; i++){
           result *= a;
        }
        return result;
    },
    factorial: function(n){
        if(n == 0){
            return 1;
        }
        else if(n == 1){
            return 1;
        }
        else{
            return this.factorial(n -1) * n;
        }
    },
    intToRGB: function(value){
        var rgb = [];
        if(0 <= value && value < Math.pow(2,24)){
            rgb.push((value & 0xFF0000) >>> 16);
            rgb.push((value & 0xFF00) >>> 8);
            rgb.push(value & 0xFF);
        }
        else{
            throw 'Invalid value when converting int to rgb.';
        }
        return rgb;
    },
    RGBToInt: function(red, green, blue){
        return (red << 16) + (green << 8) + blue;
    },
    pocketCubeToInt: function(orientation, permutation){
        return orientation * 7 * 6 * 5 * 4 * 3 * 2 + permutation;
    },
    pocketCubeToRGB: function(orientation, permutation){
        return this.intToRGB(this.pocketCubeToInt(orientation, permutation));
    },
    rgbToPocketCube: function(red, green, blue){
        return (red << 16) | (green << 8) | blue;
    },
    intToPocketCube: function(index){
        var orientation = index / (7 * 6 * 5 * 4 * 3 * 2);
        var permutation = index % (7 * 6 * 5 * 4 * 3 * 2);
        return {"orientation":orientation, "permutation": permutation};
    }
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var w = 3;
var h = 19;
var n = 256;

var height = h * n;
var width = w * n;

var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var allColors = imageData.data;

var pointer = 0;


function draw() {


  for(var k = 0; k < w; k++){
    for(var l = 0; l < h; l++){
      var b = l * w + k;
      console.log(b);
      for(var i = 0; i < n; i++){
        //var green = n - (i + 1);
        var r = i;
        for(var j = 0; j < n; j++){
          //var blue = n - (j + 1);
          var g = j;
          if(util.RGBToInt(b, r, g) < 7 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 2 * 2 * 2 * 5 * 2 + 1 ){

            var pointer = xyToIndex(n * l + j, n * k + i, width) * 4;
            //var pointer = l * w + k + (i * n + j);
            allColors[pointer + 0] = r;
            allColors[pointer + 1] = g;
            allColors[pointer + 2] = 255 - b;
          } else{
            //console.log(util.RGBToInt(red, green, blue));
            allColors[pointer + 0] = 0;
            allColors[pointer + 1] = 0;
            allColors[pointer + 2] = 0;
          }
          allColors[pointer + 3] = 255;
          //pointer += 4; 
        }
      }
    }
  }
  console.log("Total: " + (pointer/ 4));
  ctx.putImageData(imageData, 0, 0);
}

function xyToIndex(x ,y, wi) {
    return x * wi + y;
}

var color = document.getElementById('color');
var body = document.getElementById('body');
var orientation = document.getElementById('orientation');
var permutation = document.getElementById('permutation');
var pocket = document.getElementById('pocket');
var redP = document.getElementById('red');
var blueP = document.getElementById('blue');
var greenP = document.getElementById('green');

function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ', ' + data[1] +
               ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    body.style.backgroundColor =  rgba;
    position.textContent = "position: ("+x+","+y+")";
    
    
    var red = data[0];
    var green = data[1];
    var blue = data[2];
    color.textContent = "color: " + rgbToHex(red, green, blue);
    redP.textContent = "red: " + red;
    greenP.textContent = "green: " + green;
    blueP.textContent = "blue: " + blue;

    var cubie = util.intToPocketCube(util.RGBToInt(255 - blue, red, green));
    orientation.textContent = "orientation: " + Math.floor(cubie["orientation"]);
    permutation.textContent = "permutation: " + cubie["permutation"];


}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

canvas.addEventListener('mousemove', pick);

draw();
