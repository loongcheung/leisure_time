import React, {Component} from "react";
import template from "../template";
import Swiper from "swiper/dist/js/swiper.min";
import SearchBar from "../common/SearchBar";
import axios from "axios";
import {HOST} from "../../config/index";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            eventList: [],
            showEventList: true
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
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 3000,
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
    
    toggleShowEventList (bool) {  //在打开搜索页面的时候不显示列表，修复在搜索页能滑动的问题
        this.setState({showEventList: bool});
    }

    render() {
        const BANNERS = this.state.banners.map((item, index) => {
            return (
                <div key={index} className="swiper-slide bannerItem"
                     style={{backgroundImage: `url(${item.src.replace('https', 'http')})`}}/>
            )
        });
        const EVENTS = this.state.eventList.map((item, index) => {
            return (
                <div className="event_list-item" key={index}>
                    <div className="event_list-item-img">
                        <img src={item.images[0].replace('https','http')}/>
                        {item.dueDays ? (<div>距截稿{item.dueDays}天</div>) : (<div>距评奖{item.remainingDays}天</div>)}
                    </div>
                    <div className="event_list-item-info">
                        <div className="event_list-item-info-name">{item.tag_name}</div>
                        <div className="event_list-item-info-posts">{item.posts}件作品</div>
                        <div className="event_list-item-info-desc"><span className="iconfont">&#xe632; </span>{item.prize_desc}</div>
                    </div>
                </div>
            )
        });
        return (
            <div id="find_index">
                <SearchBar openSearch={this.toggleShowEventList.bind(this)}/>
                <div className="find_content">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {BANNERS}
                        </div>
                    </div>
                    <div className="find_entry">

                    </div>
                    <div className="event_list">
                        <div className="event_list-title"><span className="iconfont">&#xe60e; </span>热门活动</div>
                        {this.state.showEventList ? EVENTS : ''}
                        <div className="event_list-des">想自己主办活动，请登录图虫网页版活动频道。</div>
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