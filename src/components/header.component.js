import {Component} from "../core/component";

export class HeaderComponent extends Component {
    constructor(id) {
        super(id);
    }
    init() {
        if (localStorage.getItem('visited')){
            this.hide()
        }
        this.$el.querySelector('.js-button').addEventListener('click', headerHandler.bind(this))
    }
}

function headerHandler() {
    this.hide()
    localStorage.setItem('visited', JSON.stringify(true))
}