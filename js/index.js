// поп-ап 
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddImage = document.querySelector(".popup_type_add-image");
const popupViewImage = document.querySelector(".popup_type_open-image");

// Кнопка Закрыть
const buttonCloseList = document.querySelectorAll(".popup__close-btn");

// Профиль
const buttonEditProfile = document.querySelector(".profile__edit-btn");

// Кнопка добавить изображение
const buttonAddImage = document.querySelector(".profile__btn-add-img");

// Попап просмотра изображения
const cardImage = document.querySelector(".cards__image");
const bigImageTitle = popupViewImage.querySelector(".popup__image-title");
const bigImage = popupViewImage.querySelector(".popup__image");

// Формы
const profileForm = popupProfile.querySelector(".popup__form_type_edit-profile");
const imageForm = popupAddImage.querySelector(".popup__form_type_add-img");

// Данные пользователя на странице
const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__user-description");

// Импуты в попапе профиля
const formName = popupProfile.querySelector(".popup__input_type_name");
const formDescription = popupProfile.querySelector(".popup__input_type_description" );

// Добавления изображения в попапе 
const formImageTitle = imageForm.querySelector(".popup__input_type_image-title");
const formImageUrl = imageForm.querySelector(".popup__input_type_image-url");

// Темплейт карточек
const cardTemplate = document
  .querySelector(".cards__item-template")
  .content.querySelector(".cards__item");
const gallery = document.querySelector(".cards__list");

// Открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode("true");
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => {
    openImagePopup(card);
  });

  return cardElement;
}

function renderCards() {
  initialCards.forEach((item) => {
    const card = createCard(item);
    gallery.prepend(card);
  });
}

function deleteCard(event) {
  if (event.target.classList.contains("cards__trash")) {
    event.target.closest(".cards__item").remove();
  }
}

gallery.addEventListener("click", deleteCard);

function likeCard(event) {
  if (event.target.classList.contains("cards__like")) {
    event.target.classList.toggle("cards__like_active");
  }
}
gallery.addEventListener("click", likeCard);

function openImagePopup(card) {
  bigImage.src = card.link;
  bigImage.alt = card.name;
  bigImageTitle.textContent = card.name;

  openPopup(popupViewImage);
}

// Отображение имени пользователя в импутах попапа редактирования профиля при открытии
function insertProfileInfo() {
  formName.value = userName.textContent;
  formDescription.value = userDescription.textContent;
}

// Формы
function handleSubmitProfileForm(event) {
  event.preventDefault();

  userName.textContent = formName.value;
  userDescription.textContent = formDescription.value;
  closePopup(popupProfile);
}

function handleAddImageForm(event) {
  event.preventDefault();

  const newCard = createCard({
    name: formImageTitle.value,
    link: formImageUrl.value,
  });

  gallery.prepend(newCard);
  imageForm.reset();

  closePopup(popupAddImage);
}

profileForm.addEventListener("submit", handleSubmitProfileForm);
imageForm.addEventListener("submit", handleAddImageForm);

// Поп-ап профиля
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupProfile);
  insertProfileInfo();
});

// Поп-фа добавления изображения
buttonAddImage.addEventListener("click", () => {
  openPopup(popupAddImage);
});
// кнопки закрытия попапов
function handlePopupClose() {
  buttonCloseList.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
  });

  const allPopups = Array.from(document.querySelectorAll(".popup"));
  allPopups.forEach((popup) => {
    document.addEventListener("keydown", (x) => {
      if (popup.classList.contains("popup") && x.key === "Escape") {
        closePopup(popup);
      }
    });
  });

  document.addEventListener("click", (x) => {
    if (x.target.classList.contains("popup")) {
      closePopup(x.target);
    }
  });
}

renderCards();

handlePopupClose();
