import AddCardForm from "./addcardform";

document.addEventListener('DOMContentLoaded', ()=> {
    const btns = document.querySelectorAll('.btn');
    const addFormContainer = document.createElement('div');
    const closeAddForm = document.querySelector('.close-add-form');
    const openAddForm = document.querySelector('.add-card');

    btns.forEach((b) => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            const column = e.target.closest('.column');
            column.append(addFormContainer);
            const addForm = new AddCardForm(addFormContainer);
            addForm.bindToDOM();
            e.target.classList.add('hide-btn');
            if(openAddForm) {
                closeAddForm.addEventListener('click', ()=> {
                    openAddForm.remove();
                })
            }
        })
    })


})