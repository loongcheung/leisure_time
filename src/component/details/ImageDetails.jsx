import React, {Component} from "react";
import StatusBar from "../common/StatusBar";
import ImageWaterfall from "../common/ImageWaterfall";
import Comments from "../common/Comments";
import CommentsInput from "../common/CommentsInput"
import {PhotoSwipe} from "react-photoswipe";
import template from "../template"

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

    componentDidMount() {

    }

    render() {
        const {site,images,publish_at} = this.props.imageData;
        return (
            <div id="imageDetail">
                <StatusBar title={this.state.title}/>
                <div style={{marginTop: '1rem'}}>
                    <div className="site_info">
                        <div className="site">
                            <img src={site.icon} alt="" className="site_icon"/>
                            <p className="site_name">{site.name}</p>
                            <p className="site_time">{publish_at}</p>
                        </div>
                    </div>
                    <ImageWaterfall options={this.state.ImageWaterfallOptions} imgList={images} openPhotoSwiper={this.openIndexPhotoSwiper.bind(this)}/>
                    <Comments/>
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