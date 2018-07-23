/*
 * Display the cardsArray on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * Array to hold open cards
 * List to hold all cards
 */
let openCardsArray = [];
let card = document.getElementsByClassName('card');
let cardsArray = [...card];

/*
 * Moves counter variable
 * Variable to hold number of moves
 */
let movesCounter = document.querySelector('.moves');
let moves = 0;

/*
 * Select deck
 * Array to hold shuffled cards
 */
let deck = document.querySelector('.deck');
let shuffledCards = [];

/*
 * Variable to hold number of matches
 */
let match = 0;

/*
 * Variables for the timer
 */
let sec = 0;
let secNew = 0;
let min = 0;
let timeCounter = document.querySelector('.timer');
let timer = '';
let timerDelay = 0;
let timerText = '';

/*
 * Variables for the modal
 */
let modal = document.querySelector('.modal');
let stat = document.querySelector('.end-msg');
let modalMsg = '';

/*
 * Variables for restart button
 */
let restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);

/*
 * Variables for stars on score panel
 */
let stars = document.querySelector(".stars").getElementsByTagName("li");
let starCount = 3;
let statMsg = document.querySelector('.stats');

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cardsArray in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Call to set the deck
 */
setDeck();

/*
 * Shuffle cards on deck and display them face down
 * Call to initialize moves at move-counter on webpage
 * call to start the game
 */
function setDeck() {
    console.log("shuffle");
    shuffledCards = shuffle(cardsArray);
    for (let i = 0; i < shuffledCards.length; i++) {
        deck.appendChild(shuffledCards[i]);
        shuffledCards[i].classList.remove('open', 'show', 'match', 'shake');
    }
    setMoves();
    flipDown();
    startGame();
}


/*
 * flipUp() to show all the cards
 */
function flipUp() {
    console.log("show");
    for (let i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].classList.add('open', 'show');
    }
}

/*
 * flipDown() to hide all the cards
 */
function flipDown() {
    console.log("hide");
    for (let i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].classList.remove('open', 'show');
    }
}


/*
 * Set movesCounter to current moves done
 */
function setMoves() {
    movesCounter.textContent = moves;
}


/*
 * Start game when a card is clicked
 */
function startGame() {
    for (let i = 0; i < cardsArray.length; i++) {
        shuffledCards[i].addEventListener('click', flipCardUp);
    }
}


/*
 * Flip card up at click
 * Adds card to openCardsArray list
 * If it's first card, start the timer
 * If there are 2 cards on list, call to compare symbols
 * If all cards are matched, call to end game
 */
function flipCardUp(eventCardClick) {
    eventCardClick.target.classList.remove('shake');
    showCard(eventCardClick);
    addToopenCardsArray(eventCardClick.target);
    timerDelay++;

    if (timerDelay === 1) {
        startTimer();
    }

    if (openCardsArray.length === 2) {
        let prevCard = openCardsArray[0];
        let currCard = openCardsArray[1];
        checkMatch(prevCard, currCard);
    }

    if (match === 8) {
        endGame();
    }
}

/*
 * Check the symbol of current and previous card from the list
 * If match - call to change card style
 * If not a match - call to flip card down
 * Afterwards, call to increment moves and check star rating-status
 * Reset openCardsArray list
 */
function checkMatch(prevCard, currCard) {
    if (prevCard.innerHTML === currCard.innerHTML) {
        isMatch(prevCard, currCard);
    }
    else {
        isNotMatch(prevCard, currCard);
    }

    addMoves();
    starsScore();
    openCardsArray = [];
}



/*
 * Lock card in open position and change styles
 * Increment match number
 */
function isMatch(prevCard, currCard) {
    prevCard.classList.add('match');
    currCard.classList.add('match');
    match++;
}



/*
 * Flip card back down and add style
 */
function isNotMatch(prevCard, currCard) {
    setTimeout(function () {
        prevCard.classList.add('shake');
        currCard.classList.add('shake');
        prevCard.classList.remove('open', 'show');
        currCard.classList.remove('open', 'show');
    }, 300);
}


/*
 * Increment moves by 1
 */
function addMoves() {
    moves++;
    setMoves();
}


/*
 * Determine the star rating based on moves made
 * For less than equal to 12 moves: star is 3
 * For more than 12 moves: star is 2
 * For more than 22 moves: star is 1
 */
