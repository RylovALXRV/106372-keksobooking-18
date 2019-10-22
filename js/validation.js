'use strict';

(function () {

  var NumberSeat = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    ONE_HUNDRED: 100
  };

  var Feature = {
    'room_number': function (target) {
      roomsValue = parseFloat(target.value);
    },
    'capacity': function (target) {
      capacityValue = parseFloat(target.value);
    }
  };

  var TextError = {
    CAPACITY_ONE: 'Количество гостей не должно превышать одного',
    CAPACITY_TWO: 'Количество гостей не должно превышать двух',
    CAPACITY_THREE: 'Количество гостей не должно превышать трех',
    CAPACITY_ONE_HUNDRED: 'Количество мест должно быть \'не для гостей\'',
    CAPACITY_TRUE: ''
  };

  var adFormElement = document.querySelector('.ad-form');
  var capacityElement = adFormElement.querySelector('#capacity');
  var roomsElement = adFormElement.querySelector('#room_number');

  var roomsValue = parseFloat(roomsElement.value);
  var capacityValue = parseFloat(capacityElement.value);

  var checkCapacity = function () {
    var textError = null;

    if (roomsValue === NumberSeat.ONE && capacityValue !== NumberSeat.ONE) {
      textError = TextError.CAPACITY_ONE;
    } else if (roomsValue === NumberSeat.TWO && (capacityValue < NumberSeat.ONE || capacityValue > NumberSeat.TWO)) {
      textError = TextError.CAPACITY_TWO;
    } else if (roomsValue === NumberSeat.THREE && (capacityValue < NumberSeat.ONE || capacityValue > NumberSeat.THREE)) {
      textError = TextError.CAPACITY_THREE;
    } else if (roomsValue === NumberSeat.ONE_HUNDRED && capacityValue !== NumberSeat.ZERO) {
      textError = TextError.CAPACITY_ONE_HUNDRED;
    } else {
      textError = TextError.CAPACITY_TRUE;
      capacityElement.style.boxShadow = '';
    }

    capacityElement.setCustomValidity(textError);

    return textError;
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

  // если после активации формы пользователь не выбрал
  // поля комнат и количество мест - форму не отправляем.
  adFormElement.addEventListener('submit', function (evt) {
    var textError = checkCapacity();

    if (textError) {
      evt.preventDefault();
      capacityElement.style.boxShadow = '0 0 2px 2px #ff6547';
    }
  });
})();
