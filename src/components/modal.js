export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeFunction)
  // document.addEventListener('click', (event) => {
  //   popupFunction(event)
  //   closePopupButton(event)
  // })
  document.addEventListener('click', handlePopupClick)
}
  
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeFunction)
  // document.removeEventListener('click', (event) => {
  //   popupFunction(event)
  //   closePopupButton(event)
  // })
  document.removeEventListener('click', handlePopupClick)
}

function handlePopupClick(event) {
  popupFunction(event)
  closePopupButton(event)
}

function escapeFunction(event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened')
    if(openedPopup) {
    closePopup(openedPopup)
    }
  }
}

function popupFunction(event) {
  if(event.target.classList.contains('popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened')
    if(openedPopup) {
    closePopup(openedPopup)
    }
  }
}

export function closePopupButton(event) {
  if(event.target.classList.contains('popup__close')) {
    const openedPopup = document.querySelector('.popup_is-opened')
    if(openedPopup) {
    closePopup(openedPopup)
    }
  }
}