'use strict';

(function () {

  var ROOMS_MAX = 100;

  var Feature = {
    'room_number': function (target) {
      roomsValue = parseFloat(target.value);
    },
    'capacity': function (target) {
      capacityValue = target.value;
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
