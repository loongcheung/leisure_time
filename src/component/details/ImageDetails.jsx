import React, {Component} from "react";
import StatusBar from "../common/StatusBar";
import ImageWaterfall from "../common/ImageWaterfall";
import Comments from "../common/Comments";
import CommentsInput from "../common/CommentsInput"
import {PhotoSwipe} from "react-photoswipe";
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
                shareEl: false,
                fullscreenEl: false
            },
            photoSwipeItems: [],
            ImageWaterfallOptions: {
                showNum: 4,
                showAll: true,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            },
            commentOptions: {
                comments : 0,
                sort_by: 0,
                commentList: []
            }
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

    getComments(sort_id,post_id) {
        axios.get('http://localhost:8000/comments', {
            params: {
                post_id: post_id, sort_by: sort_id, _rticket: new Date().getTime(), page: 1
            }
        }).then((res) => {
            this.state.commentOptions.comments = res.data.comments;
            this.state.commentOptions.commentList = res.data.commentlist;
            this.state.commentOptions.sort_by = sort_id;
            this.setState({commentOptions: this.state.commentOptions});
        });
    }

    toggleCommentsSort(sort_id) {  //切换评论排序
       this.getComments(sort_id,this.props.imageData.post_id)
    }

    componentDidMount() {
       this.getComments(0,this.props.imageData.post_id);
        console.log(this.props.imageData)
    }

    render() {
        const {site,images,published_at,title,event_tags,tags} = this.props.imageData;
        const pro_info = (
            <div className="pro_info">
                <div className="pro_info-title">{title}</div>
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
                    <ImageWaterfall options={this.state.ImageWaterfallOptions} imgList={images} openPhotoSwiper={this.openIndexPhotoSwiper.bind(this)}/>

                    <Comments commentOptions={this.state.commentOptions} toggleSort={this.toggleCommentsSort.bind(this)}/>
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