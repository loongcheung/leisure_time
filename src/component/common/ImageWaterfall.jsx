/*
 * Component ImageWaterfall 移动端瀑布流图片组件（等高不等宽）
 * @param imgList<Array>  图片集合数组，每个元素必须包括src,width,height
 * @param options<Object> 组件选项 showNum<NUmber>:显示数目  showAll<Boolean>:显示全部  maxWidth<Number>:图片显示的最大宽度  maxHeight<Number>:图片显示的最大高度
 * @param clickLoadMore<Function>  查看更多回调(与showNum、showAll配合使用)
 * @param openPhotoSwiper<Function>  查看图片回调(与react-photoswipe配合使用)
 * */

import React, {Component} from "react";
import template from "../template"

class ImageWaterfall extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        let {showAll, showNum, maxWidth, maxHeight} = this.props.options;
        //将图片数组分为两两一组
        let ImgList = [];
        let loadMore = '';
        let i = 0;
        while (i <= this.props.imgList.length - 1) {
            let imgItem = '';
            if (i + 2 > showNum && !showAll) {
                loadMore = (<div onClick={this.props.clickLoadMore} style={{textAlign: 'center', color: '#666'}}>
                    共{this.props.imgList.length}张 点击查看全部</div>);
                break;
            }
            if (!this.props.imgList[i + 1]) { //对于奇数的最后一个图片进行单独处理
                imgItem = (
                    <div style={{fontSize: '0px'}} key={i}>
                        <img onClick={this.props.openPhotoSwiper.bind(this, this.props.imgList, i)}
                             src={this.props.imgList[i].src} style={{
                            maxWidth: `${maxWidth}px`,
                            maxHeight: `${maxHeight}px`
                        }}/>
                    </div>
                )
            } else {
                let rate1 = this.props.imgList[i].height / this.props.imgList[i].width,
                    rate2 = this.props.imgList[i + 1].height / this.props.imgList[i + 1].width,
                    totalRate = rate1 + rate2,
                    width1 = rate2 / totalRate * (maxWidth-1),
                    width2 = rate1 / totalRate * (maxWidth-1),
                    height = width1 * rate1;
                imgItem = (
                    <div style={{fontSize: '0px'}} key={i}>
                        <img style={{marginBottom: '1px'}} data-index={i} onClick={this.props.openPhotoSwiper.bind(this, this.props.imgList, i)}
                             src={this.props.imgList[i].src}
                             width={width1} height={height}/>
                        <img style={{float: 'right'}} data-index={i + 1}
                             onClick={this.props.openPhotoSwiper.bind(this, this.props.imgList, i + 1)}
                             src={this.props.imgList[i + 1].src}
                             width={width2} height={height}/>
                    </div>
                );
            }
            ImgList.push(imgItem);
            i = i + 2;
        }
        return (
            <div>
                {ImgList}
                {loadMore}
            </div>
        )
    }
}

export default template({
    id: 'imageWaterfall',
    component: ImageWaterfall
});