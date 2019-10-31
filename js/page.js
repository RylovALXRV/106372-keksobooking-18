'use strict';

(function () {

  var pinMainElement = document.querySelector('.map .map__pin--main');

  var isPageActive = null;

  var activatePage = function () {
    if (isPageActive) {
      isPageActive = false;

      window.pins.show(window.data.generate());
      window.form.activate();
      window.map.toggleStateFilters(isPageActive);
    }
  };

  var deactivatePage = function () {
    isPageActive = true;

    window.form.init();
    window.map.toggleStateFilters(isPageActive);
  };

  deactivatePage();

  pinMainElement.addEventListener('mousedown', function () {
    activatePage();
  });

  pinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEYCODE_ENTER && document.classList.contains('.map map--faded')) {
      activatePage();
    }
  });
})();
