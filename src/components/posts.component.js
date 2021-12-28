import {Component} from "../core/component";
import {apiService} from "../../services/service";
import {TransformService} from "../../services/transform.service";
import {renderPost} from "../template/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPost()
        const posts = TransformService.trsfmDataToArray(fbData)
        this.loader.hide()
        const html = posts.map(post => renderPost(post, {withButton: true}))
        this.$el.insertAdjacentHTML('afterbegin', html)
    }
}


function buttonHandler(event) {
    const $el = event.target
    const id = $el.dataset.id

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        if (favorites.includes(id)) {
            favorites = favorites.filter(fid => fid !== id)
            $el.textContent = 'Сохранить'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
        }
        else {
            favorites.push(id)
            $el.textContent = 'Удалить'
            $el.classList.add('button-danger')
            $el.classList.remove('button-primary')
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}