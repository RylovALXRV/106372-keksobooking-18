'use strict';

(function () {

  var Pin = {
    START_HEIGHT: 65,
    TOTAL_HEIGHT: 81,
    WIDTH: 65
  };

  var CoordY = {
    MAX: 630,
    MIN: 130
  };

  var mapElement = document.querySelector('.map');
  var pinMainElement = mapElement.querySelector('.map__pin--main');

  var mapParameter = null;
  var pinCenterX = Pin.WIDTH / 2;

  var Coord = function (locationX, locationY) {
    this.x = locationX;
    this.y = locationY;
  };

  Coord.prototype.getElementLocation = function (locationX, locationY) {
    return parseFloat(locationX) + ', ' + parseFloat(locationY);
  };

  Coord.prototype.setResultCoords = function (coord) {
    if (coord.x <= 0) {
      coord.x = 0;
    } else if (coord.x >= mapParameter.width - Pin.WIDTH) {
      coord.x = mapParameter.width - Pin.WIDTH;
    } else if (coord.y <= CoordY.MIN) {
      coord.y = CoordY.MIN;
    } if (coord.y >= CoordY.MAX) {
      coord.y = CoordY.MAX;
    }
  };

  Coord.prototype.setElementCoord = function (coord) {
    window.form.setAddress(coord.getElementLocation(Math.round(coord.x + pinCenterX), Math.round(coord.y + Pin.TOTAL_HEIGHT)));

    pinMainElement.style.left = coord.x + 'px';
    pinMainElement.style.top = coord.y + 'px';
  };

  var mainPinCoord = new Coord();

  pinMainElement.addEventListener('mousedown', function (evt) {
    window.page.activate();

    mapParameter = window.map.getParameter();
    mainPinCoord = new Coord(evt.clientX, evt.clientY);

    var onMainPinMousemove = function (evtMove) {
      var shift = new Coord(mainPinCoord.x - evtMove.clientX, mainPinCoord.y - evtMove.clientY);
      mainPinCoord = new Coord(evtMove.clientX, evtMove.clientY);
      var result = new Coord(pinMainElement.offsetLeft - shift.x, pinMainElement.offsetTop - shift.y);

      result.setResultCoords(result);
      result.setElementCoord(result);
    };

    var onMainPinMouseUp = function () {
      // В задании написано:
      /*
      * Учтите, расчёт координат метки и их запись в поле адреса должна дублироваться и в обработчике mouseup,
      * потому что в некоторых случаях пользователь может нажать мышь на метке, но никуда её не переместить.
      * Напишите универсальную функцию расчёта координат, чтобы избавиться от дублирования кода.*/

      // Но я не пойму зачем, если при mousedown в начале уже записываются координаты в адресс??
      document.removeEventListener('mousemove', onMainPinMousemove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };

    document.addEventListener('mousemove', onMainPinMousemove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });

  pinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEYCODE_ENTER && document.classList.contains('.map map--faded')) {
      window.page.activate();
    }
  });

  window.mainPin = {
    activeLocation: mainPinCoord.getElementLocation(Math.round(pinMainElement.offsetLeft + pinCenterX),
        Math.round(pinMainElement.offsetTop + Pin.TOTAL_HEIGHT)),
    initLocation: mainPinCoord.getElementLocation(Math.round(pinMainElement.offsetLeft + pinCenterX),
        Math.round(pinMainElement.offsetTop + Pin.START_HEIGHT / 2))
  };
})();
