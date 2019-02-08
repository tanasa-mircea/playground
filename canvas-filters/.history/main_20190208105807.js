var config = {
  canvasWidth: 1200,
  canvasHeight: 600
}

var canvas,
    canvasContext,
    image;


function initCanvas() {
  canvas = document.getElementById("myCanvas");
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  canvasContext = canvas.getContext("2d");
  image = document.getElementById("bamboo");
  canvasContext.drawImage(image, 0, 0, config.canvasWidth, config.canvasWidth);
}

window.onload = function() {
  initCanvas();
}