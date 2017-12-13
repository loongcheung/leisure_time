import React, {Component} from "react";
import template from "../template";
import Swiper from "swiper/dist/js/swiper.min";
import SearchBar from "../common/SearchBar"
import axios from "axios";
import {HOST} from "../../config/index"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            eventList: []
        }
    }

    getDiscoverData() {
        axios.get(HOST + '/discover').then((res) => {
            this.setState({
                banners: res.data.banners,
                eventList: res.data.eventList
            });

        })
    }

    componentDidUpdate() {
        //要在数据更新后初始化Swiper
        new Swiper('.swiper-container',{
            loop: true,
                autoplay: {
                delay: 1500,
                    disableOnInteraction: false
            }
        });
    }

    componentDidMount() {
        this.getDiscoverData();
    }

    componentWillUnmount() {
        this.setState = () => {  //页面卸载时重写setState方法，解决页面卸载时异步setState还在执行的问题
            return false
        };
    }

    render() {
        const banners = this.state.banners.map((item,index) => {
            return (
                <div key={index} className="swiper-slide bannerItem" style={{backgroundImage: `url(${item.src.replace('https','http')})`}}/>
            )
        });
        return (
            <div id="find_index">
                <SearchBar/>
                <div className="find_content">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {banners}
                        </div>
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