import React, {Component} from "react";
import axios from "axios";

export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: []
        }
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
        }
        this.getRecommendList = function () {
            axios.get('http://localhost:8000/recommend',{
                params: {
                    page: 1,
                    type: 'refresh'
                }
            }).then((res) => {
                let data = res.data['feedList'];
                for (let i = 0; i < data.length; i++) {
                    let recommendItem = {};
                    recommendItem.publish_at = this.getTimeDiff(new Date(data[i]['published_at']).getTime());
                    recommendItem.favorites = data[i]['favorites'];
                    recommendItem.comments = data[i]['comments'];
                    recommendItem.site = data[i]['site'];
                    recommendItem.images = data[i]['images'];
                    this.state.recommendList.push(recommendItem);
                }
                this.setState({recommendList: this.state.recommendList});
            })
        }
    }

    componentDidMount() {
        this.getRecommendList();
    }

    render() {
        let RecommendItems = [];
        if (this.state.recommendList) {
            RecommendItems = this.state.recommendList.map((item, index) => {
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
                           {/* <img src="https://photo.tuchong.com/1673709/f/25389444.jpg"/>*/}
                            <img src={`https://photo.tuchong.com/${item.images[0].user_id}/f/${item.images[0].img_id}.jpg`} alt=""/>
                        </div>
                        <div className="bottom">
                            <div className="iconfont favrites">&#xe61b;<span>{item.favorites}</span></div>
                            <div className="iconfont comments">&#xe629;<span>{item.comments}</span></div>
                            <div className="iconfont share">&#xe610;</div>
                            <div className="iconfont shareMore">&#xe62b;</div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div id="recommend">
                {RecommendItems}
            </div>
        );
    }
}