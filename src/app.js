import AddCardForm from "./addcardform";
import Card from "./card";

document.addEventListener('DOMContentLoaded', ()=> {
    const btns = document.querySelectorAll('.btn');
    const container = document.querySelector('.container');

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
        };

        const mouseUpItem = e.target;
        const closestColumn = mouseUpItem.closest('.column');
        const closestCardContainer = mouseUpItem.closest('.card-container');

        if(!closestColumn) {
            return;
        };

        if(closestColumn) {
            const closestCardList = closestColumn.querySelector('.card-list');
            
            // console.log(actualEl);
            // console.log(closestCardList);
            // console.log(closestColumn);
            // console.log(closestCardContainer);

            if(!closestCardContainer) {
                closestCardList.insertBefore(actualEl, null);
            } else {
                closestCardList.insertBefore(actualEl, closestCardContainer);
            }
            
            actualEl.classList.remove('draggable');
            actualEl = null;
            container.onmousedown = container.onselectstart = function() { return true; };
            document.documentElement.removeEventListener('mousemove', onMouseMove);
            document.documentElement.removeEventListener('mouseup', onMouseUp);
        };

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
            container.onmousedown = container.onselectstart = function() { return false; };
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

