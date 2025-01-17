import AddCardForm from "./addcardform";

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
            e.target.classList.add('hide-btn');
        })
    });
    

})

document.addEventListener('click', (e) => {
    const target = e.target;
    const isClose = target.classList.contains('close-add-form');
    const isCardAddBtn = target.classList.contains('add-card-btn');

    if(isClose) {
        const closeEl = target;
        const formContainer = closeEl.closest('.form-container');
        const columnEl = closeEl.closest('.column');
        const btnEl = columnEl.querySelector('.btn');
        
        formContainer.remove();
        btnEl.classList.remove('hide-btn');
    }

})