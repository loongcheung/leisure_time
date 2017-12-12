import React, {Component} from "react";
import StatusBar from "../common/StatusBar";
import ImageWaterfall from "../common/ImageWaterfall";
import Comments from "../common/Comments";
import CommentsInput from "../common/CommentsInput";
import {PhotoSwipe} from "react-photoswipe";
import LoadComponent from "../common/Load";
import {Tool} from "../../tools/tools";
import template from "../template";
import axios from "axios";

class ImageDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '详情',
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
            ImageWaterfallOptions: {
                showNum: 4,
                showAll: true,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            },
            sort_by: 0,  //默认按热门排序
            commentIndexPage: 2, //到达底部当前评论页，首次到底加载第二页
            commentOptions: {
                comments: 0,
                sort_by: 0,
                commentList: [],
                isLoadAll: false
            },
            showLoadingComponent: false
        }
    }

    handleClose = function () {
        this.setState({isOpen: false})
    };

    openIndexPhotoSwiper = function (imgList, index) {
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

    getComments(sort_id, post_id, indexPage, toggleSort) {
        axios.get('http://192.168.47.226:8000/comments', {
            params: {
                post_id: post_id, sort_by: sort_id, _rticket: new Date().getTime(), page: indexPage
            }
        }).then((res) => {
            this.state.commentOptions.comments = res.data.comments;
            if (toggleSort) {   //如果有切换排序，则置空
                this.state.commentOptions.commentList = [];
            }
            if (res.data.commentlist.length === 0) {
                //如果已经加载所有评论，则取消到底加载更多,并显示全部加载完成，将当前分页置为初始值2
                this.state.commentOptions.isLoadAll = true;
                this.setState({commentIndexPage: 2});
                document.onscroll = () => {
                };
            }
            this.state.commentOptions.commentList = this.state.commentOptions.commentList.concat(res.data.commentlist);
            this.state.commentOptions.sort_by = sort_id;
            this.setState({
                commentOptions: this.state.commentOptions,
                showLoadingComponent: false
            });
        });
    }

    toggleCommentsSort(sort_id) {  //切换评论排序
        this.state.commentOptions.isLoadAll = false;
        this.setState({
            sort_by: sort_id,
            commentOptions: this.state.commentOptions
        });
        //切换排序重新绑定分页
        this.loadPageComments();
        this.getComments(sort_id, this.props.imageData.post_id, 1, true) //切换评论都只加载第一页
    }

    loadPageComments() {
        Tool.loadMore(document, () => {//到达底部加载更多评论
                this.getComments(this.state.sort_by, this.props.imageData.post_id, this.state.commentIndexPage, false);
                this.setState({
                    showLoadingComponent: true,
                    commentIndexPage: this.state.commentIndexPage + 1
                });
            }
        );
    }

    componentDidMount() {
        this.getComments(this.state.sort_by, this.props.imageData.post_id, 1, false);
        this.loadPageComments();
    }

    componentWillUnmount() {
        document.onscroll = () => {
        }; //页面卸载取消到达底部处理
        this.setState = () => {  //页面卸载时重写setState方法，解决页面卸载时异步setState还在执行的问题
            return false
        };
    }

    render() {
        const {site, images, published_at, title, event_tags, tags, content} = this.props.imageData;

        //图片及标签信息
        const tag_list = tags.map((value, index) => {
            if (event_tags.length > 0 && index < event_tags.length) {
                return (
                    <div key={index} className="pro_info-tag_list-tags pro_info-tag_list-event_tags">{value}</div>
                )
            } else {
                return (
                    <div key={index} className="pro_info-tag_list-tags">{value}</div>
                )
            }
        });
        const pro_info = (
            <div className="pro_info">
                <div className="pro_info-title">{title}</div>
                <div className="pro_info-des">{content}</div>
                <div className="pro_info-tag_list">
                    {tag_list}
                </div>
            </div>
        );

        //打赏
        const likes = (
            <div className="reward">
                <div className="reward_title"><span className="iconfont">&#xe611;</span><span>点赞是美德，打赏是鼓励</span><span
                    className="iconfont">&#xe6ab;</span></div>
                <div className="reward_btn">打赏</div>
                <div className="reward_des">还没有人打赏，快来当第一个打赏的人吧!</div>
            </div>
        );

        return (
            <div id="imageDetail">
                <StatusBar title={this.state.title}/>
                <div style={{marginTop: '1rem'}}>
                    <div className="imageDetail_site_info">
                        <div className="site">
                            <img src={site.icon} className="site_icon"/>
                            <p className="site_name">{site.name}</p>
                            <p className="site_time">{published_at}</p>
                        </div>
                    </div>
                    <ImageWaterfall options={this.state.ImageWaterfallOptions} imgList={images}
                                    openPhotoSwiper={this.openIndexPhotoSwiper.bind(this)}/>
                    {pro_info}
                    {likes}
                    <Comments commentOptions={this.state.commentOptions}
                              toggleSort={this.toggleCommentsSort.bind(this)}/>
                    <div style={{display: this.state.showLoadingComponent ? 'block' : 'none'}} className="moreLoading">
                        <LoadComponent/>
                    </div>
                    <CommentsInput/>
                </div>
                <PhotoSwipe isOpen={this.state.isOpen} items={this.state.photoSwipeItems}
                            options={this.state.photoSwipeOptions}
                            onClose={this.handleClose.bind(this)}/>
            </div>
        )
    }
}


export default template({
    id: 'imageDetail',
    component: ImageDetails
});