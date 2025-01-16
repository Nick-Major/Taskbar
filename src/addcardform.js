export default class AddCardForm {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    static get markup() {
        return `
     <form class="add-card">
        <input class="add-card-input" type="text" placeholder="Enter a title for this card...">
        <div class="add-card-wrap">
            <button class="add-card-btn">Add Card</button>
            <span class="close-add-form">X</span>
        </div>
     </form>
        `
    }

    static get addCardFormSelector() {
        return '.add-card';
    }

    static get addCardInputSelector() {
        return '.add-card-input';
    }

    static get addCardWrapSelector() {
        return '.add-card-wrap';
    }

    static get addCardBtnSelector() {
        return '.add-card-btn';
    }

    static get closeAddFormSelector() {
        return '.close-add-form';
    }

    bindToDOM() {
        this.parentEl.innerHTML = AddCardForm.markup;

        this.form = this.parentEl.querySelector(AddCardForm.addCardFormSelector);
        this.input = this.form.querySelector(AddCardForm.addCardInputSelector);
        this.wrap = this.form.querySelector(AddCardForm.addCardWrapSelector);
        this.btn = this.wrap.querySelector(AddCardForm.addCardBtnSelector);
        this.close = this.wrap.querySelector(AddCardForm.closeAddFormSelector);
    }
}