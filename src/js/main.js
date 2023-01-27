
const startStrusture = `
<header class="header__base text">
<h1 class="text">Word Checker</h1>
<div class="theme__ico"><img src="src/icons/sun.svg" alt="theme picker" id="theme"></div>
</header>
<div class="title baseeditor__title text">Edit your vocabulary</div>
<div class="baseeditor__editor">
<input type="text" id="eng" placeholder="English" class="baseeditor__editor__input">
<input type="text" id="ru" placeholder="Russian" class="baseeditor__editor__input">
<button class="baseeditor__editor__button" id="add">Add word</button>
</div>
<div class="baseeditor__extra"> 
<div class="baseeditor__extra_search">
<input type="text" id="search" class="baseeditor__extra_search__input" placeholder="English">
<button class="baseeditor__extra__button-remove" id="remove">Remove</button>
</div>
<button class="baseeditor__extra__button-clear" id="clear">Clear database</button>
</div>
<div class="subtitle baseeditor__check">
<div class="baseeditor__check__text text">Check your vocabulary:</div>
<button class="baseeditor__button" id="check">Check</button>
</div>
<div class="baseeditor__start">
<div class=" subtitle baseeditor__start__title text">Start:</div>
<button class="baseeditor__start__button" id="start">Start</button>
</div>
`;

const testStrusture =`
<header class="header__test text">
<div class="title test__title text">Testing</div>
<div class="header__menu">
<div class="test__score text">Score: <span id="scoreCount">Err</span></div>
<button class="test-exit" id="exit">Exit</button>
</div>
</header>
<div class="test__word text" id="word">Err</div>
<div class="test__buttonblock">
<div class="title test__title text">Choose the correct answer</div>
<button class="test__button" id="firstAnswer">Err</button>
<button class="test__button" id="secondAnswer">Err</button>
<button class="test__button" id="thirdAnswer">Err</button>
</div>
</div>
<script src="src/js/main.js"></script>
`;

document.body.innerHTML = startStrusture;

let scoreCount = 0;
let dictCount = 0;
let dict = {};
let theme = 'black';
    loadAll();
    
const themes = {
    black: {
        borderColor: 'white',
        textColor: 'white',
        backgroundColor: 'black',
        icoSrc: 'src/icons/sun.svg'
    },
    light: {
        borderColor: 'black',
        textColor: 'black',
        backgroundColor: 'white',
        icoSrc: 'src/icons/moon.svg'
    },
};



//element for themes
/* const editTextElements = document.querySelectorAll('.text'),
      editButtons = document.querySelectorAll('button'),
      editInputs = document.querySelectorAll('input'),
      themeButton = document.getElementById("theme"); */
//elements on page
const checkButton = document.getElementById("check"),
      engInput = document.getElementById("eng"),
      ruInput = document.getElementById("ru"),
      addButton = document.getElementById("add"),
     startButton = document.getElementById("start"),
      clearButton = document.getElementById("clear"),
      searchInput = document.getElementById("search"),
      removeButton = document.getElementById("remove");
      


checkButton.addEventListener('click', () => {
    if (dictCount === 0) {
        redFlick(checkButton);
    } else {
        greenFlick(checkButton);
    }
});

addButton.addEventListener('click', () => {

        let engValue = engInput.value;   
        let ruValue = ruInput.value;
        let array = [];
        
    if (ruValue !== '' && engValue !== '') {

        engValue = engValue[0].toUpperCase() + engValue.slice(1);
        ruValue = ruValue[0].toUpperCase() + ruValue.slice(1);

        array.push(engValue);
        array.push(ruValue);

        dict[dictCount] = [...array];

        engInput.value = '';
        ruInput.value = '';

        greenFlick(addButton);
        dictCount++;
    } else {
        redFlick(addButton);
    }
    saveAll();
});

clearButton.addEventListener('click', () => {
    dict = {};
    dictCount = 0;
    greenFlick(clearButton);
    saveAll();
});

removeButton.addEventListener('click', () => {

    let editedValue =  searchInput.value.toString();
    let deleteStatus = false;
    let keyOfLastProperty = dictCount-1;
    for (let key in dict) {
        if (dict[key][0].toLowerCase() === editedValue.toLowerCase()) {
            dict[key] = [...dict[keyOfLastProperty]];
            delete dict.keyOfLastProperty;
            dictCount--;
            deleteStatus = true;
            greenFlick(removeButton);
            saveAll();
        }
    }
    if (!deleteStatus) {
        redFlick(removeButton);
    }
});

startButton.addEventListener('click', () => {
    if (dictCount >= 10) {
        goToTest();
    } else {
        redFlick(startButton);
    }
});

