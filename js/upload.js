'use strict';

(function () {
  var FILLES_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  var photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
  var adFormElement = document.querySelector('.ad-form');
  var avatarFileElement = adFormElement.querySelector('#avatar');
  var imagesFileElement = adFormElement.querySelector('#images');
  var photosElement = adFormElement.querySelector('.ad-form__photo');
  var previewElement = adFormElement.querySelector('.ad-form-header__preview img');

  var hidePhotos = function () {
    photosElement.innerHTML = '';
    previewElement.src = 'img/muffin-grey.svg';
  };

  var showPhoto = function (result) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.src = result;

    photosElement.appendChild(photoElement);
  };

  var onPhotoChange = function (inputElement, imgElement) {
    var file = inputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILLES_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (imgElement) {
          imgElement.src = reader.result;
        } else {
          showPhoto(reader.result);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileElement.addEventListener('change', function () {
    onPhotoChange(avatarFileElement, previewElement);
  });

  imagesFileElement.addEventListener('change', function () {
    onPhotoChange(imagesFileElement);
  });

  window.upload = {
    hide: hidePhotos
  };
})();
