'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var featuresElement = mapElement.querySelector('.map__features');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterElements = filtersElement.querySelectorAll('.map__filter');
  var housingTypeElement = filtersElement.querySelector('#housing-type');

  var advertCards = null;
  var advertsFiltered = null;

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

  var filterByAccommodationType = function (adverts, target) {
    if (target.value === 'any') {
      return adverts;
    }

    return adverts.filter(function (advert) {
      return advert.offer.type === target.value;
    });
  };

  housingTypeElement.addEventListener('change', function (evt) {
    var target = evt.target;

    advertsFiltered = filterByAccommodationType(advertCards, target);

    window.card.hide();
    window.pins.hide();
    window.pins.show(advertsFiltered);
  });

  window.filters = {
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
