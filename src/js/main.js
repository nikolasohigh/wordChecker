
const startStrusture = ` <div class="main__wrapper">
<div class="inputs__wrapper">
     <div class="word__wrapper">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
         <input type="text" class="wordValue">
     </div>
     <div class="translate__wrapper">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
         <input type="text" class="translateValue">
     </div>
</div>

</div>
<button id="submit">Submit</button>
<script src="src/js/main.js"></script>
`;

const testStrusture = `    <div class="main__wrapper">
<div class="inputs__wrapper">
     <div class="word__wrapper">
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
         <span class="checkedWord"></span>
     </div>
     <div class="translate__wrapper">
     <input type="text" class="answer">
     <span class="checkout" id="checkout1">&#9744;</span> 
     <input type="text" class="answer">
     <span class="checkout" id="checkout2">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout3">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout4">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout5">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout6">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout7">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout8">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout9">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout10">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout11">&#9744;</span>
     <input type="text" class="answer">
     <span class="checkout" id="checkout12">&#9744;</span>
     </div>
</div>

</div>
<button id="getResult">Get Result</button>
<script src="src/js/main.js"></script>
`;

goToStart();

const words = [],
      translates = []; 

const wordInputs = document.querySelectorAll(".wordValue"),
      translateInputs = document.querySelectorAll(".translateValue");

const submitButton = document.getElementById("submit");

submitButton.addEventListener('click', () => {
    saveWords();
    goToTest();
});





function goToTest() {
    document.body.innerHTML = testStrusture;

    const randomWords = [...words];
    const trueWords = [];
    randomWords.sort();

    const resultButton = document.getElementById('getResult');
    const answers = document.querySelectorAll('.answer');
    const checkedWords = document.querySelectorAll('.checkedWord');
   

    checkedWords.forEach((item, i) => {
        item.textContent = randomWords[i];
        trueWords[i] = randomWords[i];
    });
    

    resultButton.addEventListener('click', () => {
        answers.forEach((item, i) => {
            if (translates.indexOf(item.value) === words.indexOf(trueWords[i])) {
                document.getElementById(`checkout${i+1}`).style.color = 'green';
                document.getElementById(`checkout${i+1}`).innerHTML = '&#9745;';
            } else {
                document.getElementById(`checkout${i+1}`).style.color = 'red';
                document.getElementById(`checkout${i+1}`).innerHTML = '&#9746;';
            }
        });
    });

}

function saveWords() {
    wordInputs.forEach(item => {
        words.push(item.value);
    });

    translateInputs.forEach(item => {
        translates.push(item.value);
    });
}

function goToStart() {
    document.body.innerHTML = startStrusture;
}

