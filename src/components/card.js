import { deleteCardFromServer, addLikeToPost, deleteLikeToPost} from './api.js';

const cardTemplate = document.querySelector('#card-template') 

export function createElement(dataForCards, deleteFunction, likeFunction, imageClickFunction, userIdentNumber) {
  const newElement = cardTemplate.content.cloneNode(true)

  const newElementTitle = newElement.querySelector('.card__title')
  const newElementImg = newElement.querySelector('.card__image')
  newElementTitle.textContent = dataForCards.name
  newElementImg.src = dataForCards.link
  newElementImg.alt = dataForCards.name

  const countCard = newElement.querySelector('.card__likes-count')

  const likeButton = newElement.querySelector('.card__like-button')
  likeButton.addEventListener('click', (event) => {
    likeFunction(event, dataForCards._id, countCard)
  })

  newElementImg.addEventListener('click', imageClickFunction)

  const cardLike = newElement.querySelector('.card__likes-count')
  cardLike.textContent = dataForCards.likes.length.toString()

  dataForCards.likes.forEach((element) => {
    if(element._id === "f74bd461ebdcc3b81e02e565") {
      likeButton.classList.add('card__like-button_is-active')
    }
  })

  const deleteButton = newElement.querySelector('.card__delete-button')

  deleteButton.addEventListener('click', (event) => {
    deleteFunction(event, dataForCards._id)
  })
  if(userIdentNumber !== dataForCards.owner._id) {
    deleteButton.style.display = 'none'
  }
  return newElement
}


export function deleteFunc (event, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      event.target.closest('.card').remove(); 
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
} 



export function likeFunction (event, cardId, countCard) {
  if(!event.target.classList.contains('card__like-button_is-active')) {
    addLikeToPost(cardId)
     .then((res) => {
         countCard.textContent = res.likes.length;
         event.target.classList.add('card__like-button_is-active')
     })
     .catch(error => {
       console.error('Ошибка:', error);
     }); 
   } else {
     deleteLikeToPost(cardId)
     .then((res) => {
         countCard.textContent = res.likes.length;
         event.target.classList.remove('card__like-button_is-active')
     })
     .catch(error => {
       console.error('Ошибка:', error);
     });
   }
}

    
 
    
  








