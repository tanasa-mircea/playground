var config = {
  canvasWidth: 300,
  canvasHeight: 300
}

var canvas,
    canvasContext,
    image;

function initCanvas() {
  canvas = document.createElement("canvas");
  canvas.height = config.canvasHeight;
  canvas.width = config.canvasWidth;

  canvasContext = canvas.getContext("2d");
  image = document.getElementById("image");
  canvasContext.drawImage(image);
  document.body.appendChild(canvas);
}

var canvas = document.getElementsByClassName("canvas")[0];

initCanvas();