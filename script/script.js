const cardsElem = document.querySelector('#cards');
const findElem = document.querySelector('#find');
const formElem = document.forms[0];
const wordElem = formElem.word;
const colorElem = formElem.color;
const translationElem = formElem.translation;



const get_card = () => JSON.parse(localStorage.getItem('card')) || [];
const add_card = card => localStorage.setItem('card', JSON.stringify([...get_card(),card]));
const remove_card = card =>{
    const new_list = get_card().filter(elem => elem.word !== card.word);
    localStorage.setItem('card', JSON.stringify(new_list))
}

function render(words) {
    cardsElem.innerText = '';
    for (let i = 0; i < words.length; i++) {
        const card = document.createElement('div');
        const closeElem = document.createElement('div');
        const cardsWordElem = document.createElement('p');

        closeElem.addEventListener('click', () => {
           remove_card(words[i]);
            render(get_card());
        });

        let translate = true;
        card.addEventListener('dblclick', () => {
            if (translate == true) {
                cardsWordElem.innerText = get_card()[i].translation;
                translate = false;
            } else {
                cardsWordElem.innerText = get_card()[i].word;
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
         add_card({
            word: wordElem.value,
            translation: translationElem.value,
            color: colorElem.value,
        });
    } else {
        alert('нужно заполнить всё');
    }
    wordElem.value = '';
    colorElem.value = '';
    translationElem.value = '';
     render(get_card());
});

findElem.addEventListener('input', event => {
    const value = event.target.value;
    render(value.length ? cards.filter(elem => elem.word.startsWith(value)) : cards);
});
render(get_card());
