const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const placesEl = document.querySelector('.places__list');
const placeItemTemplate = document.querySelector('#place-item').content;
const userInfoEditButton = document.querySelector('.user__info-edit-button');
const placeAddButton = document.querySelector('.profile__place-add-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const userInfoEditPopup = document.querySelector('#user-info-edit-popup');
const placeAddPopup = document.querySelector('#place-add-popup');
const placePhotoPopup = document.querySelector('#place-photo-popup');
const placePopupImage = document.querySelector('.popup__image');
const placePopupImageCaption = document.querySelector('.popup__caption');
const userInfoEditForm = document.querySelector('#user-info-edit-form');
const userNicknameField = document.querySelector('#user-nickname-field');
const userDescriptionField = document.querySelector('#user-description-field');
const placeAddForm = document.querySelector('#place-add-form');
const placeNameField = document.querySelector('#place-name-field');
const placeImageField = document.querySelector('#place-image-field');

const places = [
  {
    name: 'Карачаевск',
    link: './assets/images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './assets/images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './assets/images/dombay.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './assets/images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './assets/images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './assets/images/dombay.jpg'
  }
]

function setTextValue(item, value) {
  item.textContent = `${value}`;
}

function addPlace(place) {
  const placeItemEl = placeItemTemplate.querySelector('.places__item').cloneNode(true);
  const placeLikeButton = placeItemEl.querySelector('.place__like-button');
  const placeRemoveButton = placeItemEl.querySelector('.place__remove-button');
  const placeImage = placeItemEl.querySelector('.place__image');
  const placeName = placeItemEl.querySelector('.place__name');

  placeName.textContent = place.name;
  placeImage.src = place.link;
  placeImage.alt = place.name;

  placeLikeButton.addEventListener('click', setLikeStatus);
  placeRemoveButton.addEventListener('click', removePlaceItem);
  placeImage.addEventListener('click', openPlacePopup);

  placesEl.prepend(placeItemEl);
}

function fillPlaces() {
  for (const place of places) {
    addPlace(place);
  }
}

function setUserInfoEditFormFieldValue() {
  userNicknameField.value = userNickname.textContent;
  userDescriptionField.value = userDescription.textContent;
}

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
}

function closePopup(e) {
  const popup = e.target.closest('.popup');

  popup.classList.remove('popup_opened');
}

function openProfilePopup(e) {
  openPopup(e)
  setUserInfoEditFormFieldValue();
}

closePopupButtons.forEach(closePopupButton => {
  closePopupButton.addEventListener('click', function (e) {
    closePopup(e);
  });
});

userInfoEditButton.addEventListener('click', function () {
  openProfilePopup(userInfoEditPopup);
});

placeAddButton.addEventListener('click', function () {
  openPopup(placeAddPopup);
});

function removePlaceItem(e) {
  e.target.closest('.places__item').remove();
}

function setLikeStatus(e) {
  e.target.classList.toggle('place__like-button_active');
}

function openPlacePopup(e) {
  setPlacePopupData(e);
  openPopup(placePhotoPopup);
}

function setPlacePopupData(e) {
  placePopupImage.src = e.target.src;
  placePopupImage.alt = e.target.alt;
  placePopupImageCaption.textContent = e.target.alt;
}

userInfoEditForm.addEventListener('submit', function (e) {
  e.preventDefault();

  setTextValue(userNickname, userNicknameField.value);
  setTextValue(userDescription, userDescriptionField.value);

  closePopup(e);
});

placeAddForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const place = {
    name: placeNameField.value,
    link: placeImageField.value
  }

  addPlace(place);
  closePopup(e);
});


setTextValue(userNickname, 'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');
fillPlaces();
