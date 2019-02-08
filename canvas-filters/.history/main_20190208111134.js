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

  var grayscalePixels = makeGrayscale(imageData)
  canvasContext.putImageData(grayscalePixels);
}

function makeGrayscale(pixels, options) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    var r = data[i];
    var g = data[i+1];
    var b = data[i+2];
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
}

window.onload = function() {
  initCanvas();
}