export default class Card {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    static get cardMarkup() {
        return `
        <div class="card">
            <div class="card-content"></div>
            <span class="close-card-icon-disabled">X</span>
        </div>
        `
    }

    static get cardSelector() {
        return '.card';
    }

    static get cardContentSelector() {
        return '.card-content';
    }

    static get closeIconSelector() {
        return '.close-card-icon-disabled'
    }

}