function starsScore() {
    if (moves > 12) {
        stars[2].classList.add('zoomOut');
        starCount = 2;
        return stars;
        console.log(starCount);
    }

    if (moves > 22) {
        stars[1].classList.add('zoomOut');
        return stars;
        starCount = 1;
        console.log(starCount);
    }
}


/*
 * Add currently clicked card to openCardsArray list
 */
function addToopenCardsArray(clickedCard) {
    openCardsArray.push(clickedCard);
}


/*
 * Shows card symbol
 */
function showCard(eventCardClick) {
    eventCardClick.target.classList.add('open', 'show');
}


/*
 * Start the timer
 * Store timer in a temporary variable
 */
function startTimer() {
    timer = setInterval(buildTimer, 1000);
}


/*
 * Pre-increment seconds on every time function is called
 * Calculate minute and second and store in variables
 * Format time in 00:00 and set it in variable
 * Show final formatted time on webpage
 */
function buildTimer() {
    ++sec;
    min = Math.floor(sec / 60);
    secNew = Math.floor(sec % 60);
    timerText = pad(min) + ":" + pad(secNew);
    timeCounter.innerHTML = timerText;
}

/*
 * Pad the time in 00 format
 * Convert time value to string
 * If digit is less than 2, add 0 infront
 */
function pad(timeValue) {
    var timeString = timeValue + "";
    if (timeString.length < 2) {
        return "0" + timeString;
    }
    else return timeString;
}

/*
 * Stops timer from running
 * Clears minute,second, and time string
 */
function resetTimer() {
    clearInterval(timer);
    sec = 0;
    min = 0;
    timerText = '';
}

/*
 *Stops timer from running
 */
function stopTimer() {
    clearInterval(timer);
}

/*
 * Creates statistic text and sets to modalMsg
 */
function buildModalMsg() {
    modalMsg = "<p>Moves made: " + moves + " | Time taken: " + min + " minutes " + secNew + " seconds!</p>" + "<p>Star Rating: " + starCount + " star(s)</p>";
}


/*
 * Creates paragraph element
 * Calls to set statistic text to paragraph
 * Add the paragraph below end-greeting and above buttons
 */
function buildModal() {
    statMsg.innerHTML = '';
    statMsg.innerHTML = modalMsg;
}


/*
 * Display modal
 * Clicking outside the modal box closes modal
 * Call to set fuctions to modal buttons
 */
function showModal() {
    buildModal();

    runClick();
    window.onclick = function (event) {
        if (event.target == modal) {
            hideModal();
        }
    };

    modal.style.display = 'block';
}


/*
 * Clicking on "OK" closes modal
 * Clicking on "Play Again" restarts game
 */
function runClick() {
    document.querySelector('#ok').onclick = hideModal;

    document.querySelector('#play-again').onclick = resetGame;

}


/*
 * Hide modal
 */
function hideModal() {
    modal.style.display = 'none';
}


/*
 * Reset the modal statistic msg on webpage
 */
function resetModalStat() {
    statMsg.innerHTML = '';
}

/*
 * Call to create statistic text for modal
 * Stop timer from running
 * Call to show modal contents
 */
function endGame() {
    buildModalMsg();
    stopTimer();
    showModal();
}


/*
 * Reset everything
 * Event - when "Restart" is clicked
 */
function resetGame() {
    hideModal();
    resetStarsScore();
    setDeck();
    reInit();
    openCardsArray = [];
}

/*
 * Reinitialize moves and match numbers
 * Reset move and timer text on webpage
 */
function reInit() {
    movesCounter.innerHTML = '';
    timeCounter.innerHTML = '00:00';
    moves = 0;
    setMoves();
    match = 0;
    resetTimer();
    timerDelay = 0;
}

/*
 * Reset star rating status
 * Display all 3 stars as defualt
 */
function resetStarsScore() {
    starCount = 3;
    for (let i = 1; i < stars.length; i++) {
        if (stars[i].classList.contains('zoomOut')) {
            stars[i].classList.remove('zoomOut');
        }
    }
}


/*
 * Restart the game by resetting everything
 * Event - when "Play Again" is clicked
 */
function restartGame() {
    resetModalStat();
    resetStarsScore();
    setDeck();
    reInit();
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cardsArray (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cardsArray match
 *    + if the cardsArray do match, lock the cardsArray in the open position (put this functionality in another function that you call from this one)
 *    + if the cardsArray do not match, remove the cardsArray from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cardsArray have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
