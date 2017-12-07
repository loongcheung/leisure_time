import React, {Component} from "react";
import ImageWaterfall from "../common/ImageWaterfall";
import Comments from "../common/Comments";
import StatusBar from "../common/StatusBar";
import {PhotoSwipe} from "react-photoswipe";

export default class ImageDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        return (
            <div>
                <StatusBar/>
                <ImageWaterfall options={this.state.ImageWaterfallOptions} imgList={JSON.parse(localStorage.getItem('imgList'))} openPhotoSwiper={this.openIndexPhotoSwiper.bind(this)}/>
                <Comments/>
                <PhotoSwipe isOpen={this.state.isOpen} items={this.state.photoSwipeItems}
                            options={this.state.photoSwipeOptions}
                            onClose={this.handleClose.bind(this)}/>
            </div>
        )
    }
}