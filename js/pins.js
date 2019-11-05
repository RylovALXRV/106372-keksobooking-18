'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var pinsElement = document.querySelector('.map__pins');

  var currentPin = null;

  var resetCurrentPin = function () {
    currentPin = null;
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
        window.card.hide();
        window.card.show(advert);

        document.addEventListener('keydown', window.map.onPopupEsc);
      }

      currentPin = pinElement;
    });

    return pinElement;
  };

  var renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (advert) {
      fragment.appendChild(renderPin(advert));
    });

    pinsElement.appendChild(fragment);
  };

  var showPins = function (adverts) {
    renderPins(adverts);

    mapElement.classList.remove('map--faded');
  };

  window.pins = {
    reset: resetCurrentPin,
    show: showPins
  };
})();
