var config = {
  canvasWidth: 300,
  canvasHeight: 300
}

var canvas,
    canvasContext,
    image;

function initCanvas() {
  canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  canvas.height = config.canvasHeight;
  canvas.width = config.canvasWidth;

  canvasContext = canvas.getContext("2d");
  image = document.getElementById("image");
  canvasContext.drawImage(image, config.canvasWidth, config.canvasHeight, 0, 0);
}

setTimeout(function() {
  initCanvas();

}, 1000)