import AddCardForm from "./addcardform";
import Card from "./card";

document.addEventListener('DOMContentLoaded', ()=> {
    const btns = document.querySelectorAll('.btn');

    btns.forEach((b) => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            const column = e.target.closest('.column');
            const addFormContainer = document.createElement('div');
            addFormContainer.classList.add('form-container');
            column.append(addFormContainer);
            const addForm = new AddCardForm(addFormContainer);
            addForm.bindToDOM();
            const input = column.querySelector('.add-card-input');
            
            
            e.target.classList.add('hide-btn');
            console.log(input);
            input.addEventListener('change', (e)=> {
                e.preventDefault();

                const value = e.target.value;
                const cardAddBtn = column.querySelector('.add-card-btn');
                console.log(cardAddBtn);

                cardAddBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cardContainer = document.createElement('div');
                    cardContainer.classList.add('card-container');
                    column.append(cardContainer);
                    const card = new Card(cardContainer);
                    card.bindCardToDOM(value);
                })
            })
        })
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        const isClose = target.classList.contains('close-add-form');
    
        if(isClose) {
            const closeEl = target;
            const formContainer = closeEl.closest('.form-container');
            const columnEl = closeEl.closest('.column');
            const btnEl = columnEl.querySelector('.btn');
            
            formContainer.remove();
            btnEl.classList.remove('hide-btn');
        }
    
        // if(isCardAddBtn) {
        //     e.preventDefault();
        //     const addCardBtn = target;
        //     const column = addCardBtn.closest('.column');
            
            
        //     const cardContainer = document.createElement('div');
        //     cardContainer.classList.add('card-container');
        //     column.append(cardContainer);
            
        //     const card = new Card(cardContainer);
        //     card.bindCardToDOM(value);
        // }
    
    })
    

})

