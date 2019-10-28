'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var pinMainElement = mapElement.querySelector('.map__pin--main');

  window.mainPin.deactivatePage();

  pinMainElement.addEventListener('mousedown', function () {
    window.mainPin.activatePage();
  });

  pinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEYCODE_ENTER && mapElement.classList.contains('map--faded')) {
      window.mainPin.activatePage();
    }
  });
})();
