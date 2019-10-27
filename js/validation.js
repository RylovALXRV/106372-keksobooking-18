'use strict';

(function () {

  var ROOMS_MAX = 100;

  var priceTypeOfHousing = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var Feature = {
    'room_number': function (target) {
      roomsValue = parseFloat(target.value);
    },
    'capacity': function (target) {
      capacityValue = target.value;
    },
    'timein': function (target) {
      document.querySelector('#timeout').value = target.value;
    },
    'timeout': function (target) {
      document.querySelector('#timein').value = target.value;
    },
    'type': function (target) {
      var priceInputElement = document.querySelector('#price');

      priceInputElement.min = priceTypeOfHousing[target.value];
      priceInputElement.placeholder = priceTypeOfHousing[target.value];
    }
  };

  var NumberRooms = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var adFormElement = document.querySelector('.ad-form');
  var capacityElement = adFormElement.querySelector('#capacity');
  var roomsElement = adFormElement.querySelector('#room_number');

  var roomsValue = parseFloat(roomsElement.value);
  var capacityValue = null;

  var checkCapacity = function () {
    var textError = 'Количество мест должно быть ';
    var seats = NumberRooms[roomsValue];

    if (!~seats.indexOf(capacityValue)) {
      textError = (roomsValue !== ROOMS_MAX) ? textError + 'не больше ' + seats.length : textError + '\'не для гостей\'';
    } else {
      textError = '';
    }

    capacityElement.setCustomValidity(textError);
  };

  adFormElement.addEventListener('input', function (evt) {
    var target = evt.target;

    var matches = Object.keys(Feature).some(function (feature) {
      return feature === target.id;
    });

    if (!matches) {
      return;
    }

    Feature[target.id](target);

    checkCapacity();
  });
})();
