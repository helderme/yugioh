const main = document.querySelector('main')
const result = document.querySelector('.result')
const sectionBtn = document.querySelector('.section-btn')
const cardImagePlayer1 = document.querySelector('.card-image-player-1')
const cardImagePlayer2 = document.querySelector('.card-image-player-2')
const cardsBattle = document.querySelector('.cards-battle')
const cards = document.querySelector('.cards')
const generateBtn = document.querySelector('.generate-card')
const resultText = document.querySelector('.playerWin')
const closeBtn = document.querySelector('#closeBtn')
const loading = document.querySelector('.loading')
const playerForm = document.querySelector('#player-form')
const defaultCards = document.querySelectorAll('.default-card')
const errorPopUp = document.querySelector('.error-pop-up')
const atkRadio = document.querySelector('#atk-radio')
const defRadio = document.querySelector('#def-radio')
const okErrorPopUpBtn = document.querySelector('#ok-error-pop-up-btn')

const dirtyEffectCard1 = document.querySelector('.dirty-effect-card1')
const fireEffectCard1  = document.querySelector('.fire-effect-card1')
const dirtyEffectCard2 = document.querySelector('.dirty-effect-card2')
const fireEffectCard2  = document.querySelector('.fire-effect-card2')

const sendNameBtn = document.querySelector('#send-name-btn')
const sendNameInput = document.querySelector('#send-name-input')
const sendNameSection = document.querySelector('#send-name-section')
let player1Name = ''
let player2Name = ''
let player1Mode = ''
let player2Mode = ''

const battleModeInfo = () => {
  if (atkRadio.checked) {
    return 'atk'
  }
  return 'def'
}

const closeErrorPopUp = () => {
  errorPopUp.style.display = 'none'
}
okErrorPopUpBtn.addEventListener('click', closeErrorPopUp)

const removeSelectedCardId = () => {
  const selectedCardId = document.querySelector('#selected-card')
  selectedCardId.removeAttribute('id')
}

const defaultCardSelect = (event) => {
  current = document.querySelector('#selected-card')
  if(current){ current.removeAttribute('id') }
  event.target.id = 'selected-card' 
}
const defaultCardsEvent = () => {
  defaultCards.forEach((element) => {
    element.addEventListener('click', defaultCardSelect)
  })
}

const emptyValues = () => {
  const playerName = sendNameInput.value
  const battleMode = battleModeInfo()
  const selectedCardId = document.querySelector('#selected-card')
  if(!playerName || !battleMode || !selectedCardId) {
    return true
  }
}

const sendNamePlayer2 = (event) => {
  event.preventDefault()
  if(emptyValues()) {
    errorPopUp.style.display = 'flex'
  } else {
  player2Name = sendNameInput.value
  player2Mode = battleModeInfo()
  main.removeChild(playerForm)
  sectionBtn.style.display = 'block';
  }
}
const sendNamePlayer1 = (event) => {
  event.preventDefault()
  if(emptyValues()) {
    errorPopUp.style.display = 'flex'
  } else {
  player1Name = sendNameInput.value
  sendNameInput.value = ''
  sendNameInput.placeholder = 'Digite Aqui o Nome do Jogador 2'
  removeSelectedCardId();
  player1Mode = battleModeInfo()
  sendNameBtn.removeEventListener('click', sendNamePlayer1, false)
  sendNameBtn.addEventListener('click', sendNamePlayer2)
  }
}
sendNameBtn.addEventListener('click', sendNamePlayer1)

const player1Text = document.querySelector('#player1-name')
const player2Text = document.querySelector('#player2-name')

const battleIcon = document.createElement('img')
battleIcon.src = 'imgs/battle.png'
const battleBtn = document.createElement('button')
battleBtn.innerText = 'Battle'
battleBtn.className = 'battle-btn'
battleBtn.appendChild(battleIcon)



const battle = () => {
  const card1Atk = Number(document.querySelector('#card1-info').innerText) 
  const card2Atk = Number(document.querySelector('#card2-info').innerText)
  if(card1Atk < card2Atk) {
    result.style.display = 'flex'
    result.style.position = 'absolute'
    resultText.innerText = `${player2Name} Venceu`
    dirtyEffectCard1.style.display = 'flex'
    fireEffectCard1.style.display = 'flex'
  } else {
    result.style.display = 'flex'
    result.style.position = 'absolute'
    resultText.innerText = `${player1Name} Venceu`
    dirtyEffectCard2.style.display = 'flex'
    fireEffectCard2.style.display = 'flex'
  }
}

const closePopUp = () => {
  document.location.reload(true)
}

closeBtn.addEventListener('click', closePopUp)

const getRandomCard = async () => {
  const url = 'https://db.ygoprodeck.com/api/v7/randomcard.php';
  let response = await fetch(url);
  let data = await response.json()

  while (data.type !== 'Effect Monster') {
    response = await fetch(url);
    data = await response.json()
  }

 const imgLink = data.card_images[0].image_url
 return {link: imgLink, atk: data.atk, tipo: data.type, def: data.def}
}

const addCardToDom = async () => {
  loading.style.display = 'flex'
  sectionBtn.innerHTML = ''
  const img1 = document.createElement('img')
  const img2 = document.createElement('img')
  img1.className = 'card1'
  img2.className = 'card2'
  
  const strengthPlayer1 = document.createElement('p')
  const strengthPlayer2 = document.createElement('p')
  strengthPlayer1.id = 'card1-info'
  strengthPlayer2.id = 'card2-info'

  const obj1 = await getRandomCard()
  const obj2 = await getRandomCard()
  
  if(player1Mode === 'atk') {
    strengthPlayer1.innerText = obj1.atk
  } else {
    strengthPlayer1.innerText = obj1.def
  }
  if(player2Mode === 'atk') {
    strengthPlayer2.innerText = obj2.atk
  } else {
    strengthPlayer2.innerText = obj2.def
  }
  
  img1.src = obj1.link
  img2.src = obj2.link

  main.removeChild(sectionBtn)
  
  cardImagePlayer1.appendChild(img1)
  cardImagePlayer1.appendChild(strengthPlayer1)

  player1Text.style.display = 'block'
  player1Text.innerText = player1Name

  
  battleBtn.addEventListener('click', battle)
  cardsBattle.appendChild(battleBtn)
  
  cardImagePlayer2.appendChild(img2)
  cardImagePlayer2.appendChild(strengthPlayer2)
  player2Text.style.display = 'block'
  player2Text.innerText = player2Name
  loading.style.display = 'none'
}



window.onload = () => {
  generateBtn.addEventListener('click', addCardToDom)
  defaultCardsEvent()
}


