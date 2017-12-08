import React, {Component} from "react";

export default class Video extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div id="video">
                <div className="video_item">
                    <div className="top">
                        <div className="site">
                            <img
                                src={'http://img.kaiyanapp.com/f2449da39a584c982866b0636bd30c58.png?imageMogr2/quality/60/format/jpg'}
                                alt="" className="site_icon"/>
                            <p className="site_name">{'开眼运动精选'}</p>
                            <p className="site_description">{'Erkki Punttila 是一位不善言辞的芬兰骑行运动员，今天带我们去一个「离家不太远」的地方探索游玩，带上行囊出发吧！From Kona Bikes'}</p>
                        </div>
                        <div className="site_time">10月7日</div>
                    </div>
                    <div className="videoWrap">
                        <video playsInline="true" poster={'https://photo.tuchong.com/456012/f/32731848.jpg'} controls src="http://baobab.kaiyanapp.com/api/v1/playUrl?vid=19977&editionType=normal&source=qcloud"/>
                    </div>
                    <div className="bottom">
                        <div className="iconfont watch_num">&#xe601;<span>213</span></div>
                        <div className="iconfont share">&#xe610;</div>
                        <div className="iconfont favrites">&#xe61b;<span>12</span></div>
                    </div>
                </div>
                <div className="video_item">
                    <div className="top">
                        <div className="site">
                            <img
                                src={'http://baobab.kaiyanapp.com/api/v1/playUrl?vid=19977&editionType=normal&source=ucloud'}
                                alt="" className="site_icon"/>
                            <p className="site_name">{'开眼运动精选'}</p>
                            <p className="site_description">{'为广告人的精彩创意点赞'}</p>
                        </div>
                        <div className="site_time">10月7日</div>
                    </div>
                    <div className="videoWrap">
                        <video src=""/>
                    </div>
                    <div className="bottom">
                        <div className="iconfont watch_num">&#xe601;<span>213</span></div>
                        <div className="iconfont share">&#xe610;</div>
                        <div className="iconfont favrites">&#xe61b;<span>12</span></div>
                    </div>
                </div>
            </div>
        )
    }
}