'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var pinsElement = document.querySelector('.map__pins');

  var renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (advert) {
      fragment.appendChild(window.pin.render(advert));
    });

    pinsElement.appendChild(fragment);
  };

  var showPins = function (adverts) {
    renderPins(adverts);

    mapElement.classList.remove('map--faded');
  };

  window.pins = {
    show: showPins
  };
})();
