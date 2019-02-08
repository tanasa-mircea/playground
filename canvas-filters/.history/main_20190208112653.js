var config = {
  canvasWidth: 1200,
  canvasHeight: 600
}

var canvas,
    canvasContext,
    image,
    imageData;


function initCanvas() {
  canvas = document.getElementById("myCanvas");
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  canvasContext = canvas.getContext("2d");
  image = document.getElementById("bamboo");
  canvasContext.drawImage(image, 0, 0, config.canvasWidth, config.canvasHeight);
  imageData = canvasContext.getImageData(0, 0, config.canvasWidth, config.canvasHeight);

  // applyFilter(makeGrayscale, imageData);
  // applyFilter(adjustBrightness, imageData, {
  //   change: 50
  // });
  applyFilter(makeSepia, imageData);
}

function applyFilter(filterFunction, data, options) {
  var mutatedPixels = filterFunction(data, options);
  canvasContext.putImageData(mutatedPixels, 0, 0);
}

function makeGrayscale(pixels) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    var r = data[i];
    var g = data[i+1];
    var b = data[i+2];
    var mutatedColors = .5*r + .5*g + .5*b;
    data[i] = data[i+1] = data[i+2] = mutatedColors
  }
  return pixels;
}

function adjustBrightness(pixels, options) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    data[i] += options.change;
    data[i+1] += options.change;
    data[i+2] += options.change;
  }
  return pixels;
}

function makeSepia(pixels) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    var r = data[i];
    var g = data[i+1];
    var b = data[i+2];
  }
  return pixels;
}

window.onload = function() {
  initCanvas();
}