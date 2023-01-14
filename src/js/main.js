
const startStrusture = `
<div class="title baseeditor__title">Edit your database</div>
<div class="subtitle baseeditor__subtitle">
    <div class="baseeditor__subtitle__text">Check your base of words:</div>
    <button class="baseeditor__button" id="check">Check</button>
</div>
<div class="baseeditor__editor">
    <input type="text" id="eng" placeholder="English" class="baseeditor__editor__input">
    <input type="text" id="ru" placeholder="Russian" class="baseeditor__editor__input">
    <button class="baseeditor__editor__button" id="add">Add word</button>
</div>
<div class="baseeditor__start">
    <div class="title baseeditor__start__title">Start</div>
    <button class="baseeditor__start__button" id="start">Start testing</button>
</div>
<div class="baseeditor__extra">
<div class="title extra__title">Extra zone</div>
<button class="baseeditor__extra__button-clear" id="clear">Clear database</button>
<div class="baseeditor__extra_search">
    <input type="text" id="search" class="baseeditor__extra_search__input" placeholder="English">
    <button class="baseeditor__extra__button-remove" id="remove">Remove</button>
</div>
<button class="baseeditor__extra__button-savebase" id="savebase">Save Databse</button>
</div>
<script src="src/js/main.js"></script>
`;

const testStrusture =`
<header class="header">
        <div class="title test__title">Testing</div>
        <div class="test__score">Score: <span id="scoreCount">100</span></div>
        
    </header>

    <div class="test__word" id="word">Example</div>

    <div class="test__buttonblock">
        <div class="title test__title">Choose the correct answer</div>
        <button class="test__button" id="firstAnswer">Example</button>
        <button class="test__button" id="secondAnswer">Example</button>
        <button class="test__button" id="thirdAnswer">Example</button>
        <div class="test__saveandexit">
            <button class="test-save" id="save">Save</button>
            <button class="test-save" id="exit">Exit</button>
        </div>
    </div>
</div>
<script src="src/js/main.js"></script>
`;

document.body.innerHTML = startStrusture;
//variables
let scoreCount = 0;
    if (localStorage.getItem('score') !== null) {
        scoreCount = +localStorage.getItem('score');
    }
let dictCount = 0;
    if (localStorage.getItem('databaseLen') !== null) {
        dictCount = +localStorage.getItem('databaseLen');
    }
let dict = {};
    if (JSON.parse(localStorage.getItem('database')) !== null) {
        dict = JSON.parse(localStorage.getItem('database'));
    }
//elements edit
const checkButton = document.getElementById("check"),
      engInput = document.getElementById("eng"),
      ruInput = document.getElementById("ru"),
      addButton = document.getElementById("add"),
//start
     startButton = document.getElementById("start"),
//extra
      clearButton = document.getElementById("clear"),
      searchInput = document.getElementById("search"),
      saveBaseButton = document.getElementById("savebase"),
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
    
});

clearButton.addEventListener('click', () => {
    dict = {};
    dictCount = 0;
    greenFlick(clearButton);
});

removeButton.addEventListener('click', () => {
    let editedValue =  searchInput.value.toString()[0].toUpperCase() + searchInput.value.slice(1);
    let deleteStatus = false;
    for (let key in dict) {
        if (dict[key][0] == editedValue) {
            deleteStatus = true;
            dict[key] = [...dict[dictCount-1]];
            dictCount--;
            delete dict[dictCount];
            
            greenFlick(removeButton);
        }
    }
    if (!deleteStatus) {
        redFlick(removeButton);
    }
});

saveBaseButton.addEventListener('click', () => {
    localStorage.setItem('database', JSON.stringify(dict));
    localStorage.setItem('databaseLen', dictCount.toString());
    localStorage.setItem('score', scoreCount.toString());
    greenFlick(saveBaseButton);
});

startButton.addEventListener('click', () => {
    if (dictCount >= 10) goToTest();
    else redFlick(startButton);
});


function goToTest() {
    document.body.innerHTML = testStrusture;
    //elements
const scoreSpan = document.getElementById('scoreCount'),
      testingWord = document.getElementById('word'),
      firstAnswer = document.getElementById('firstAnswer'),
      secondAnswer = document.getElementById('secondAnswer'),
      thirdAnswer = document.getElementById('thirdAnswer'),
      exitButton = document.getElementById('exit'),
      saveButton = document.getElementById('save');

      let indexOfCorrectButton = getRandomNumber(3);
      let indexOfcorrectTest = getRandomNumber(dictCount);


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
        greenFlick(exitButton);
        document.body.innerHTML = startStrusture;
    });
    
    saveButton.addEventListener('click', ()=> {
        greenFlick(saveButton);
        localStorage.setItem('score', scoreCount.toString());
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
        if (indexOfCorrectButton === 0) {
            firstAnswer.textContent = dict[indexOfcorrectTest][1];

            secondAnswer.textContent = dict[getRandomNumber(dictCount)][1];
            thirdAnswer.textContent = dict[getRandomNumber(dictCount)][1];
        } else if(indexOfCorrectButton === 1) {
            secondAnswer.textContent = dict[indexOfcorrectTest][1];

            firstAnswer.textContent = dict[getRandomNumber(dictCount)][1];
            thirdAnswer.textContent = dict[getRandomNumber(dictCount)][1];
        } else if(indexOfCorrectButton === 2) {
            thirdAnswer.textContent = dict[indexOfcorrectTest][1];

            firstAnswer.textContent = dict[getRandomNumber(dictCount)][1];
            secondAnswer.textContent = dict[getRandomNumber(dictCount)][1];
        }
    }
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

 function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }