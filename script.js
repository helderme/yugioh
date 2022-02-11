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

const sendNameBtn = document.querySelector('#send-name-btn')
const sendNameInput = document.querySelector('#send-name-input')
const sendNameSection = document.querySelector('#send-name-section')
let player1Name = ''
let player2Name = ''

const sendNamePlayer2 = () => {
  player2Name = sendNameInput.value
  main.removeChild(sendNameSection)
  sectionBtn.style.display = 'block';
}
const sendNamePlayer1 = () => {
  player1Name = sendNameInput.value
  sendNameInput.value = ''
  sendNameInput.placeholder = 'Digite Aqui o Nome do Jogador 2'
  sendNameBtn.removeEventListener('click', sendNamePlayer1, false)
  sendNameBtn.addEventListener('click', sendNamePlayer2)
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
    resultText.innerText = `${player2Name} Win`
    cardImagePlayer1.style.backgroundImage = `url(${document.querySelector('.card1').src})`
    document.querySelector('.card1').src = 'imgs/burning.gif'
  } else {
    result.style.display = 'flex'
    result.style.position = 'absolute'
    resultText.innerText = `${player1Name} Win`
    cardImagePlayer2.style.backgroundImage = `url(${document.querySelector('.card2').src})`
    document.querySelector('.card2').src = 'imgs/burning.gif'
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
 return {link: imgLink, atk: data.atk, tipo: data.type, defense: data.def}
}

const addCardToDom = async () => {
  loading.style.display = 'flex'
  sectionBtn.innerHTML = ''
  const img1 = document.createElement('img')
  const img2 = document.createElement('img')
  img1.className = 'card1'
  img2.className = 'card2'
  
  const atk1 = document.createElement('p')
  const atk2 = document.createElement('p')
  atk1.id = 'card1-info'
  atk2.id = 'card2-info'

  const obj1 = await getRandomCard()
  const obj2 = await getRandomCard()
  
  
  
  atk1.innerText = obj1.atk
  atk2.innerText = obj2.atk
  
  img1.src = obj1.link
  img2.src = obj2.link

  main.removeChild(sectionBtn)
  
  cardImagePlayer1.appendChild(img1)
  cardImagePlayer1.appendChild(atk1)

  player1Text.style.display = 'block'
  player1Text.innerText = player1Name

  
  battleBtn.addEventListener('click', battle)
  cardsBattle.appendChild(battleBtn)
  
  cardImagePlayer2.appendChild(img2)
  cardImagePlayer2.appendChild(atk2)
  player2Text.style.display = 'block'
  player2Text.innerText = player2Name
  loading.style.display = 'none'
}



window.onload = () => {
  generateBtn.addEventListener('click', addCardToDom)
}


