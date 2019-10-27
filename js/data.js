'use strict';

(function () {

  var AMOUNT_ADVERTS = 8;
  var advertParams = {
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    TIMES: ['12:00', '13:00', '14:00'],
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
      'Маленький ужасный дворец', 'Красивый гостевой домик',
      'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPES: ['palace', 'flat', 'house', 'bungalo']
  };

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var generateParams = function (max, element) {
    var amount = getRandomNumber(1, max);
    var params = [];

    while (params.length !== amount) {
      var param = getRandomElement(element);

      if (~params.indexOf(param)) {
        continue;
      }

      params.push(param);
    }

    return params;
  };

  var generateAdverts = function () {
    var adverts = [];

    for (var i = 1; i <= AMOUNT_ADVERTS; i++) {
      adverts.push({
        author: 'img/avatars/user0' + i + '.png',
        location: {
          x: getRandomNumber(130, 630),
          y: getRandomNumber(130, 630)
        },
        offer: {
          address: '600, 350',
          checkin: getRandomElement(advertParams.TIMES),
          checkout: getRandomElement(advertParams.TIMES),
          description: 'описание ' + i,
          features: generateParams(advertParams.FEATURES.length, advertParams.FEATURES),
          guests: getRandomNumber(1, 5),
          photos: generateParams(advertParams.PHOTOS.length, advertParams.PHOTOS),
          price: getRandomNumber(1e3, 1e6),
          rooms: getRandomNumber(1, 5),
          title: advertParams.TITLES[i - 1],
          type: getRandomElement(advertParams.TYPES)
        }
      });
    }

    return adverts;
  };

  window.data = {
    adverts: generateAdverts
  };

})();
