'use strict';

(function () {

  var DEFAULT_STATE = 'any';

  var Price = {
    MAX: 50000,
    MIN: 10000
  };

  var filterFeature = {
    'housing-type': {
      'value': DEFAULT_STATE,
      'getFeature': function (advert) {
        return advert.offer.type === filterFeature['housing-type']['value'];
      }
    },
    'housing-price': {
      'value': DEFAULT_STATE,
      'getFeature': function (advert) {
        switch (filterFeature['housing-price']['value']) {
          case 'low':
            return advert.offer.price < Price.MIN;
          case 'middle':
            return advert.offer.price >= Price.MIN && advert.offer.price <= Price.MAX;
          case 'high':
            return advert.offer.price > Price.MAX;
          default:
            return false;

        }
      }
    },
    'housing-rooms': {
      'value': DEFAULT_STATE,
      'getFeature': function (advert) {
        return advert.offer.rooms === parseFloat(filterFeature['housing-rooms']['value']);
      }
    },
    'housing-guests': {
      'value': DEFAULT_STATE,
      'getFeature': function (advert) {
        return advert.offer.guests === parseFloat(filterFeature['housing-guests']['value']);
      }
    }
  };

  var mapElement = document.querySelector('.map');
  var featuresElement = mapElement.querySelector('.map__features');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterElements = filtersElement.querySelectorAll('.map__filter');
  var housingFeaturesElement = filtersElement.querySelector('#housing-features');

  var ads = null;

  var filterCorrectAdverts = function (adverts) {
    return adverts.filter(function (advert) {
      return !!advert.offer;
    });
  };

  var toggleDisabledStateOfFilters = function (isDisabled) {
    window.util.toggleDisabledStateOfElements(filterElements, isDisabled);
    featuresElement.disabled = isDisabled;
  };

  var activateFilters = function (adverts) {
    if (!ads) {
      ads = filterCorrectAdverts(adverts);
      toggleDisabledStateOfFilters(false);
      window.pins.render(ads);
      return;
    }

    window.pins.render(adverts);
  };

  var deactivateFilters = function () {
    ads = null;

    filtersElement.reset();
    toggleDisabledStateOfFilters(true);
  };

  var filteredByInput = function (advert) {
    var inputValues = [];

    var inputFeaturesElements = housingFeaturesElement.querySelectorAll('input:checked');
    if (!inputFeaturesElements.length) {
      return true;
    }

    inputFeaturesElements.forEach(function (element) {
      inputValues.push(element.value);
    });

    return advert.offer.features.length === inputValues.length && advert.offer.features.every(function (feature, i) {
      return feature === inputValues[i];
    });
  };

  var isDefaultValue = function (feature) {
    return filterFeature[feature].value === DEFAULT_STATE;
  };

  var getSelectAdverts = function (value, advert) {
    return isDefaultValue(value) ? true : filterFeature[value].getFeature(advert);
  };

  var filterAds = window.debounce(function () {

    var filterAdverts = ads.filter(function (advert) {
      var filterByType = getSelectAdverts('housing-type', advert);
      var filterByPrice = getSelectAdverts('housing-price', advert);
      var filterByRooms = getSelectAdverts('housing-rooms', advert);
      var filterByGuests = getSelectAdverts('housing-guests', advert);
      var filterByFeatures = filteredByInput(advert);

      return filterByType && filterByPrice && filterByRooms && filterByGuests && filterByFeatures;
    });

    window.pins.show(filterAdverts);
  });

  filtersElement.addEventListener('change', function (evt) {
    var target = evt.target;

    if (target.tagName === 'SELECT') {
      filterFeature[target.name]['value'] = target.value;
    }

    window.card.hide();
    window.pins.hide();
    filterAds();
  });

  window.filters = {
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
