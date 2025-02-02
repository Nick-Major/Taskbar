import image from '../src/images/Hand.png';

export default class Card {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    static get cardMarkup() {
        return `
        <div class="card">
            <div class="card-content"></div>
            <img class="grabbing-hand hidden" src="" alt="Hand">
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

    static get grabbingHand() {
        return '.grabbing-hand';
    }

    static get closeIcon() {
        return '.close-card-icon hidden';
    }

    bindCardToDOM(value) {
        this.parentEl.innerHTML = Card.cardMarkup;
        
        this.card = this.parentEl.querySelector(Card.cardSelector);
        this.content = this.card.querySelector(Card.cardContent);
        this.content.textContent = value;
        this.img = this.card.querySelector(Card.grabbingHand);
        this.img.src = image;
        this.closingBtn = this.card.querySelector(Card.closeIcon);
    }

}