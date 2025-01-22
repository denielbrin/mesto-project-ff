const placeList = document.querySelector('.places__list') 
const cardTemplate = document.querySelector('#card-template') 


function createElement(dataForCards) {
  const newElement = cardTemplate.content.cloneNode(true)
  
  const newElementTitle = newElement.querySelector('.card__title')
  const newElementImg = newElement.querySelector('.card__image')
  newElementTitle.textContent = dataForCards.name
  newElementImg.src = dataForCards.link

  const deleteButton = newElement.querySelector('.card__delete-button')
  deleteButton.addEventListener('click', deleteFunc)

  return newElement
}

function deleteFunc (event) {
  event.target.closest('li').remove()
}

initialCards.forEach(function (item) {
  const createrCards = createElement(item)
  placeList.append(createrCards)
});









