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


  var filterByAccommodationType = function (adverts, target) {
    if (target.value === 'any') {
      return adverts;
    }

    return adverts.filter(function (advert) {
      return advert.offer.type === target.value;
    });
  };

  housingTypeElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (!advertCards) {
      advertCards = window.pins.getAdverts();
    }

    advertsFiltered = filterByAccommodationType(advertCards, target);

    window.pins.hide();
    window.pins.show(advertsFiltered);
  });

  window.filters = {
    toggleStateFilters: toggleDisabledStateOfFilters
  };
})();
