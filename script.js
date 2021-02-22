const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainbtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts=document.querySelectorAll('.figure-part');

const words=['application', 'programming' ,'interface', 'wizard','functional','blushing','question',
'responsible','bustling','kindhearted','complete','obsolete','cumbersome','transport','important',
'rhetorical','challenge','uninterested','arithmetic','determine','heartbreaking','beginner','scintillating','downtown','judicious'];

let selectedWord= words[Math.floor(Math.random() * words.length)];

const correctLetters=[];
const wrongLetters=[];

//Show Hidden Word
function displayWord() {
  wordEl.innerHTML=`
    ${selectedWord.split('').map(letter =>
      `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>
      `
    ).join('')}
  `;

  const innerWord= wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText='Congratulations! You won!😀'
    popup.style.display='flex';
  }
}

//Update the wrong letters
function updateWrongLetterEl() {
  //Display Wrong Letters
  wrongLettersEl.innerHTML=`
    ${wrongLetters.length> 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  //Display Parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display='block';
    }else{
      part.style.display='none';
    }
  });

  //Check if Lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText= `Unfortunately you lost.🙁 The word was ${selectedWord}`;
    popup.style.display= 'flex';
  }
}

//Show Notifiation
function showNotifiation() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  },2000);
}

//KeyDown letter press
window.addEventListener('keydown', function (e) {
  if (e.keyCode >= 65 && e.keyCode<=90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      }
      else {
        showNotifiation();
      }
    }
    else{
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      }else {
        showNotifiation();
      }
    }
  }
});

//Restart game and play again
playAgainbtn.addEventListener('click', function (e) {
  //Empty Arrays

  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord= words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterEl();

  popup.style.display='none';
});

displayWord();
