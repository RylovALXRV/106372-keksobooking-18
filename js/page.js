'use strict';

(function () {

  var isPageActive = null;

  var activatePage = function () {
    if (isPageActive) {
      isPageActive = false;

      window.backend.load(window.pins.show, window.modal.showError);
      window.form.activate();
      window.map.toggleStateFilters();
    }
  };

  var deactivatePage = function () {
    isPageActive = true;

    window.form.init();
    window.map.toggleStateFilters();
  };

  window.page = {
    activate: activatePage
  };

  deactivatePage();
})();
