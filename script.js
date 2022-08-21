const word__el = document.getElementById('word'),
    wrong__el = document.getElementById('wrong__letters'),
    play__btn = document.getElementById('play__btn'),
    popup = document.getElementById('popup__container'),
    notification = document.getElementById('notification__container'),
    final__message = document.getElementById('final__message'),
    figure__parts = document.querySelectorAll('.figure__part'),
    words = ['name', 'girl', 'book'];

let selected__word = words[Math.floor(Math.random() * words.length)];

const correct__letters = [],
    wrong__letters = [];

//Show hidden word
function displayWord() {
    word__el.innerHTML = `
        ${selected__word
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correct__letters.includes(letter) ? letter : ''}
                    </span>`
                )
            .join('')}
    `;
    const inner__word = word__el.innerText.replace(/\n/g, '')

    if (inner__word === selected__word) {
        final__message.innerText = "Congratulations! You won! 😃";
        popup.style.display = 'flex';
    }
}

//Update the wrong letters
function updateWrongLetters() {
    wrong__el.innerHTML = `
        ${wrong__letters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrong__letters.map(letter =>`<span>${letter}</span>`)}
    `;

    //Display parts
    figure__parts.forEach((part, index) => {
        const errors = wrong__letters.length;

        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    //Check lost
    if(wrong__letters.length === figure__parts.length){
        final__message.innerText = "Ohh no, you lost!😢";
        popup.style.display = 'flex';
    }
}

//Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

//Keydown listener
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selected__word.includes(letter)) {
            if (!correct__letters.includes(letter)) {
                correct__letters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrong__letters.includes(letter)) {
                wrong__letters.push(letter);

                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
});

play__btn.addEventListener('click', () => {
    correct__letters.splice(0);
    wrong__letters.splice(0);

    selected__word = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetters();

    popup.style.display = "none";
});


displayWord();