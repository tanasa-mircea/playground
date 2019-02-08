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
}

window.onload = function() {
  initCanvas();
}