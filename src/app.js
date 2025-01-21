import AddCardForm from "./addcardform";
import Card from "./card";

document.addEventListener('DOMContentLoaded', ()=> {
    const btns = document.querySelectorAll('.btn');

    btns.forEach((b) => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            const column = e.target.closest('.column');
            const cardList = column.querySelector('.card-list');
            const addFormContainer = document.createElement('div');
            addFormContainer.classList.add('form-container');
            cardList.before(addFormContainer);
            // column.append(addFormContainer);
            const addForm = new AddCardForm(addFormContainer);
            addForm.bindToDOM();
            const addCardForm = column.querySelector('.add-card');
            const input = column.querySelector('.add-card-input');
            e.target.classList.add('hidden');

            input.addEventListener('change', (e)=> {
                e.preventDefault();

                const value = e.target.value;
                const cardAddBtn = column.querySelector('.add-card-btn');


                cardAddBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cardList = column.querySelector('.card-list');
                    const cardContainer = document.createElement('div');
                    cardContainer.classList.add('card-container');
                    cardList.append(cardContainer);
                    const card = new Card(cardContainer);
                    card.bindCardToDOM(value);
                    const inputEl = column.querySelector('.add-card-input');
                    console.log(inputEl.value);
                    
                    const formContainer = column.querySelector('.form-container');
                    const btnEl = column.querySelector('.btn');

                    addCardForm.reset();
                    
                    formContainer.remove();
                    btnEl.classList.remove('hidden');
                })
            })
        })
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        const isClose = target.classList.contains('close-add-form');
        const isCardCloseIcon = target.classList.contains('close-card-icon');
    
        if(isClose) {
            const closeEl = target;
            const formContainer = closeEl.closest('.form-container');
            const columnEl = closeEl.closest('.column');
            const btnEl = columnEl.querySelector('.btn');
            
            formContainer.remove();
            btnEl.classList.remove('hidden');
        }

        if(isCardCloseIcon) {
            const cardClose = target;
            const cardContainer = cardClose.closest('.card-container');
            cardContainer.remove();
        }
    
    });

    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        const isCard = target.classList.contains('card');

        if(isCard) {
            const card = target;
            const closeCard = card.querySelector('.close-card-icon');
            console.log('Mouseover!');
            
            closeCard.classList.remove('hidden');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        const isCardContainer = target.classList.contains('card-container');

        if(isCardContainer) {
            const cardContainer = target;
            const closeCard = cardContainer.querySelector('.close-card-icon');
            console.log('Mouseout!');
            
            closeCard.classList.add('hidden');
        }
    });

})

