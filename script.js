const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer  = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM card
const cardsEl = [];

// Store card date
const cardsData = getCardsData();

/*
const cardData = [
    {
        question: 'drake',
        answer: 'colonizer',
    },
    {
        question: 'biggest bbl',
        answer: 'bbl drizzy'
    }
];
*/

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

// populate all cards
function createCards () {
    cardsData.forEach((data, index) => createCard(data, index));
}

// create a card
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // add to DOM cards 
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// show cards number
function updateCurrentText() {
    currentEl.innerText = `${ currentActiveCard + 1 }/${cardsEl.length}`;
}

createCards();

// Event listeners

// Next button
nextBtn.addEventListener('click', () => {

    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;

    if(currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Previus button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
  
    if (question.trim() && answer.trim()) {
      const newCard = { question, answer };
  
      createCard(newCard);
  
      questionEl.value = '';
      answerEl.value = '';
  
      addContainer.classList.remove('show');
  
      cardsData.push(newCard);
      setCardsData(cardsData);
    }
});
  
// clear all cards @to-do - add delete for individual card
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});