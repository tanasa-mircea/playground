var config = {
  canvasWidth: 1200,
  canvasHeight: 600
}

var canvas,
    canvasContext,
    image;

function initCanvas() {
  canvas = document.getElementById("canvas");
  // canvas.height = config.canvasHeight;
  // canvas.width = config.canvasWidth;

  canvasContext = canvas.getContext("2d");
  image = document.getElementById("image");
  debugger
  canvasContext.drawImage(image, config.canvasWidth, config.canvasHeight, 0, 0);
}

// window.onload = function() {
//   initCanvas();
// }

window.onload = function() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("scream");
  ctx.drawImage(img, 10, 10, 150, 180);
}