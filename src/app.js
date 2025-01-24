import AddCardForm from "./addcardform";
import Card from "./card";
import DragAndDrop from "./dnd";

document.addEventListener('DOMContentLoaded', ()=> {
    const btns = document.querySelectorAll('.btn');
    const cardLists = document.querySelectorAll('.card-list');

    let actualEl;

    function moveAt(pageX, pageY) {
        actualEl.style.left = pageX + 'px';
        actualEl.style.top = pageY + 'px';
    }

    const onMouseMove = (e) => {
        // если нету acrualElem - не перемещать
        if (!actualEl) {
            return;
        }
        moveAt(e.pageX, e.pageY);
    };

    const onMouseUp = (e) => {
        // если нету acrualElem - не перемещать
        if (!actualEl) {
            return;
        }


        const mouseUpItem = e.target;
        const cardContainer = mouseUpItem.closest('.card-container');

        console.log(actualEl);
        

        if(cardContainer) {
            const cl = cardContainer.closest('.card-list');
            cl.insertBefore(actualEl, cardContainer);
        };

        actualEl.classList.remove('draggable');
        actualEl = undefined;
        document.documentElement.removeEventListener('mousemove', onMouseMove);
        document.documentElement.removeEventListener('mouseup', onMouseUp);
    };
    
    // если кликнули на крестки - не делать драгндроп
    document.addEventListener('mousedown', (e) => {
        if ( e.target.classList.contains('close-card-icon') ) {
            actualEl = null;
            return;
        }
        actualEl = e.target;
        const cardContainer = actualEl.closest('.card-container');
        if(!cardContainer) {
            return;
        }

        actualEl = cardContainer;

        if(cardContainer) {
            actualEl.classList.add('draggable');
            document.documentElement.addEventListener('mousemove', onMouseMove);
            document.documentElement.addEventListener('mouseup', onMouseUp);
        }
    });
    

    btns.forEach((b) => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            const column = e.target.closest('.column');
            const cardList = column.querySelector('.card-list');
            const addFormContainer = document.createElement('div');
            addFormContainer.classList.add('form-container');
            cardList.before(addFormContainer);
            const addForm = new AddCardForm(addFormContainer);
            addForm.bindToDOM();
            const addCardForm = column.querySelector('.add-card');
            const input = column.querySelector('.add-card-input');
            e.target.classList.add('hidden'); // скрываю кнопку добавления виджета создания карточки

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

                    const closeCard = cardContainer.querySelector('.close-card-icon');

                    closeCard.addEventListener('click', (e) => {
                        const target = e.target;

                        const cardContToDel = target.closest('.card-container');
                        cardContToDel.remove();
                    })
                    
                    cardContainer.addEventListener('mouseover', (e) => {
                        closeCard.classList.remove('hidden');
                    });

                    cardContainer.addEventListener('mouseout', (e) => {
                        closeCard.classList.add('hidden');                        
                    });
                    
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
    
        if(isClose) {
            const closeEl = target;
            const formContainer = closeEl.closest('.form-container');
            const columnEl = closeEl.closest('.column');
            const btnEl = columnEl.querySelector('.btn');
            
            formContainer.remove();
            btnEl.classList.remove('hidden');
        };

        const isCardClose = target.classList.contains('close-card-icon');

        

        if(isCardClose) {
            const cardContainer = target.closest('.card-container');

            cardContainer.remove();
        }
    });
})

