const cardsElem = document.querySelector('#cards');
const findElem = document.querySelector('#find');
const formElem = document.forms[0];
const wordElem = formElem.word;
const colorElem = formElem.color;
const translationElem = formElem.translation;



let cards = [];

function render(words) {
    cardsElem.innerText = '';
    for (let i = 0; i < words.length; i++) {
        const card = document.createElement('div');
        const closeElem = document.createElement('div');
        const cardsWordElem = document.createElement('p');

        closeElem.addEventListener('click', () => {
            findElem.value = '';
            cards = cards.filter(elem => elem.word != (words[i].word || words[i].translation));
            render(cards);
        });

        let translate = true;
        card.addEventListener('dblclick', () => {
            if (translate == true) {
                cardsWordElem.innerText = cards[i].translation;
                translate = false;
            } else {
                cardsWordElem.innerText = cards[i].word;
                translate = true;
            }
        });
                closeElem.classList.add('close');
        card.classList.add('card');

        card.append(cardsWordElem, closeElem);
        cardsElem.appendChild(card);

        closeElem.innerText = '❌';
        cardsWordElem.innerText = words[i].word;
        card.style.backgroundColor = words[i].color;
    };
};

formElem.addEventListener('submit', event => {
    event.preventDefault();
    if (wordElem.value != '' && translationElem.value != '' && colorElem.value != '') {
        cards.push({
            word: wordElem.value,
            translation: translationElem.value,
            color: colorElem.value,
        });
    } else {
        alert('нужно заполнить все поля ввода!');
    }
    wordElem.value = '';
    colorElem.value = '';
    translationElem.value = '';
    render(cards);
});

findElem.addEventListener('input', event => {
    const value = event.target.value;
    render(value.length ? cards.filter(elem => elem.word.startsWith(value)) : cards);
});