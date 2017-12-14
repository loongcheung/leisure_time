import React, {Component} from "react";
import axios from "axios";
import {HOST} from "../../config/index";
import Load from "../common/Load"

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            tags: [],
            showSearchPage: false,
            value: '',
            searchTags: [],
            searchSites: [],
            showTags: true,
            mySwiper: '',
            showLoad: false
        }
    }

    toggleSearchPage(bool) {  //切换搜索页面
        this.props.openSearch(!bool);
        if (bool) {
            axios.get(HOST + '/searchrec').then((res) => {
                this.setState({
                    authors: res.data.author,
                    tags: res.data.tags.concat(res.data.events)
                });
            });
        } else {
            this.clearValue();
        }
        this.setState({showSearchPage: bool});
    }

    search(value, type) {
        this.setState({showLoad: true});
        axios.get(HOST + '/search', {
            params: {
                _rticket: new Date().getTime(),
                page: 1,
                type: type,
                content: value,
                count: 20
            }
        }).then((res) => {
            this.setState({showLoad:false});
            if (type === 'tag') {
                this.setState({searchTags: res.data.data});
            } else if (type === 'site') {
                this.setState({searchSites: res.data.data});
            }
        });
    }

    toggleSearchShow(bool) {  //切换搜索内容与标签
        this.setState({showTags: bool});
    }

    changeSearchValue(event) {
        this.setState({value: event.target.value});
        this.search(event.target.value, 'tag');
        this.search(event.target.value, 'site');
    }

    clearValue() {
        this.setState({value: ''});
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

        //搜索页输入标签内容列表
        let SEARCH_TAGS_LIST = [];
        if (this.state.searchTags.length) {
            SEARCH_TAGS_LIST = this.state.searchTags.map((item, index) => {
                if (item.type === 'event') {
                    return (
                        <div className="tag_list" key={index}>
                            <div className="event iconfont">&#xe609; {item.tag_name}</div>
                            <div>已有{item.posts}作品</div>
                        </div>
                    )
                } else {
                    return (
                        <div className="tag_list" key={index}>
                            <div>{item.tag_name}</div>
                            <div>已有{item.posts}作品</div>
                        </div>
                    )
                }

            });
        }

        //搜索页输入标签内容
        const SEARCHING_CONTENT_TAGS = (
            <div className="content_tags">
                <div style={{display: this.state.searchTags.length ? 'none' : 'block'}} className="search_null">
                    <img src={require('../../static/search_no.png')}/>
                    <p>宇宙中搜寻不到</p>
                </div>
                {SEARCH_TAGS_LIST}
            </div>
        );

        //搜索页输入用户列表
        let SEARCH_USERS_LIST = [];
        if (this.state.searchSites.length) {
            SEARCH_USERS_LIST = this.state.searchSites.map((item, index) => {
                return (
                    <div key={index} className="user_list">
                        <img src={item.icon.replace('https', 'http')}/>
                        <div className="search_site">
                            <div>{item.name}</div>
                            <div>{item.description}</div>
                        </div>
                    </div>
                )
            })
        }

        //搜索页输入用户内容
        const SEARCHING_CONTENT_USERS = (
            <div className="content_users">
                <div style={{display: this.state.searchSites.length ? 'none' : 'block'}} className="search_null">
                    <img src={require('../../static/search_no.png')}/>
                    <p>宇宙中搜寻不到</p>
                </div>
                {SEARCH_USERS_LIST}
            </div>
        );

        //搜索页输入内容显示
        const SEARCHING_CONTENT = (
            <div className="searching-content-search">
                <div className="searching-content-search-swiper-title">
                    <div onClick={this.toggleSearchShow.bind(this, true)}
                         className={this.state.showTags ? 'active' : ''}>标签
                    </div>
                    <div onClick={this.toggleSearchShow.bind(this, false)}
                         className={this.state.showTags ? '' : 'active'}>用户
                    </div>
                </div>
                <div className="search_container">
                    <div style={{display: this.state.showLoad ? 'flex' : 'none'}} className="search_loading">
                        <Load/>
                    </div>
                    <div>
                        {this.state.showTags ? SEARCHING_CONTENT_TAGS : SEARCHING_CONTENT_USERS}
                    </div>
                </div>
            </div>
        );

        //搜索页
        const OPEN_SEARCH = (
            <div className={this.state.showSearchPage ? 'searching' : 'searching openedSearching'}>
                <div className="searching-input">
                    <div onClick={this.toggleSearchPage.bind(this, false)}
                         className="searching-input-back iconfont">&#xe608;</div>
                    <input className="iconfont" onChange={this.changeSearchValue.bind(this)} value={this.state.value}
                           type="text" placeholder={'\ue639　搜索感兴趣的标签、活动、摄影师'}/>
                    <div onClick={this.clearValue.bind(this)} className="searching-input-clear">清除</div>
                </div>
                <div className="searching-content">
                    {this.state.value.length ? SEARCHING_CONTENT : INIT_CONTENT}
                </div>
            </div>
        );
        return (
            <div id="searchBar">
                <div onClick={this.toggleSearchPage.bind(this, true)} className="input_div iconfont">&#xe639;
                    搜索你感兴趣的标签、活动、摄影师
                </div>
                {OPEN_SEARCH}
            </div>
        )
    }
}