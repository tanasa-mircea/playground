var config = {
  canvasWidth: 1200,
  canvasHeight: 600
}

var canvas,
    canvasContext,
    image;

// function initCanvas() {
//   canvas = document.getElementById("canvas");
//   // canvas.height = config.canvasHeight;
//   // canvas.width = config.canvasWidth;

//   canvasContext = canvas.getContext("2d");
//   image = document.getElementById("image");
//   debugger
//   canvasContext.drawImage(image, config.canvasWidth, config.canvasHeight, 0, 0);
// }

function initCanvas() {
  canvas = document.getElementById("myCanvas");
  canvasContext = canvas.getContext("2d");
  var img = document.getElementById("bamboo");
  canvasContext.drawImage(img, 10, 10, 150, 180);
}

window.onload = function() {
  initCanvas();
}