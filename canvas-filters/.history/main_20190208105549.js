var config = {
  canvasWidth: 1200,
  canvasHeight: 600
}

var canvas,
    canvasContext,
    image;


function initCanvas() {
  canvas = document.getElementById("myCanvas");
  canvas.height = config.canvasHeight;
  canvas.width = config.canvasWidth;
  canvasContext = canvas.getContext("2d");
  image = document.getElementById("bamboo");
  canvasContext.drawImage(image, 10, 10, 150, 180);
}

window.onload = function() {
  initCanvas();
}