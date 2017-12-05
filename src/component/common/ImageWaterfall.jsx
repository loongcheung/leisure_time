import React, {Component} from "react";

export default class ImageWaterfall extends Component {
    constructor(props) {
        super(props);
        //需要图片地址，图片高度、宽度或者高宽比       等高不等宽
        this.state = {
            imgList: [
                {
                    src: 'https://photo.tuchong.com/443122/f/11585728.jpg',
                    width: 800,
                    height: 1200
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585739.jpg',
                    width: 1200,
                    height: 800
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585726.jpg',
                    width: 800,
                    height: 1200
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585744.jpg',
                    width: 1041,
                    height: 1200
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585739.jpg',
                    width: 1200,
                    height: 800
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585726.jpg',
                    width: 800,
                    height: 1200
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585726.jpg',
                    width: 800,
                    height: 1200
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585744.jpg',
                    width: 1041,
                    height: 1200
                },
                {
                    src: 'https://photo.tuchong.com/443122/f/11585739.jpg',
                    width: 1200,
                    height: 800
                }
            ]
        }
    }

    componentDidMount() {
    }

    render() {
        //let {showAll,showNum,maxWidth,maxHeight}  = this.props.options;
        //将图片数组分为两两一组
        let ImgList = [];
        let i =0;
        while (i <= this.state.imgList.length-1) {
            let imgItem = '';
            if (!this.state.imgList[i+1]) { //对于奇数的最后一个图片进行单独处理
                imgItem = (
                    <div style={{fontSize:'0px'}} key={i}>
                        <img  src={this.state.imgList[i].src} style={{maxWidth: `${window.screen.width}px`,maxHeight: `${window.screen.height}px`}}/>
                    </div>
                )
            }else {
                let rate1 = this.state.imgList[i].height / this.state.imgList[i].width,
                    rate2 = this.state.imgList[i + 1].height / this.state.imgList[i + 1].width,
                    totalRate = rate1 + rate2,
                    width1 = rate2 / totalRate * (window.screen.width),
                    width2 = rate1 / totalRate * (window.screen.width),
                    height = width1 * rate1;
                imgItem = (
                    <div style={{fontSize:'0px'}} key={i}>
                        <img  src={this.state.imgList[i].src} width={width1} height={height}/>
                        <img  src={this.state.imgList[i + 1].src} width={width2} height={height}/>
                    </div>
                );
            }
            ImgList.push(imgItem);
            i = i +2;
        }
        return (
            <div>
                {ImgList}
                <div style={{textAlign: 'center',color: '#666'}}>共{this.state.imgList.length}张 点击查看全部</div>
            </div>
        )
    }
}