import {Component} from "../core/component";
import {apiService} from "../../services/service";
import {renderPost} from "../template/post.template";


export class FavoriteComponent extends Component {
    constructor(id,{loader}) {
        super(id);
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', linkHandler.bind(this))
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }
    onHide() {
        this.$el.innerHTML = ''
    }
}

async function linkHandler(event) {
    if(event.target.classList.contains('js-link')) {
        this.loader.show()
        this.$el.innerHTML = ''
        const id = event.target.textContent
        const post = await apiService.fetchPostById(id)
        this.loader.hide()
        const html = renderPost(post, {withButton : false})
        this.$el.insertAdjacentHTML('afterbegin', html)
    }
}


function renderList(list) {
    if (list.length) {
        return `
            <ul>
                ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
            </ul>
        `
    }

    return `<p>Вы ничего не добавили</p>`
}