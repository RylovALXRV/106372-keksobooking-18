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
          return advert.offer.type === filterFeature['housing-type']['value'];
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
          return advert.offer.rooms === parseFloat(filterFeature['housing-rooms']['value']);
        };
      }
    },
    'housing-guests': {
      'value': DEFAULT_STATE,
      'getFeature': function () {
        return function (advert) {
          return advert.offer.guests === parseFloat(filterFeature['housing-guests']['value']);
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
