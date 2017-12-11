import React,{Component} from "react"
import template from "../template"
import Swiper from 'swiper/dist/js/swiper.min'

class Index extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Swiper('.swiper-container',{
            loop: true,
            autoplay: true,
            delay: 1500
        });
    }

    render() {
        return (
            <div id="find_index">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">Slide 1</div>
                        <div className="swiper-slide">Slide 2</div>
                        <div className="swiper-slide">Slide 3</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default template({
    id: 'find_index',
    component: Index
})