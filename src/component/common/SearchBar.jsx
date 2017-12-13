import React, {Component} from "react";
import axios from "axios";
import {HOST} from "../../config/index";
import Swiper from "swiper";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            tags: [],
            showSearchPage: false,
            value: ''
        }
    }

    toggleSearchPage(bool) {
        if (bool) {
            axios.get(HOST + '/searchrec').then((res) => {
                this.setState({
                    authors: res.data.author,
                    tags: res.data.tags.concat(res.data.events)
                });
            });
        }
        this.setState({showSearchPage: bool});
    }

    changeSearchValue(event){
        this.setState({value: event.target.value});
    }

    clearValue() {
        this.setState({value: ''});
    }

    componentDidUpdate() {
        if (this.state.value.length > 0) {
            new Swiper('.search-swiper-container');
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.setState = () => {  //页面卸载时重写setState方法，解决页面卸载时异步setState还在执行的问题
            return false
        };
    }

    render() {
        //搜索页推荐标签信息
        const TAG_LIST = this.state.tags.map((item, index) => {
            if (item.status) {
                return (
                    <div key={index}
                         className="searching-content-init-tags-list-tags searching-content-init-tags-list-event_tags">{item.tag_name}</div>
                )
            } else {
                return (
                    <div key={index} className="searching-content-init-tags-list-tags">{item.tag_name}</div>
                )
            }
        });
        //搜索页推荐作者信息
        const AUTHOR_LIST = this.state.authors.map((item, index) => {
            return (
                <div key={index}>
                    <img src={item.icon.replace('https', 'http')}/>
                    <p>{item.name}</p>
                </div>
            )
        });
        //搜索页未输入内容显示
        const INIT_CONTENT = (
           <div className="searching-content-init">
                <div className="searching-content-init-tags">
                    <p className="searching-content-tip">热门标签</p>
                    <div className="searching-content-init-tags-list">
                        {TAG_LIST}
                    </div>
                </div>
                <div className="searching-content-init-authors">
                    <p className="searching-content-tip">热门摄影师</p>
                    <div className="searching-content-init-authors-list">
                        {AUTHOR_LIST}
                    </div>
                </div>
            </div>
        );
        //搜索页输入内容显示
        const SEARCHING_CONTENT = (
            <div className="searching-content-search">
                <div className="searching-content-search-swiper-title">
                    <div>标签</div>
                    <div>用户</div>
                </div>
                <div className="search-swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">1</div>
                        <div className="swiper-slide">2</div>
                    </div>
                </div>
            </div>
        );
        //搜索页
        const OPEN_SEARCH = (
            <div className={this.state.showSearchPage ? 'searching' : 'searching openedSearching'}>
                <div className="searching-input">
                    <div onClick={this.toggleSearchPage.bind(this,false)} className="searching-input-back iconfont">&#xe608;</div>
                    <input className="iconfont" onChange={this.changeSearchValue.bind(this)} value={this.state.value} type="text" placeholder={'\ue639　搜索感兴趣的标签、活动、摄影师'}/>
                    <div onClick={this.clearValue.bind(this)} className="searching-input-clear">清除</div>
                </div>
                <div className="searching-content">
                {this.state.value.length ? SEARCHING_CONTENT :INIT_CONTENT}
                </div>
            </div>
        );
        return (
            <div id="searchBar">
                <div onClick={this.toggleSearchPage.bind(this,true)} className="input_div iconfont">&#xe639; 搜索你感兴趣的标签、活动、摄影师</div>
                {OPEN_SEARCH}
            </div>
        )
    }
}