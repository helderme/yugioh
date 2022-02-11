const result = document.querySelector('.result')
const sectionBtn = document.querySelector('.section-btn')
const cardImagePlayer1 = document.querySelector('.card-image-player-1')
const cardImagePlayer2 = document.querySelector('.card-image-player-2')
const cardsBattle = document.querySelector('.cards-battle')
const cards = document.querySelector('.cards')
const generateBtn = document.querySelector('.generate-card')
const resultText = document.querySelector('.playerWin')
const closeBtn = document.querySelector('#closeBtn')

const battleBtn = document.createElement('button')
battleBtn.innerText = 'Battle'
battleBtn.className = 'battle-btn'

const battle = () => {
  const card1Atk = Number(document.querySelector('#card1-info').innerText) 
  const card2Atk = Number(document.querySelector('#card2-info').innerText)
  if(card1Atk < card2Atk) {
    result.style.display = 'flex'
    result.style.position = 'absolute'
    resultText.innerText = 'Player 2 Win'
  } else {
    result.style.display = 'flex'
    result.style.position = 'absolute'
    resultText.innerText = 'Player 1 Win'
  }
}

const closePopUp = () => {
  result.style.display = 'none'
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
  const img1 = document.createElement('img')
  const img2 = document.createElement('img')
  
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

  sectionBtn.innerHTML = ''
  
  cardImagePlayer1.appendChild(img1)
  cardImagePlayer1.appendChild(atk1)
  
  battleBtn.addEventListener('click', battle)
  cardsBattle.appendChild(battleBtn)
  
  cardImagePlayer2.appendChild(img2)
  cardImagePlayer2.appendChild(atk2)

}



window.onload = () => {
  generateBtn.addEventListener('click', addCardToDom)
}


