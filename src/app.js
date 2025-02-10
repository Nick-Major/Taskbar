import AddCardForm from "./addcardform";
import Card from "./card";

document.addEventListener('DOMContentLoaded', ()=> {
    const btns = document.querySelectorAll('.btn');
    const container = document.querySelector('.container');

    // Функция для сохранения текущего состояния DOM
    function saveDOMState() {
        const container = document.querySelector('.container');
        localStorage.setItem('savedDOM', container.innerHTML); // Сохраняем HTML
    };

    // Функция для восстановления состояния DOM
    function restoreDOMState() {
        const savedDOM = localStorage.getItem('savedDOM');
        if (savedDOM) {
          const container = document.querySelector('.container');
          container.innerHTML = savedDOM; // Восстанавливаем HTML
        };
    };

    // Настройка MutationObserver
    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            saveDOMState(); // Сохраняем состояние при изменении DOM
          }
        });
    });

    // Начало наблюдения за изменениями
    observer.observe(container, {
      childList: true, // Отслеживать изменения в дочерних элементах
      subtree: true,   // Отслеживать изменения во всём поддереве
      attributes: true, // Отслеживать изменения атрибутов
      characterData: true // Отслеживать изменения текстовых узлов
    });

    // Восстановление состояния DOM при загрузке страницы
    window.addEventListener('load', () => {
      restoreDOMState();
    });

    let actualEl;
    let shiftX;
    let shiftY;
    let cardCap;

    const onMouseMove = (e) => {
        // если нету actualEl - не перемещать
        if (!actualEl) {
            return;
        };

        // при взятии карточки, вместо взятой карточкой должна появляться заглушка
        // при наведении на другую карточку, она должна сдвигаться вниз и вместо нее должна появляться заглушка
        let closestCardContainer = e.target.closest('.card-container');
        let closestCardList = e.target.closest('.card-list');

        if (!closestCardList) {
            return;
        };

        if (closestCardList && !closestCardContainer) {
            closestCardList.insertBefore(cardCap, null);
        };

        if (closestCardContainer) {
            closestCardContainer.parentNode.insertBefore(cardCap, closestCardContainer);
        };

        // отрисовываем actualEl (card-container) во времея перемещения курсора
        actualEl.style.left = e.pageX - shiftX + 'px';
        actualEl.style.top = e.pageY - shiftY + 'px';
    };

    const onMouseUp = (e) => {
        // если нету actualEl - не перемещать
        if (!actualEl) {
            return;
        };

        // получаем координаты курсора
        let clientX = e.clientX;
        let clientY = e.clientY;

        // получаем живую коллекцию элементов под курсором по координатам курсора
        const bottomEl = document.elementsFromPoint(clientX, clientY);

        // получаем контейнер для карточек
        const cardList = bottomEl.find(tag => tag.classList.value === 'card-list');

        // console.log('Колонка: ', cardList);
        // console.log('Карточка: ', actualEl);
        // console.log('Заглушка', cardCap);
        
        if (!cardList) {
            return;
        };

        if (!cardCap.parentNode === cardList) {
            return
        };
        
        // Вставляем карточку в новое место
        cardList.insertBefore(actualEl, cardCap);

        // убираем абсолютное позиционирование с actualEl
        actualEl.classList.remove('draggable');

        // обнуляем actualEl, убираем cardCap, обнуляем расстояние от курсора до левого верхнего угла card-container
        cardCap.remove();
        actualEl = null;
        shiftX = null;
        shiftY = null;

        // возвращаем стили курсора элементам
        document.documentElement.style.cursor = 'auto';

        // возвращаем выделение текста в документе
        container.onselectstart = function() { return true; };

        // отписываемся от mousemove, mouseover, mouseup
        document.documentElement.removeEventListener('mousemove', onMouseMove);
        document.documentElement.removeEventListener('mouseup', onMouseUp);
    };
    
    
    document.documentElement.addEventListener('mousedown', (e) => {
        // если кликнули на крестики - не делать драгндроп
        if ( e.target.classList.contains('close-card-icon') ) {
            actualEl = null;
            return;
        };
        // записываем в actualEl e.target
        actualEl = e.target;

        //получаем ближайший к e.target card-container
        const cardContainer = actualEl.closest('.card-container');

        // если нету card-container начинаем поиск заново
        if(!cardContainer) {
            return;
        };

        // записываем в actualEl ближайший card-container
        actualEl = cardContainer;

        // получаем размеры заглушки
        let cardEl = actualEl.querySelector('.card');
        let widthEl = cardEl.offsetWidth;
        let height = cardEl.offsetHeight;

        // записываем в переменную тэг заглушки и задаем ей размеры и класс
        cardCap = document.createElement('div');
        cardCap.style.width = widthEl + 'px';
        cardCap.style.height = height + 'px';
        cardCap.classList.add('card-cap');

        // при взятии карточки на ее место устанавливаем заглушку
        actualEl.parentNode.insertBefore(cardCap, actualEl);
        
        // получаем расстояние от курсора до левого верхнего угла card-container
        let currentShiftX = e.clientX - cardContainer.getBoundingClientRect().left;
        let currentShiftY = e.clientY - cardContainer.getBoundingClientRect().top;

        // записываем расстояние от курсора до левого верхнего угла card-container в переменные в глобальной области видимости
        shiftX = currentShiftX;
        shiftY = currentShiftY;

        // делаем actualEl (card-container) абсолютно спозиционированным
        actualEl.classList.add('draggable');
        
        // отключаем появление курсора на всем документе
        document.documentElement.style.cursor = 'none';

        // отключаем выделение текста на документе
        container.onselectstart = function() { return false; };

        // подписываемся на mousemove, mouseover, mouseup
        document.documentElement.addEventListener('mousemove', onMouseMove);
        document.documentElement.addEventListener('mouseup', onMouseUp);
    });
    
    // клик по кнопкам, которые открывают форму создания карточки
    btns.forEach((b) => {
        b.addEventListener('click', (e) => {
            // убираем поведение по умолчанию, чтобы не обновлялась страница
            e.preventDefault();
            // добавляем и показываем форму создания карточки
            const column = e.target.closest('.column');
            const cardList = column.querySelector('.card-list');
            const addFormContainer = document.createElement('div');
            addFormContainer.classList.add('form-container');
            cardList.before(addFormContainer);
            const addForm = new AddCardForm(addFormContainer);
            addForm.bindToDOM();
            const addCardForm = column.querySelector('.add-card');
            const input = column.querySelector('.add-card-input');
            // скрываем кнопку добавления виджета создания карточки
            e.target.classList.add('hidden');
            // заполняем карточку
            input.addEventListener('change', (e)=> {
                e.preventDefault();

                const value = e.target.value;
                const cardAddBtn = column.querySelector('.add-card-btn');

                // добавляем карточку в колонку по клику на кнопку
                cardAddBtn.addEventListener('click', (e) => {
                    // убираем поведение по умолчанию, чтобы не обновлялась страница
                    e.preventDefault();
                    // заполняем текст новой карточки и добавляем карточку в текущую колонку
                    const cardList = column.querySelector('.card-list');
                    const cardContainer = document.createElement('div');
                    cardContainer.classList.add('card-container');
                    cardList.append(cardContainer);
                    const card = new Card(cardContainer);
                    card.bindCardToDOM(value);

                    // находим крестик на карточке
                    const closeCard = cardContainer.querySelector('.close-card-icon');

                    // по нажатию на крестик удаляем выбранную карточку
                    closeCard.addEventListener('click', (e) => {
                        const target = e.target;

                        const cardContToDel = target.closest('.card-container');
                        cardContToDel.remove();
                    });
                    
                    // при наведении на карточку показываем крестик
                    cardContainer.addEventListener('mouseover', (e) => {
                        closeCard.classList.remove('hidden');
                    });

                    // при уводе курсора с карточки скрываем крестик 
                    cardContainer.addEventListener('mouseout', (e) => {
                        closeCard.classList.add('hidden');                        
                    });
                    
                    //находим кнопку добавления карточки на страницу
                    const btnEl = column.querySelector('.btn');

                    // сбрасываем значения в полях ввода карточки
                    addCardForm.reset();
                    
                    // удаляем виджет добавления карточки
                    addFormContainer.remove();
                    // показываем кнопку открытия формы добавления карточки
                    btnEl.classList.remove('hidden');
                })
            })
        })
    });

    // скрываем форму создания карточки по клику на крестик
    document.addEventListener('click', (e) => {
        
        const target = e.target;
        const isClose = target.classList.contains('close-add-form');
        
        // убираем со траницы форму создания карточки и показываем кнопку открытия формы создания карточки
        if(isClose) {
            const closeEl = target;
            const formContainer = closeEl.closest('.form-container');
            const columnEl = closeEl.closest('.column');
            const btnEl = columnEl.querySelector('.btn');
            
            formContainer.remove();
            btnEl.classList.remove('hidden');
        };
    });
})
