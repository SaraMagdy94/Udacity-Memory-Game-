(function() {

    // Create a list that holds all of your cards
    const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
        "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
        "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"
    ];

    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

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
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */

    let openList = [];
    let matchList = [];
    let counterOfMoves = 0;
    const moves = document.querySelector('.moves');
    const deckOfCards = document.querySelector('.deck');
    const starsPanel = document.querySelector('.stars');
    const cards = document.querySelectorAll('.deck li');
    const stars = starsPanel.querySelectorAll('li');
    const restartButton = document.querySelector('.restart');
    let startTime;
    let endTime;
    let timerInterval;
    let timerCounter = 0;
    let timerMin = 0;
    var stars3 = 15;
    var stars2 = 30;
    var stars1 = 45;
    let score = rating(counterOfMoves).score;
    const star = '<i class="fa fa-star "></i>';
    const $rating = document.querySelector('.fa-star');
    const Play = document.querySelector('.Play');
    const button = document.querySelector('button');
    const stay = document.querySelector('#stay');

    addRandomSymbolToCard(cards);

    //---------------event listener---------------------
    button.addEventListener('click', playAgain);
    stay.addEventListener('click', stayHere);
    restartButton.addEventListener('click', function() {
        resetGame();
    })
    deckOfCards.addEventListener('click', function(evt) {

        /* This condition check:
         * - doesn't user click the deck
         * - doesn't user click in the same card
         * - doesn't user click in the symbol (click in the symbol throws exception)
         */

        if (!(evt.target.className === 'deck') && (openList.length <= 2) && !(evt.target.isClicked === 1)) {
            showSymbol(evt);
            addCardToOpenList(evt);
            incrementMoves();

            //--------------- timer ----------------
            if (counterOfMoves === 1) {
                timerInterval = setInterval(function() {
                    startTimer();
                }, 1000);
            }
            timeOfGame();
            rating(counterOfMoves);
        }
    })

    /* if user clicks in the card 
     * function showSymbol() add to the card property "isClicked"
     * this property is used to check: does user clicks card twice 
     */

    //------------- start showSymbol ------------------------ 
    function showSymbol(evt) {
        evt.target.className = 'card open show';
        evt.target.isClicked = 1;
    }
    //------------- end showSymbol ------------------------ 

    //------------- start addCardToOpenList ----------------
    function addCardToOpenList(evt) {
        openList.push(evt.target.firstElementChild);
        checkTwoCardsMatch(openList);
        checkTwoCardsNotMatch(openList);
    }
    //------------- end addCardToOpenList ------------------------

    //------------- start checkTwoCardsMatch ----------------------
    function checkTwoCardsMatch(array) {
        if (array.length === 2 && array[0].className === array[1].className) {
            array[0].parentNode.className = 'card match show rubberBand animated';
            array[1].parentNode.className = 'card match show rubberBand animated';
            matchList.push(array[0]);
            clearTheOpenList(array);
        }
    }
    //------------- end checkTwoCardsMatch ------------------------ 

    //------------- start checkTwoCardsNotMatch -------------------
    function checkTwoCardsNotMatch(array) {
        if (array.length === 2 && array[0].className !== array[1].className) {
            setTimeout(function() {
                array[0].parentNode.className = 'card close rubberBand wobble animated';
                array[1].parentNode.className = 'card close rubberBand wobble animated';
                array[0].parentNode.isClicked = 0;
                array[1].parentNode.isClicked = 0;
                clearTheOpenList(array);
            }, 1000);
        }
    }
    //------------- end checkTwoCardsNotMatch --------------------

    //------------- start clearTheOpenList ------------------------ 
    function clearTheOpenList(array) {
        for (let i = 0; i < 2; i++) {
            array.shift();
        }
        return array;
    }
    //------------- end clearTheOpenList ------------------------ 

    //------------- start addRandomSymbolToCard ------------------------ 
    function addRandomSymbolToCard(array) {
        let shuffleListOfCards = shuffle(listOfCards);
        for (i = 0; i < array.length; i++) {
            array[i].firstElementChild.className = shuffleListOfCards[i];
        }
    }
    //------------- end addRandomSymbolToCard ------------------------

    //------------- start starrTimer ---------------------------------
    function startTimer() {
        let sec;
        timerCounter++
        sec = timerCounter;
        if (timerCounter === 60) {
            timerMin++;
            sec = 0;
            timerCounter = 0;
        }
        document.querySelector('#timer').innerHTML = addZeroToTimer(timerMin) + ':' + addZeroToTimer(sec);
    }
    //------------- end starrTimer ----------------------------

    //------------- end addZeroToTimer ------------------------ 
    function addZeroToTimer(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }

    }
    //------------- end addZeroToTimer ------------------------ 

    //---------------------- Score panel --------------------

    //------------- start resetGame ------------------------ 
    function resetGame() {
        for (let card of cards) {
            card.className = "card close";
            card.isClicked = 0;
        }
        stopTimer();
        counterOfMoves = 0;
        moves.innerHTML = counterOfMoves;
        matchList = [];
        openList = [];
        addRandomSymbolToCard(cards);
        starsPanel.lastElementChild.style.visibility = 'visible';
        starsPanel.lastElementChild.previousElementSibling.style.visibility = 'visible';
        starsPanel.firstElementChild.style.visibility = 'visible';

        $rating.classList.add('fa-star');

    }
    //------------- end resetGame ------------------------ 

    //------------- start incrementMoves ------------------

    function incrementMoves() {
        counterOfMoves++;
        rating(counterOfMoves);
        moves.innerHTML = counterOfMoves;
    }
    //------------- end incrementMoves -------------------

    //------------- start timeOfGame ------------------------ 

    function timeOfGame() {
        // Start game
        if (counterOfMoves === 1) {
            startTime = Date.now();
        }
        // End game
        if (matchList.length === 8) {
            showStaticies();
            Play.classList.remove('hide');
            // endTime = Date.now() - startTime;
            stopTimer();
            //resetGame();
        }
    }
    //------------- end timeOfGame ------------------------ 

    //------------- start stopTimer ------------------------ 
    function stopTimer() {
        clearInterval(timerInterval);
        timerCounter = 0;
        timerMin = 0;
        document.querySelector('#timer').innerHTML = '00:00';
    }
    //------------- end stopTimer ------------------------ 

    //---------- start rating counterOfMoves  ------------------------------
    function rating(counterOfMoves) {
        let rating = 3;
        if (counterOfMoves > stars3 && counterOfMoves < stars2) {
            starsPanel.lastElementChild.style.visibility = 'hidden';
            // starsPanel.lastElementChild.classList.add = 'fa-star-o';
            //starsPanel[2].classList.replace('fa-star-o', 'fa-star');
        } else if (counterOfMoves > stars2 && counterOfMoves < stars1) {
            starsPanel.lastElementChild.previousElementSibling.style.visibility = 'hidden';
            rating = 2;
        } else if (counterOfMoves > stars1) {
            starsPanel.firstElementChild.style.visibility = 'hidden';
            rating = 1
            alert("sorry you lose the game try again :(");
            resetGame();
        }
        return { score: rating };
    }
    //---------- end rating counterOfMoves  --------------------------------

    //---------- start playAgain  --------------------------------
    function playAgain() {
        Play.classList.add('hide');
        resetGame();
    }
    //---------- end playAgain  --------------------------------

    //---------- start stayHere  --------------------------------
    function stayHere() {
        Play.classList.add('hide');
    }
    //---------- end stayHere  --------------------------------

    //--------------- start showStaticies----------------------
    function showStaticies() {
        let score = rating(counterOfMoves).score;
        //score
        //time
        //moves
        //sweetAlert("congrats");
        sweetAlert("congratulations! you are winning", "with " + counterOfMoves + " moves in " + timerCounter + " sec " + timerMin + " Min scoring  " + score + " " + star + " !", "success");
    }
    //--------------- end showStaticies--------------------------

})();