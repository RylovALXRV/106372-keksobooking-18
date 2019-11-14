'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters-container');

  var getAccommodationType = function (type) {
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

    if (!features.length) {
      return false;
    }

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

    if (!photos.length) {
      return false;
    }

    photos.forEach(function (photo) {
      var photoElement = photoTemplate.cloneNode(true);

      photoElement.src = photo;

      fragment.appendChild(photoElement);
    });

    return fragment;
  };

  var getUserName = function (photo) {
    var photoLastSlashIndex = photo.lastIndexOf('/');
    var photoName = photo.slice(photoLastSlashIndex + 1);

    return photoName.split('.')[0];
  };

  var hideCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };

  var showFeaturesCard = function (parent, features, selector) {
    var parentElement = parent.querySelector(selector);
    var childElements = features;

    if (!childElements) {
      parentElement.classList.add('hidden');
      return;
    }

    parentElement.appendChild(childElements);
  };

  var showCard = function (advert) {
    var popupElement = cardTemplate.cloneNode(true);
    var avatarElement = popupElement.querySelector('.popup__avatar');

    avatarElement.alt = getUserName(advert.author.avatar);
    avatarElement.src = advert.author.avatar;
    popupElement.querySelector('.popup__description').textContent = advert.offer.description;
    popupElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    popupElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для '
      + advert.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin
      + ', выезд до ' + advert.offer.checkout;
    popupElement.querySelector('.popup__title').textContent = advert.offer.title;
    popupElement.querySelector('.popup__type').textContent = getAccommodationType(advert.offer.type);

    showFeaturesCard(popupElement, getFeatures(advert.offer.features), '.popup__features');
    showFeaturesCard(popupElement, getPhotos(advert.offer.photos), '.popup__photos');

    popupElement.querySelector('.popup__close').addEventListener('click', function () {
      window.map.closePopup();
    });

    mapElement.insertBefore(popupElement, filtersElement);
  };

  window.card = {
    hide: hideCard,
    show: showCard
  };
})();
