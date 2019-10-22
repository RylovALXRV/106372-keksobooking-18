'use strict';

/* ----- Личный проект: пока все дома ----- */

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

var mapElement = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsElement = document.querySelector('.map__pins');

var elementDisabled = false;

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


var renderPin = function (advert) {
  var pinElement = pinTemplate.cloneNode(true);
  var imgElement = pinElement.querySelector('.map__pin img');

  pinElement.style.left = advert.location.x + 'px';
  pinElement.style.top = advert.location.y + 'px';
  imgElement.alt = advert.offer.title;
  imgElement.src = advert.author;

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

var adverts = generateAdverts();

/* ----- Личный проект: больше деталей ----- */

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var filters = mapElement.querySelector('.map__filters-container');
var photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');

var getTypeHouse = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return 'Тип жилья не известен';
  }
};

var getFeatures = function (features) {
  var fragment = document.createDocumentFragment();

  features.forEach(function (feature) {
    var itemElement = document.createElement('li');
    itemElement.classList.add('popup__feature');
    itemElement.classList.add('popup__feature--' + feature);

    fragment.appendChild(itemElement);
  });

  return fragment;
};

var getPhotos = function (photos) {
  var fragment = document.createDocumentFragment();

  photos.forEach(function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.src = photo;

    fragment.appendChild(photoElement);
  });

  return fragment;
};

var appendCard = function (advert) {
  var popupElement = cardTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = advert.author;
  popupElement.querySelector('.popup__description').textContent = advert.offer.description;
  popupElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  popupElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для '
    + advert.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin
    + ', выезд до ' + advert.offer.checkout;
  popupElement.querySelector('.popup__title').textContent = advert.offer.title;
  popupElement.querySelector('.popup__type').textContent = getTypeHouse(advert.offer.type);

  popupElement.querySelector('.popup__features').appendChild(getFeatures(advert.offer.features));
  popupElement.querySelector('.popup__photos').appendChild(getPhotos(advert.offer.photos));

  mapElement.insertBefore(popupElement, filters);
};

if (elementDisabled) {
  appendCard(adverts[0]);
}


/* ----- Личный проект: подробности ----- */

var KEYCODE_ENTER = 13;

var StatePage = {
  ACTIVE: false,
  INACTIVE: true
};

var adFormElement = document.querySelector('.ad-form');
var inputAddressElement = adFormElement.querySelector('#address');
var fieldsetElements = adFormElement.querySelectorAll('fieldset');
var filtersElement = mapElement.querySelector('.map__filters');
var filterElements = filtersElement.querySelectorAll('.map__filter');
var featuresElement = mapElement.querySelector('.map__features');
var pinMainElement = mapElement.querySelector('.map__pin--main');
var pinImgElement = pinMainElement.querySelector('img');

var Coord = function (coord) {
  this.height = coord.height;
  this.left = coord.left + window.pageXOffset;
  this.top = coord.top + window.pageYOffset;
  this.width = coord.width;
};

var getPinLocation = function (locationX, locationY) {
  return parseFloat(locationX) + ', ' + parseFloat(locationY);
};

var setAddressPinLocationInactive = function () {
  var pinMainCoords = new Coord(pinMainElement.getBoundingClientRect());

  inputAddressElement.value = getPinLocation(Math.round(pinMainCoords.left + pinMainCoords.width / 2),
      Math.round(pinMainCoords.top + pinMainCoords.height / 2));
};

var setAddressPinLocationActive = function () {
  var pinImgCoords = new Coord(pinImgElement.getBoundingClientRect());
  var pinAfterElement = getComputedStyle(pinMainElement, '::after');

  inputAddressElement.value = getPinLocation(Math.round(pinImgCoords.left + pinImgCoords.width / 2),
      Math.round(pinImgCoords.top + pinImgCoords.height + parseFloat(pinAfterElement.borderTopWidth)));
};

var setStateElements = function (elements, flag) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = flag;
  }
};

var setStatePage = function (flag) {
  setStateElements(fieldsetElements, flag);
  setStateElements(filterElements, flag);
  featuresElement.disabled = flag;
};

var setActiveState = function (flag) {
  if (adFormElement.classList.contains('ad-form--disabled')) {
    adFormElement.classList.remove('ad-form--disabled');

    showPins(adverts);
    setAddressPinLocationActive();
    setStatePage(flag);
  }
};

var setInactiveState = function (flag) {
  setAddressPinLocationInactive();
  setStatePage(flag);
};

var activateStatePage = function (flag) {
  if (!flag) {
    setActiveState(flag);
    return;
  }

  setInactiveState(flag);
};

activateStatePage(StatePage.INACTIVE);

pinMainElement.addEventListener('mousedown', function () {
  activateStatePage(StatePage.ACTIVE);
});

pinMainElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    activateStatePage(StatePage.ACTIVE);
  }
});
