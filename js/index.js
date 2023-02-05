let  content = document.querySelector('.main')
let  popup = document.querySelector('.popup'); 
let  profileButtonEdit = content.querySelector('.profile__edit-btn'); 
let  popupClose = popup.querySelector('.popup__close');  
let  popupForm = popup.querySelector('.popup__form');  
let  nameInput = popupForm.querySelector('.popup__input_type_name'); 
let  jobInput = popupForm.querySelector('.popup__input_type_description');
let  profileName = content.querySelector('.profile__name');  
let  profileJob = content.querySelector('.profile__user-description');

// Делаем активным поп-ап 
function popupOpen() {
    popup.classList.toggle('popup_opened'); 
};
  
// Вешаем слушаель на кнопку "profile__edit-btn" и отображаем в импутах формы текст из "profile__user-info"
profileButtonEdit.addEventListener("click",  () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen();
});

  // функция записи с формы поп-апа на страницу, 
  // отмена перезагрузки после отправки и закрытие попапа посредством toggle через popupOpen()  
  function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupOpen();
  }
  
  // слушатель на кнопку закрыть попап, на кнопку "Сохранить"(submit)
  popupClose.addEventListener('click', popupOpen);
  popupForm.addEventListener('submit', handleFormSubmit);

