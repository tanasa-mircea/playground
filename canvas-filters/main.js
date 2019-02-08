var config = {
  canvasWidth: 1200,
  canvasHeight: 600
}

var canvas,
    canvasContext,
    image,
    imageData,
    cachedImageData;

var availableFilters = [{
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
    name: "Blur"
  }, {
    filterFunction: makeSharpen,
    name: "Sharpen"
  }, {
    filterFunction: makeEmboss,
    name: "Emboss"
  }, {
    filterFunction: makeTest,
    name: "Test"
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
  cachedImageData = new ImageData(imageData.data.slice(0), imageData.width, imageData.height);
}

function applyFilter(filterFunction, data, options) {
  var outputCanvas = document.createElement("canvas");
  outerHeight.height = config.canvasHeight;
  outerHeight.width = config.canvasWidth;
  var outputCanvasContext = outputCanvas.getContext("2d");
  outputCanvasContext.putImageData(data, 0, 0);
  var newData = outputCanvasContext.getImageData(0, 0, config.canvasWidth, config.canvasHeight)

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
  for (var i = 0; i<data.length; i+=4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  return pixels;
}

function makeBlur(pixels, options) {
  return this.convolution(pixels,
    [ 1/9, 1/9, 1/9,
      1/9, 1/9, 1/9,
      1/9, 1/9, 1/9 ], 1);
}

function makeSharpen(pixels, options) {
  return this.convolution(pixels,
    [ 0, -1,  0,
     -1,  5, -1,
      0, -1,  0 ], 1);
}

function makeEmboss(pixels, options) {
  return this.convolution(pixels,
    [ -2, -1, 0,
      -1, 1, 1,
      0, 1, 2 ], 1);
}

function makeTest(pixels, options) {
  return this.convolution(pixels,
    [ 0, 0, 1, 0, 0,
      0, 0, -1, 0, 0,
      1, -1, 2, -1, 1,
      0, 0, -1, 0, 0,
      0, 0, 1, 0, 0], 1);
}

function convolution(pixels, weights) {
  var outputCanvas = document.createElement("canvas");
  var outputCanvasContext = outputCanvas.getContext("2d");

  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;

  var output = outputCanvasContext.createImageData(w, h);
  var dst = output.data;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a;
    }
  }
  return output;
};

function createButton(btnConfig) {
  var btn = document.createElement("button");
  btn.innerText = btnConfig.name;
  btn.addEventListener("click", applyFilter.bind(this, btnConfig.filterFunction, imageData, btnConfig.options));
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