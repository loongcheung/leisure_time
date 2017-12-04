import React, {Component} from "react";
import axios from "axios";
import {PhotoSwipe} from "react-photoswipe";
import {Load} from "../../tools/loadmore";
import LoadComponent from '../common/Load'

export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: [],
            isOpen: false,
            options: {
                shareEl: false,
                fullscreenEl: false
            },
            photoSwipeItems: [],
            post_id: '',//翻页值，为上一页最后一个的
            page: 2,
            refreshY: 0,//刷新下拉距离
            pageY_start: 0,
        };
        this.getTimeDiff = function (publish_time) {
            let nowTime = new Date().getTime();
            let diffTime = (nowTime - publish_time) / (60 * 1000 * 60 * 24);
            let showTime = '';
            if (diffTime < 1) {
                diffTime = (nowTime - publish_time) / (60 * 1000 * 60);
                if (diffTime > 12) {
                    showTime = '半天前'
                } else {
                    if (diffTime < 1) {
                        showTime = '刚刚';
                    } else {
                        showTime = `${Math.floor(diffTime)}小时前`
                    }
                }
            } else {
                showTime = `${Math.floor(diffTime)}天前`
            }
            return showTime
        };
        this.getRecommendList = function (page = 1, type = 'refresh', post_id = '') {
            axios.get('http://192.168.1.3:8000/recommend', {
                params: {
                    page,
                    type,
                    post_id
                }
            }).then((res) => {
                let data = res.data['feedList'];
                if (type === 'refresh') {
                    this.setState({recommendList: []});
                }
                for (let i = 0; i < data.length; i++) {
                    let recommendItem = {};
                    recommendItem.post_id = data[i]['post_id'];
                    recommendItem.publish_at = this.getTimeDiff(new Date(data[i]['published_at']).getTime());
                    recommendItem.favorites = data[i]['favorites'];
                    recommendItem.comments = data[i]['comments'];
                    recommendItem.site = data[i]['site'];
                    recommendItem.images = data[i]['images'];
                    this.state.recommendList.push(recommendItem);
                }
                this.setState({
                    recommendList: this.state.recommendList,
                    post_id: this.state.recommendList[this.state.recommendList.length - 1]['post_id'],
                    refreshY: 0
                });
                localStorage.setItem('shouldRefresh', JSON.stringify(this.state.recommendList));
            })
        };
        this.openIndexPhotoSwiper = function (event) {
            this.setState({photoSwipeItems: this.state.photoSwipeItems === [] ? this.state.photoSwipeItems : this.state.photoSwipeItems.splice(0, this.state.photoSwipeItems.length)});//清空state,使每一次都只包含当前的图片
            for (let i = 0; i < this.state.recommendList[event.target.dataset.index]['images'].length; i++) {
                let photoSwipeItem = {};
                photoSwipeItem.w = this.state.recommendList[event.target.dataset.index]['images'][i].width;
                photoSwipeItem.h = this.state.recommendList[event.target.dataset.index]['images'][i].height;
                photoSwipeItem.src = `https://photo.tuchong.com/${this.state.recommendList[event.target.dataset.index]['images'][i].user_id}/f/${this.state.recommendList[event.target.dataset.index]['images'][i].img_id}.jpg`
                this.state.photoSwipeItems.push(photoSwipeItem);
            }
            this.setState({
                photoSwipeItems: this.state.photoSwipeItems,
                isOpen: true
            })
        };
        this.handleClose = function () {
            this.setState({isOpen: false})
        };
        this.refreshMove = function (event) {
            if (document.documentElement.scrollTop <= 100) {
                let touch = event.touches[0];
                switch (event.type) {
                    case 'touchstart':
                        this.setState({pageY_start: touch.pageY});
                        break;
                    case 'touchmove':
                        this.setState({
                            refreshY: this.state.refreshY + touch.pageY - this.state.pageY_start,
                            pageY_start: touch.pageY
                        });
                        break;
                    case 'touchend':
                        if (this.state.refreshY < 70) {
                            this.setState({refreshY: 0});
                        } else {
                            this.setState({refreshY: 70});
                            this.getRecommendList()
                        }
                        break;
                }
            }
        };
    }

    componentDidMount() {
        if (!localStorage.getItem('shouldRefresh')) {  //创建缓存，如果用户不是主动刷新则不重复请求后台，防止路由切换不停的要请求后台
            this.getRecommendList();
        } else {
            this.setState({recommendList: JSON.parse(localStorage.getItem('shouldRefresh'))});
        }
        let _this = this;
        Load.loadMore(document, function () {  //到达底部加载更多
            _this.getRecommendList(_this.state.page, 'loadmore', _this.state.post_id);
            _this.setState({page: _this.state.page + 1});
        })
    }

    render() {
        let RecommendItems = [];
        if (this.state.recommendList) {
            RecommendItems = this.state.recommendList.map((item, index) => {
                if (item.images) {
                    return (
                        <div className="recommend_item" key={index}>
                            <div className="top">
                                <div className="site">
                                    <img src={item.site.icon} alt="" className="site_icon"/>
                                    <p className="site_name">{item.site.name}</p>
                                    <p className="site_time">{item.publish_at}</p>
                                </div>
                                <div className="iconfont site_gz">&#xe605;关注</div>
                            </div>
                            <div className="img_list">
                                <img data-index={index} onClick={this.openIndexPhotoSwiper.bind(this)}
                                     src={`https://photo.tuchong.com/${item.images[0].user_id}/f/${item.images[0].img_id}.jpg`}
                                     alt=""/>
                            </div>
                            <div className="bottom">
                                <div className="iconfont favrites">&#xe61b;<span>{item.favorites}</span></div>
                                <div className="iconfont comments">&#xe629;<span>{item.comments}</span></div>
                                <div className="iconfont share">&#xe610;</div>
                                <div className="iconfont shareMore">&#xe62b;</div>
                            </div>
                        </div>
                    )
                }
            })
        }
        return (
            <div id="recommend">
                <LoadComponent/>
                <div className="ulList" onTouchStart={this.refreshMove.bind(this)}
                     onTouchMove={this.refreshMove.bind(this)} onTouchEnd={this.refreshMove.bind(this)}
                     style={{transform: `translate3d(0,${this.state.refreshY}px,0)`}}>
                    {RecommendItems}
                </div>
                <PhotoSwipe isOpen={this.state.isOpen} items={this.state.photoSwipeItems} options={this.state.options}
                            onClose={this.handleClose.bind(this)}/>
            </div>
        );
    }
}