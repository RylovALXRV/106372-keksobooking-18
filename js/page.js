'use strict';

(function () {

  var isPageActive = null;

  var activatePage = function () {
    if (isPageActive) {
      isPageActive = false;

      window.backend.load(window.pins.show, window.modal.showError);
      window.form.activate();
    }
  };

  var deactivatePage = function () {
    isPageActive = true;

    window.map.setDefault();
    window.form.init();
    window.filters.deactivate();
  };

  deactivatePage();

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };
})();