themeButton.addEventListener('click', () => {

});
    function goToTest() {

        let indexOfCorrectButton = getRandomNumber(3);
        let indexOfcorrectTest = getRandomNumber(dictCount);

        document.body.innerHTML = testStrusture;
        /* const testButtons = document.querySelectorAll('button'),
              testTextElements = document.querySelectorAll('.text'); */
        //elements on page
    const scoreSpan = document.getElementById('scoreCount'),
        testingWord = document.getElementById('word'),
        firstAnswer = document.getElementById('firstAnswer'),
        secondAnswer = document.getElementById('secondAnswer'),
        thirdAnswer = document.getElementById('thirdAnswer'),
        exitButton = document.getElementById('exit');

        firstAnswer.addEventListener('click', () => {
            const indexOfButton = 0;
        
            if (indexOfButton === indexOfCorrectButton) {
                showColors();
                setTimeout(() => {
                    getNewTest();
                }, 1000);
                scoreCount+=10;
                
            } else {
                showColors();
                setTimeout(() => {
                    getNewTest();
                }, 1000);
                scoreCount-=5;
                
                
            }
        });
        
        secondAnswer.addEventListener('click', () => {
            const indexOfButton = 1;
        
            if (indexOfButton === indexOfCorrectButton) {
                showColors();
                setTimeout(() => {
                    getNewTest();
                }, 1000);
                scoreCount+=10;
                
            } else {
                showColors();
                setTimeout(() => {
                    getNewTest();
                }, 1000);
                scoreCount-=5;
                
            }
        });
        
        thirdAnswer.addEventListener('click', () => {
            const indexOfButton = 2;
        
            if (indexOfButton === indexOfCorrectButton) {
                showColors();
                setTimeout(() => {
                    getNewTest();
                }, 1000);
                scoreCount+=10;
                
            } else {
                showColors();
                setTimeout(() => {
                    getNewTest();
                }, 1000);
                scoreCount-=5;
                
            }
        });
        
        exitButton.addEventListener('click', ()=> {
            saveAll();
            greenFlick(exitButton);
            document.body.innerHTML = startStrusture;
        });
        
        getNewTest();

        function getNewTest() {
            indexOfCorrectButton = getRandomNumber(3);
            indexOfcorrectTest = getRandomNumber(dictCount);

            testingWord.innerHTML = dict[indexOfcorrectTest][0];
            scoreSpan.textContent = scoreCount.toString();
            getAnswers();
        }

        function showColors() {
            if (indexOfCorrectButton === 0) {
                greenFlick(firstAnswer);
                redFlick(secondAnswer);
                redFlick(thirdAnswer);
            } else if(indexOfCorrectButton === 1) {
                greenFlick(secondAnswer);
                redFlick(firstAnswer);
                redFlick(thirdAnswer);
            } else if(indexOfCorrectButton === 2) {
                greenFlick(thirdAnswer);
                redFlick(firstAnswer);
                redFlick(secondAnswer);
            }
        }

        function getAnswers() {

            const falseTests = [...getRandomWordsFromDictionry()];

            if (indexOfCorrectButton === 0) {
                firstAnswer.textContent = dict[indexOfcorrectTest][1];

                secondAnswer.textContent = falseTests[0];
                thirdAnswer.textContent = falseTests[1];
            } else if(indexOfCorrectButton === 1) {
                secondAnswer.textContent = dict[indexOfcorrectTest][1];

                firstAnswer.textContent = falseTests[0];
                thirdAnswer.textContent = falseTests[1];
            } else if(indexOfCorrectButton === 2) {
                thirdAnswer.textContent = dict[indexOfcorrectTest][1];

                firstAnswer.textContent = falseTests[0];
                secondAnswer.textContent = falseTests[1];
            }
        }

        function getRandomWordsFromDictionry() {
            const words = [];
            let randomNumber = getRandomNumber(dictCount);
        
            while (randomNumber == indexOfcorrectTest) {
                randomNumber = getRandomNumber(dictCount);
            }
        
            words.push(dict[randomNumber][1]);
        
            while (randomNumber == indexOfcorrectTest || words.indexOf(dict[randomNumber][1]) !== -1) {
                randomNumber = getRandomNumber(dictCount);
            }
        
            words.push(dict[randomNumber][1]);
            console.log(words);
            return words;
        }
    }

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function saveAll() {
    localStorage.setItem('database', JSON.stringify(dict));
    localStorage.setItem('databaseLen', dictCount.toString());
    localStorage.setItem('score', scoreCount.toString());
    localStorage.setItem('theme', theme);
}

function loadAll() {
    if (localStorage.getItem('score') !== null) {
        scoreCount = +localStorage.getItem('score');
    }

    if (localStorage.getItem('databaseLen') !== null) {
        dictCount = +localStorage.getItem('databaseLen');
    }

    if (JSON.parse(localStorage.getItem('database')) !== null) {
        dict = JSON.parse(localStorage.getItem('database'));
    }

   /*  if (localStorage.getItem('theme') !== null) {
        theme = localStorage.getItem('theme');
    } */
}

function greenFlick (element) {
    element.style.borderColor = 'green';
    setTimeout(() => {
        element.style.borderColor = 'azure';
    }, 1000);
}

function redFlick (element) {
    element.style.borderColor = 'red';
    setTimeout(() => {
        element.style.borderColor = 'azure';
    }, 1000);
}

function switchTheme() {

}
