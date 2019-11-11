'use strict';

(function () {

  var DEFAULT_STATE = 'any';

  var filterState = {
    'housing-type': DEFAULT_STATE,
    'housing-price': DEFAULT_STATE,
    'housing-rooms': DEFAULT_STATE,
    'housing-guests': DEFAULT_STATE
  };

  var mapElement = document.querySelector('.map');
  var featuresElement = mapElement.querySelector('.map__features');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterElements = filtersElement.querySelectorAll('.map__filter');
  var housingTypeElement = filtersElement.querySelector('#housing-type');
  var housingPriceElement = filtersElement.querySelector('#housing-price');
  var housingRoomsElement = filtersElement.querySelector('#housing-rooms');
  var housingGuestsElement = filtersElement.querySelector('#housing-guests');
  var housingFeaturesElement = filtersElement.querySelector('#housing-features');

  var advertCards = null;
  var inputValues = [];

  var type = null;
  var price = null;
  var rooms = null;
  var guests = null;

  var toggleDisabledStateOfFilters = function (isDisabled) {
    window.util.toggleDisabledStateOfElements(filterElements, isDisabled);
    featuresElement.disabled = isDisabled;
  };

  var activateFilters = function (adverts) {
    if (!advertCards) {
      advertCards = adverts;
      toggleDisabledStateOfFilters(false);
    }

    window.pins.render(adverts);
  };

  var deactivateFilters = function () {
    advertCards = null;

    filtersElement.reset();
    toggleDisabledStateOfFilters(true);
  };

  var getPrice = function () {
    if (!price) {
      price = filterState['housing-price'];
    }
    return function (advert) {
      switch (price.value) {
        case 'low':
          return advert.offer.price < 10000;
        case 'middle':
          return advert.offer.price >= 10000 && advert.offer.price <= 50000;
        case 'high':
          return advert.offer.price > 50000;
        default:
          return advert;
      }
    };
  };

  var getRooms = function () {
    if (!rooms) {
      rooms = filterState['housing-rooms'];
    }
    return function (advert) {
      switch (rooms.value) {
        case '1':
          return advert.offer.rooms === 1;
        case '2':
          return advert.offer.rooms === 2;
        case '3':
          return advert.offer.rooms === 3;
        default:
          return advert;
      }
    };
  };

  var getGuests = function () {
    if (!guests) {
      guests = filterState['housing-guests'];
    }
    return function (advert) {
      switch (guests.value) {
        case '0':
          return advert.offer.guests > 2;
        case '1':
          return advert.offer.guests === 1;
        case '2':
          return advert.offer.guests === 2;
        default:
          return advert;
      }
    };
  };

  var getType = function () {
    if (!type) {
      type = filterState['housing-type'];
    }
    return function (advert) {
      switch (type.value) {
        case 'palace':
        case 'flat':
        case 'house':
        case 'bungalo':
          return advert.offer.type === type.value;
        default:
          return advert;
      }
    };
  };

  // var filterByType = function (adverts) {
  //   return adverts.filter(getType());
  // };
  //
  // var filterByPrice = function (adverts) {
  //   return adverts.filter(getPrice());
  // };
  //
  // var filterByRooms = function (adverts) {
  //   return adverts.filter(getRooms());
  // };
  //
  // var filterByGuests = function (adverts) {
  //   return adverts.filter(getGuests());
  // };
  //
  // var filterByFeatures = function (adverts) {
  //   return adverts.filter(function (advert) {
  //     if (!housingFeaturesElement.querySelectorAll('input:checked')) {
  //       return advert;
  //     }
  //     return advert.offer.features.length === inputValues.length && advert.offer.features.every(function (feature, i) {
  //       return feature === inputValues[i];
  //     });
  //   });
  // };

  var filterByAllFeatures = function () {
    return advertCards.filter(getType()).filter(getPrice()).filter(getRooms()).filter(getGuests()).filter(function (advert) {
      if (!housingFeaturesElement.querySelectorAll('input:checked').length) {
        return advert;
      }
      return advert.offer.features.length === inputValues.length && advert.offer.features.every(function (feature, i) {
        return feature === inputValues[i];
      });
    });
  };

  housingTypeElement.addEventListener('change', function (evt) {
    type = evt.target;

    // filterByType(advertCards);

    window.card.hide();
    window.pins.hide();
    window.pins.show(filterByAllFeatures());

  });

  housingPriceElement.addEventListener('change', function (evt) {
    price = evt.target;

    // filterByPrice(advertCards);

    window.card.hide();
    window.pins.hide();
    window.pins.show(filterByAllFeatures());

  });

  housingRoomsElement.addEventListener('change', function (evt) {
    rooms = evt.target;

    // filterByRooms(advertCards);

    window.card.hide();
    window.pins.hide();
    window.pins.show(filterByAllFeatures());

  });

  housingGuestsElement.addEventListener('change', function (evt) {
    guests = evt.target;

    // filterByGuests(advertCards);

    window.card.hide();
    window.pins.hide();
    window.pins.show(filterByAllFeatures());

  });

  housingFeaturesElement.addEventListener('change', function (evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    var inputFeaturesElements = housingFeaturesElement.querySelectorAll('input:checked');

    inputFeaturesElements.forEach(function (element) {
      inputValues.push(element.value);
    });

    // filterByFeatures(advertCards);

    window.card.hide();
    window.pins.hide();
    window.pins.show(filterByAllFeatures());

    inputValues = [];
  });

  window.filters = {
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
