'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters-container');

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

    // => поэтому здесь не могу правильно использовать ф-ию closePopup() из pin.js
    popupElement.querySelector('.popup__close').addEventListener('click', function () {
      hideCard();
    });
    // <=

    mapElement.insertBefore(popupElement, filtersElement);
  };

  var hideCard = function () {
    var cardAdvert = document.querySelector('.map__card');

    if (cardAdvert) {
      cardAdvert.remove();
    }
  };

  window.card = {
    hide: hideCard,
    append: appendCard
  };

})();
