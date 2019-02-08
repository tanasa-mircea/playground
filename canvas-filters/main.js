var config = {
  canvasWidth: 1200,
  canvasHeight: 600
}

var canvas,
    canvasContext,
    image,
    imageData;

var availableFilters = [
  {
    filterFunction: makeGrayscale,
    name: "Grayscale"
  }, {
    filterFunction: makeSepia,
    name: "Sepia"
  }, {
    filterFunction: makeThreshold,
    options: {
      limit: 150
    },
    name: "Threshold"
  }, {
    filterFunction: makeInvert,
    name: "Invert"
  }, {
    filterFunction: adjustBrightness,
    options: {
      change: 50
    },
    name: "Lighten"
  }, {
    filterFunction: adjustBrightness,
    options: {
      change: -50
    },
    name: "Darken"
  }, {
    filterFunction: makeBlur,
    options: {
      change: 2
    },
    name: "Blur"
  }
]

function initCanvas() {
  canvas = document.getElementById("myCanvas");
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  canvasContext = canvas.getContext("2d");
  image = document.getElementById("bamboo");
  canvasContext.drawImage(image, 0, 0, config.canvasWidth, config.canvasHeight);
  imageData = canvasContext.getImageData(0, 0, config.canvasWidth, config.canvasHeight);
}

function applyFilter(filterFunction, data, options) {
  var mutatedPixels = filterFunction(data, options);
  canvasContext.putImageData(mutatedPixels, 0, 0);
}

function makeGrayscale(pixels) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    var red = data[i];
    var green = data[i+1];
    var blue = data[i+2];
    var mutatedColors = .5 * red + .5 * green + .5 * blue;
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
    var red = data[i];
    var green = data[i+1];
    var blue = data[i+2];

    data[i] = (red * .393) + (green *.769) + (blue * .189)
    data[i + 1] = (red * .349) + (green *.686) + (blue * .168)
    data[i + 2] = (red * .272) + (green *.534) + (blue * .131)
  }
  return pixels;
}

function makeThreshold(pixels, options) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    var red = data[i];
    var green = data[i+1];
    var blue = data[i+2];

    if (red + green + blue < options.limit) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    } else {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }
  return pixels;
}

function makeInvert(pixels) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  return pixels;
}

function makeBlur(pixels, options) {
  var data = pixels.data;
  for (var i=0; i<data.length; i+=4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  return pixels;
}

function createButton(config) {
  var btn = document.createElement("button");
  btn.innerText = config.name;
  btn.addEventListener("click", applyFilter.bind(this, config.filterFunction, imageData, config.options));
  return btn;
}

function initButtons() {
  var wrapper = document.getElementById("filter-wrapper");

  for (let i = 0; i < availableFilters.length; i++) {
    var button = createButton(availableFilters[i]);
    wrapper.appendChild(button);
  }
}

window.onload = function() {
  initCanvas();
  initButtons();
}