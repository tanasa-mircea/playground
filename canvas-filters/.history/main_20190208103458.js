var config = {
  canvasWidth: 300,
  canvasHeight: 300,
  imgUrl: "https://www.html5rocks.com/en/tutorials/canvas/imagefilters/demo_small.png"
}

var canvas,
    canvasContext;

function initCanvas() {
  canvas = document.createElement("canvas");
  canvas.height = config.canvasHeight;
  canvas.width = config.canvasWidth;
  document.body.appendChild(canvas);

  canvasContext = canvas.getContext("2d");

}

function getImage() {
  var image = document.createElement("img");
  image.src = config.imgUrl;
  canvasContext.drawImage(image);
}


var canvas = document.getElementsByClassName("canvas")[0];
console.log(canvas);