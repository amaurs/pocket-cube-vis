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
    },
    toNum: function(value){
        var aux = parseInt(value);
        return aux ? aux : 0;
    },
    getNthTernary: function(index){
        return util.toTernary(index).toString().padStart(8, "0").split("").map(util.toNum);
    },
    getNthPermutation: function(index, set){
        var factoradic = util.toFactoradic(index);
        var arr = new Array(set.length).fill(0);
        var result = new Array(set.length);
        var numbers = set.splice(0);
        for(var i = numbers.length - 1; factoradic > 0; factoradic = Math.floor(factoradic / 10))
        {
            arr[i] = factoradic % 10;
            i--;
        }
        for(var i = 0; i < arr.length; i++)
        {
            result[i] = numbers.splice(arr[i],1)[0];
        }
        return result;
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
    
    var orientationPocket = Math.floor(cubie["orientation"]);
    var permutationPocket = cubie["permutation"]

    orientation.textContent = "orientation: " + orientationPocket;
    permutation.textContent = "permutation: " + permutationPocket;

    paintPocket(orientationPocket, permutationPocket);


}

function paintCubie(faces, colors, rotation) {
    console.log(faces);
    console.log(colors);
    document.getElementById('face-' + faces[(rotation + 0) % 3]).classList.add(colors[0]);
    document.getElementById('face-' + faces[(rotation + 1) % 3]).classList.add(colors[1]);
    document.getElementById('face-' + faces[(rotation + 2) % 3]).classList.add(colors[2]);
}

function clearPocket(){
    for(var i = 0; i < cubies.length;i++) {
        document.getElementById('face-' + cubies[i][0]).classList.remove("red", "white", "blue","yellow", "green", "orange");
        document.getElementById('face-' + cubies[i][1]).classList.remove("red", "white", "blue","yellow", "green", "orange");
        document.getElementById('face-' + cubies[i][2]).classList.remove("red", "white", "blue","yellow", "green", "orange");
    }
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

var cubies = [[1,2,3], [5,14,6], [7,20,15], [17,10,22],[18,12,11],[24,13,4], [9,8,16], [23,19,21]];
var colors = [["red", "white", "blue"],["red", "green", "white"],["white", "green", "orange"],["yellow", "blue", "orange"],["yellow", "red", "blue"],["yellow", "green", "red"],["blue", "white", "orange"],["yellow", "green", "orange"]];

function paintPocket(orientation, permutation){
    
    var orientationArray = util.getNthTernary(orientation);
    var permutationArray = util.getNthPermutation(permutation, [0,1,2,3,4,5,6,7]);

    console.log(orientationArray);
    console.log(permutationArray);

    clearPocket();

    for(var i = 0; i < 8; i++) {
        paintCubie(cubies[permutationArray[i]],colors[i],orientationArray[i]);
    }
}






