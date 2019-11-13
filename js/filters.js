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
      'getFeature': function () {
        return function (advert) {
          switch (filterFeature['housing-type']['value']) {
            case 'palace':
            case 'flat':
            case 'house':
            case 'bungalo':
              return advert.offer.type === filterFeature['housing-type']['value'];
            default:
              return false;
          }
        };
      }
    },
    'housing-price': {
      'value': DEFAULT_STATE,
      'getFeature': function () {
        return function (advert) {
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
        };
      }
    },
    'housing-rooms': {
      'value': DEFAULT_STATE,
      'getFeature': function () {
        return function (advert) {
          switch (filterFeature['housing-rooms']['value']) {
            case '1':
              return advert.offer.rooms === 1;
            case '2':
              return advert.offer.rooms === 2;
            case '3':
              return advert.offer.rooms === 3;
            default:
              return false;
          }
        };
      }
    },
    'housing-guests': {
      'value': DEFAULT_STATE,
      'getFeature': function () {
        return function (advert) {
          switch (filterFeature['housing-guests']['value']) {
            case '0':
              return advert.offer.guests > 2;
            case '1':
              return advert.offer.guests === 1;
            case '2':
              return advert.offer.guests === 2;
            default:
              return false;
          }
        };
      }
    }
  };

  var mapElement = document.querySelector('.map');
  var featuresElement = mapElement.querySelector('.map__features');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterElements = filtersElement.querySelectorAll('.map__filter');
  var housingFeaturesElement = filtersElement.querySelector('#housing-features');

  var ads = null;
  var inputValues = [];

  var toggleDisabledStateOfFilters = function (isDisabled) {
    window.util.toggleDisabledStateOfElements(filterElements, isDisabled);
    featuresElement.disabled = isDisabled;
  };

  var activateFilters = function (adverts) {
    if (!ads) {
      ads = adverts;
      toggleDisabledStateOfFilters(false);
    }

    window.pins.render(adverts);
  };

  var deactivateFilters = function () {
    ads = null;

    filtersElement.reset();
    toggleDisabledStateOfFilters(true);
  };

  var filteredBySelect = function (adverts, filterName) {
    if (filterFeature[filterName]['value'] === DEFAULT_STATE) {
      return adverts;
    }
    return adverts.filter(filterFeature[filterName]['getFeature']());
  };

  var filteredByInput = function (adverts) {
    var inputFeaturesElements = housingFeaturesElement.querySelectorAll('input:checked');

    if (!inputFeaturesElements.length) {
      return adverts;
    }

    inputFeaturesElements.forEach(function (element) {
      inputValues.push(element.value);
    });

    return adverts.filter(function (advert) {
      return advert.offer.features.length === inputValues.length && advert.offer.features.every(function (feature, i) {
        return feature === inputValues[i];
      });
    });
  };

  var filterAds = window.debounce(function () {
    var filteredAds = filteredBySelect(ads, 'housing-type');
    filteredAds = filteredBySelect(filteredAds, 'housing-price');
    filteredAds = filteredBySelect(filteredAds, 'housing-rooms');
    filteredAds = filteredBySelect(filteredAds, 'housing-guests');
    filteredAds = filteredBySelect(filteredAds, 'housing-guests');
    filteredAds = filteredByInput(filteredAds);

    window.pins.show(filteredAds);
  });

  filtersElement.addEventListener('change', function (evt) {
    var target = evt.target;

    if (target.tagName === 'SELECT') {
      filterFeature[target.name]['value'] = target.value;
    }

    window.card.hide();
    window.pins.hide();
    filterAds();

    inputValues = [];
  });

  window.filters = {
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
