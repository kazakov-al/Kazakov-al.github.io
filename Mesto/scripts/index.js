const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const placesEl = document.querySelector('.places__list');
const userInfoEditButton = document.querySelector('.user__info-edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

let places = [
  {
    name: 'Карачаевск',
    imagePath: './assets/images/karachaevsk.jpg',
    imageAlt: 'Фото Карачаевска'
  },
  {
    name: 'Гора Эльбрус',
    imagePath: './assets/images/elbrus.jpg',
    imageAlt: 'Фото Эльбруса'
  },
  {
    name: 'Домбай',
    imagePath: './assets/images/dombay.jpg',
    imageAlt: 'Фото Домбая'
  },
  {
    name: 'Карачаево-Черкессия',
    imagePath: './assets/images/karachaevsk.jpg',
    imageAlt: 'Фото Карачаевска'
  },
  {
    name: 'Гора Эльбрус',
    imagePath: './assets/images/elbrus.jpg',
    imageAlt: 'Фото Эльбруса'
  },
  {
    name: 'Домбай',
    imagePath: './assets/images/dombay.jpg',
    imageAlt: 'Фото Домбая'
  }
]

function setTextValue(item, value) {
  return item.textContent = `${value}`;
};

function fillPlaces() {
  for (const place of places) {
    placesEl.insertAdjacentHTML('beforeend', `
      <li class="places__item">
        <article class="place">
          <img 
            class="place__image"
            src="${place.imagePath}"
            alt="${place.imageAlt}"
          >
          <div class="place__info">
            <h2 class="place__name">${place.name}</h2>
            <button
              class="place__like-button"
              aria-label="Нравится"
            >
            </button>
          </div>
        </article>
      </li>
    `)
  }
};

function openPopup() {
  popup.classList.add('popup_opened');
  setUserInfoEditFormFieldValue();
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

setTextValue(userNickname, 'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');

fillPlaces();

userInfoEditButton.addEventListener('click', openPopup);

popup.addEventListener('click', function (e) {
  if (e.target === popup) closePopup();
});

popupCloseButton.addEventListener('click', closePopup);

placesEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('place__like-button')) e.target.classList.toggle('place__like-button_active');
});


const userNicknameField = document.getElementById('user-nickname-field');
const userDescriptionField = document.getElementById('user-description-field');

function setUserInfoEditFormFieldValue() {
  userNicknameField.value = userNickname.textContent;
  userDescriptionField.value = userDescription.textContent;
}

const userInfoEditForm = document.getElementById('user-info-edit-form');

userInfoEditForm.addEventListener('submit', function (e) {
  e.preventDefault();

  setTextValue(userNickname, userNicknameField.value);
  setTextValue(userDescription, userDescriptionField.value);

  closePopup();
});