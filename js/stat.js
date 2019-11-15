'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 14;


var messages = ['Ура вы победили!', 'Список результатов: '];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var drawText = function (ctx, message, x, y, font, color) {
  ctx.fillStyle = color || '#000000';
  ctx.font = font || '16px PT Mono';
  ctx.fillText(message, x, y);
};

var drawGists = function (ctx, names, times) {
  var GIST_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var COLUMN_MARGIN = 50;
  var GIST_Y = CLOUD_Y + GAP + FONT_GAP + GAP * messages.length;
  var COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {

    if (names[i] === 'Вы') { // Делаем рандомную насыщенность
      ctx.fillStyle = COLUMN_COLOR;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
    }
    var drawGist = function (ctx, x, y, color) { // Функция для отрисовки графиков
      ctx.fillStyle = color;
      ctx.fillRect(x, y, COLUMN_WIDTH, gistHeightStep);
    };
    var gistHeightStep = (-GIST_HEIGHT * times[i]) / maxTime;
    drawGist(ctx, CLOUD_X + COLUMN_MARGIN + (COLUMN_MARGIN + COLUMN_WIDTH) * i, GIST_Y + FONT_GAP + FONT_GAP + GIST_HEIGHT);
    drawText(ctx, names[i], CLOUD_X + COLUMN_MARGIN + (COLUMN_MARGIN + COLUMN_WIDTH) * i, GIST_Y + COLUMN_MARGIN + GIST_HEIGHT);
    drawText(ctx, Math.round(times[i]), CLOUD_X + COLUMN_MARGIN + (COLUMN_MARGIN + COLUMN_WIDTH) * i, GIST_Y + FONT_GAP);
  }
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  for (var j = 0; j < messages.length; j++) {
    drawText(ctx, messages[j], CLOUD_X + GAP, CLOUD_Y + GAP + GAP + (FONT_GAP) * j);
  }
  drawGists(ctx, names, times);
};
