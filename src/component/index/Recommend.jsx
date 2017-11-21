import React, {Component} from "react";
import axios from "axios";

export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: [
                {
                    published_at: "2017-10-30 21:34:31",
                    site: {
                        "name": "\u5c0f\u9e7f\u7eaf\u5b50Lilian",
                        "description": "\u5317\u4eac\u5973\u6444\uff0c\u7ea6\u62cdWX\uff1a3293503603\uff0c\u5fae\u535a\u540c\u540d",
                        "followers": 16603,
                        "url": "https:\/\/tuchong.com\/348471\/",
                        "icon": "https:\/\/s1.tuchong.com\/sites\/348\/348471\/logo_small.jpg?22",
                    },
                    images: [
                        {
                            "img_id": 31310946,
                            "user_id": 1502285,
                            "title": "Optional(",
                            "excerpt": "",
                            "width": 1667,
                            "height": 2500,
                            "description": ""
                        },
                        {
                            "img_id": 31310947,
                            "user_id": 1502285,
                            "title": "Optional(",
                            "excerpt": "",
                            "width": 2500,
                            "height": 2500,
                            "description": ""
                        },
                        {
                            "img_id": 31310944,
                            "user_id": 1502285,
                            "title": "Optional(",
                            "excerpt": "",
                            "width": 1667,
                            "height": 2500,
                            "description": ""
                        }
                    ]
                }
            ]
        }
        this.getRecommendList = function () {
            axios.get('../data/recommend.json').then((res) => {
                console.log(res.data)
            })
        }
    }

    componentWillMount() {
        this.getRecommendList();
    }

    render() {
        return (
            <div id="recommend">
                <div className="recommend_item">
                    <div className="top">
                        <div className="site">
                            <img src={this.state.recommendList[0].site.icon} alt="" className="site_icon"/>
                            <p className="site_name">{this.state.recommendList[0].site.name}</p>
                            <p className="site_time">{this.state.recommendList[0].published_at}</p>
                        </div>
                        <div className="iconfont site_gz">&#xe605;关注</div>
                    </div>
                    <div className="img_list">
                    </div>
                </div>
            </div>
        );
    }
}