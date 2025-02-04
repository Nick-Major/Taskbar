export default class Card {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    static get cardMarkup() {
        return `
        <div class="card">
            <div class="card-content"></div>
            <span class="close-card-icon hidden">X</span>
        </div>
        `
    }

    static get cardSelector() {
        return '.card';
    }

    static get cardContent() {
        return '.card-content';
    }

    static get closeIcon() {
        return '.close-card-icon hidden';
    }

    bindCardToDOM(value) {
        this.parentEl.innerHTML = Card.cardMarkup;
        
        this.card = this.parentEl.querySelector(Card.cardSelector);
        this.content = this.card.querySelector(Card.cardContent);
        this.content.textContent = value;
        this.closingBtn = this.card.querySelector(Card.closeIcon);
    }

}