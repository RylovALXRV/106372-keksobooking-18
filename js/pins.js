'use strict';

(function () {

  var AMOUNT_PINS = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var pinsElement = document.querySelector('.map__pins');

  var currentPin;

  var hidePins = function () {
    var pinElements = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');

    pinElements.forEach(function (pinElement) {
      pinElement.remove();
    });
  };

  var resetCurrentPin = function (element) {
    if (currentPin) {
      currentPin.classList.remove('map__pin--active');
    }
    currentPin = element;
  };

  var renderPin = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    var imgElement = pinElement.querySelector('.map__pin img');

    pinElement.style.left = advert.location.x + 'px';
    pinElement.style.top = advert.location.y + 'px';
    imgElement.alt = advert.offer.title;
    imgElement.src = advert.author.avatar;

    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      var currentTarget = evt.currentTarget;

      if (currentTarget !== currentPin) {
        pinElement.classList.add('map__pin--active');

        window.card.hide();
        window.card.show(advert);

        document.addEventListener('keydown', window.map.onPopupEsc);
      }

      resetCurrentPin(pinElement);
    });

    return pinElement;

  };

  var renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();

    adverts = (adverts.length > AMOUNT_PINS) ? adverts.slice(0, 5) : adverts;

    adverts.forEach(function (advert) {
      fragment.appendChild(renderPin(advert));
    });

    pinsElement.appendChild(fragment);
  };

  var showPins = function (adverts) {
    window.filters.activate(adverts);

    mapElement.classList.remove('map--faded');
  };

  window.pins = {
    hide: hidePins,
    render: renderPins,
    reset: resetCurrentPin,
    show: showPins
  };
})();
