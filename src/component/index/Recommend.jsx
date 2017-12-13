import React, {Component} from "react";
import axios from "axios";
import {PhotoSwipe} from "react-photoswipe";
import {Tool} from "../../tools/tools";
import LoadComponent from "../common/Load";
import ImageWaterfall from "../common/ImageWaterfall";
import template from "../template";
import {HOST} from "../../config/index"

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: [],
            isOpen: false,
            photoSwipeOptions: {
                index: 0,
                shareEl: true,
                fullscreenEl: false,
                shareButtons: [
                    {id:'download', label:'Download', url:'{{raw_image_url}}', download:true}
                ],
            },
            photoSwipeItems: [],
            post_id: '',//翻页值，为上一页最后一个的
            page: 2,
            ImageWaterfallOptions: {
                showNum: 4,
                showAll: false,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        };
        this.getRecommendList = function (page = 1, type = 'refresh', post_id = '') {
            axios.get(HOST + '/recommend', {
                params: {
                    page,
                    type,
                    post_id
                }
            }).then((res) => {
                let data = res.data['feedList'];
                if (type === 'refresh') {
                    this.setState({
                        recommendList: [],
                        page: 2
                    });
                }
                for (let i = 0; i < data.length; i++) {
                    data[i]['published_at'] = Tool.getTimeDiff(data[i]['published_at']);
                    this.state.recommendList.push(data[i]);
                }
                this.setState({
                    recommendList: this.state.recommendList,
                    post_id: this.state.recommendList[this.state.recommendList.length - 1]['post_id']
                });
                localStorage.setItem('shouldRefresh', encodeURIComponent(JSON.stringify(this.state.recommendList)));
            })
        };
        this.handleClose = function () {
            this.setState({isOpen: false})
        };
    }

    openIndexPhotoSwiper = function (imgList, index) {//imgList:对应图片组  index:当前点击的图片
        this.setState({photoSwipeItems: this.state.photoSwipeItems === [] ? this.state.photoSwipeItems : this.state.photoSwipeItems.splice(0, this.state.photoSwipeItems.length)});//清空state,使每一次都只包含当前的图片
        let photoSwipeItems = imgList.map((item) => {
            return {
                src: item.src,
                w: item.width,
                h: item.height
            }
        });
        this.state.photoSwipeOptions.index = index;
        this.setState({
            photoSwipeOptions: this.state.photoSwipeOptions,
            photoSwipeItems: photoSwipeItems,
            isOpen: true
        });
    };

    clickLoadMoreCallback(item, event) {
        if (event.target === event.currentTarget) {
            this.props.getImageDetailData(item);  //触发action，详情页取store的值
            this.props.history.push(`/detail/image`);
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('shouldRefresh')) {  //创建缓存，如果用户不是主动刷新则不重复请求后台，防止路由切换不停的要请求后台
            this.getRecommendList();
        } else {
            this.setState({recommendList: JSON.parse(decodeURIComponent(localStorage.getItem('shouldRefresh')))});
        }
        let _this = this;
        Tool.loadMore(document, function () {  //到达底部加载更多
            _this.getRecommendList(_this.state.page, 'loadmore', _this.state.post_id);
            _this.setState({page: _this.state.page + 1});
        });
        Tool.refresh(document.querySelector('.ulList'), function () {  //下拉刷新
            _this.getRecommendList();
        });
    }

    componentWillUnmount() {
        if ( document.documentElement.scrollTop === 0) {
            document.body.scrollTop = 0;
        }else {
            document.documentElement.scrollTop = 0;
        }

        document.onscroll = () => {
        }  //页面卸载取消到达底部处理
        this.setState = () => {  //页面卸载时重写setState方法，解决页面卸载时异步setState还在执行的问题
            return false
        };
    }

    render() {
        let RecommendItems = [];
        if (this.state.recommendList) {
            RecommendItems = this.state.recommendList.map((item, index) => {
                item.site.icon = item.site.icon.replace('https','http');
                if (item.images) {
                    item.images.forEach((item) => {
                        item.src = `http://photo.tuchong.com/${item.user_id}/f/${item.img_id}.jpg`
                    });
                    return (
                        <div className="recommend_item" key={index}>
                            <div className="top" onClick={this.clickLoadMoreCallback.bind(this, item)}>
                                <div className="site">
                                    <img src={item.site.icon} alt="" className="site_icon"/>
                                    <p className="site_name">{item.site.name}</p>
                                    <p className="site_time">{item.published_at}</p>
                                </div>
                                <div className="iconfont site_gz">&#xe605;关注</div>
                            </div>
                            <div className="img_list">
                                <ImageWaterfall options={this.state.ImageWaterfallOptions} imgList={item.images}
                                                clickLoadMore={this.clickLoadMoreCallback.bind(this, item)}
                                                openPhotoSwiper={this.openIndexPhotoSwiper.bind(this)}/>
                            </div>
                            <div className="bottom" onClick={this.clickLoadMoreCallback.bind(this, item)}>
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
                <div className="loadComponent">
                    <LoadComponent/>
                </div>
                <div className="ulList">
                    {RecommendItems}
                </div>
                <PhotoSwipe isOpen={this.state.isOpen} items={this.state.photoSwipeItems}
                            options={this.state.photoSwipeOptions}
                            onClose={this.handleClose.bind(this)}/>
            </div>
        );
    }
}

export default template({
    id: 'recommend',
    component: Recommend
});