'use strict';

(function () {

  var KEYCODE_ESC = 13;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var currentPin = null;

  // =>
  var onPopupEscKeydown = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      closePopup();
    }
  };

  var closePopup = function () {
    window.card.hide();

    document.removeEventListener('keydown', onPopupEscKeydown);
  };
  // <= так и не понял где правильно это писать и использовать

  var renderPin = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    var imgElement = pinElement.querySelector('.map__pin img');

    pinElement.style.left = advert.location.x + 'px';
    pinElement.style.top = advert.location.y + 'px';
    imgElement.alt = advert.offer.title;
    imgElement.src = advert.author;

    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      var currentTarget = evt.currentTarget;

      if (currentTarget !== currentPin) {
        window.card.append(advert);

        document.addEventListener('keydown', onPopupEscKeydown);
      }

      currentPin = pinElement;
    });

    return pinElement;
  };

  window.pin = {
    render: renderPin
  };
})();
