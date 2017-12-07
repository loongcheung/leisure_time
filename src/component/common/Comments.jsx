import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: 0,
            sort_by: 0
        }
    }
    toggleHotOrNew (id) {
        this.setState({sort_by:id});
        //选择回调 this.props.toggleHotOrNew
    }
    componentDidMount() {
        axios.get('http://localhost:8000/comments', {
            params: {
                post_id: 15453163, sort_by: 0, _rticket: 1512615016633, page: 1
            }
        }).then((res)=>{
            console.log(res.data)
            this.setState({comments: res.data.comments})
        });
    }

    render() {
        return (
            <div id="comments">
                <div className="header">
                    <div className="comments_num">全部{this.state.comments}条评论</div>
                    <div className="sort_by">
                        <div  onClick={this.toggleHotOrNew.bind(this,0)} className={`hot ${this.state.sort_by === 0 ? 'select' : ''}`}>最热</div>
                        <div onClick={this.toggleHotOrNew.bind(this,1)} className={`new ${this.state.sort_by === 1 ? 'select' : ''}`}>最新</div>
                    </div>
                </div>

                <div className="main">
                    <div className="main_header">
                        <div className="site_info">
                            <img src="https://s1.tuchong.com/sites/112/1121388/logo_small.jpg?2"/>
                            <Link className="site_name" to={'siteInfo'}>最后的乐章</Link>
                        </div>
                        <div className="likes iconfont">&#xe693;<span>{25}</span></div>
                    </div>
                    <div className="main_comment">
                        <div className="main_comment-content">{'1123123123服务费看了看服务可分为1123123123服务费看了看服务可分为'}</div>
                        <div className="main_comment-time">{'2017-11-24'} 回复</div>
                        <div className="sub_comments">
                            <ul>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章：</Link>{'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章：</Link>{'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章：</Link>{'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                            </ul>
                            <div className="more_comments"><Link className="site_name" to={'siteInfo'}>最后的乐章</Link>等人
                                <span>共{5}条回复</span> >
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main">
                    <div className="main_header">
                        <div className="site_info">
                            <img src="https://s1.tuchong.com/sites/112/1121388/logo_small.jpg?2"/>
                            <Link className="site_name" to={'siteInfo'}>最后的乐章</Link>
                        </div>
                        <div className="likes iconfont">&#xe693;<span>{25}</span></div>
                    </div>
                    <div className="main_comment">
                        <div className="main_comment-content">{'1123123123服务费看了看服务可分为1123123123服务费看了看服务可分为'}</div>
                        <div className="main_comment-time">{'2017-11-24'} 回复</div>
                        <div className="sub_comments">
                            <ul>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                            </ul>
                            <div className="more_comments"><Link className="site_name" to={'siteInfo'}>最后的乐章</Link>等人
                                <span>共{5}条回复</span> >
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main">
                    <div className="main_header">
                        <div className="site_info">
                            <img src="https://s1.tuchong.com/sites/112/1121388/logo_small.jpg?2"/>
                            <Link className="site_name" to={'siteInfo'}>最后的乐章</Link>
                        </div>
                        <div className="likes iconfont">&#xe693;<span>{25}</span></div>
                    </div>
                    <div className="main_comment">
                        <div className="main_comment-content">{'1123123123服务费看了看服务可分为1123123123服务费看了看服务可分为'}</div>
                        <div className="main_comment-time">{'2017-11-24'} 回复</div>
                        <div className="sub_comments">
                            <ul>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                            </ul>
                            <div className="more_comments"><Link className="site_name" to={'siteInfo'}>最后的乐章</Link>等人
                                <span>共{5}条回复</span> >
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main">
                    <div className="main_header">
                        <div className="site_info">
                            <img src="https://s1.tuchong.com/sites/112/1121388/logo_small.jpg?2"/>
                            <Link className="site_name" to={'siteInfo'}>最后的乐章</Link>
                        </div>
                        <div className="likes iconfont">&#xe693;<span>{25}</span></div>
                    </div>
                    <div className="main_comment">
                        <div className="main_comment-content">{'1123123123服务费看了看服务可分为1123123123服务费看了看服务可分为'}</div>
                        <div className="main_comment-time">{'2017-11-24'} 回复</div>
                        <div className="sub_comments">
                            <ul>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                                <li><Link className="site_name"
                                          to={'siteInfo'}>最后的乐章:</Link> {'wijwfjwfiwwfiwjefoiwfjowfifwijwfjwfiwwfiwjefoiwfjowfif'}
                                </li>
                            </ul>
                            <div className="more_comments"><Link className="site_name" to={'siteInfo'}>最后的乐章</Link>等人
                                <span>共{5}条回复</span> >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}