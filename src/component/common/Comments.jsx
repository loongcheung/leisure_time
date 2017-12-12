/*
 * Component comments 评论容器组件
 * @param commentOptions<Object>  获取评论组件内容的回调，comments<Number> 总评论数 sort_by<Number 0|1> 0最热1最新 commentList<Array> 评论数组 isShowAll<Boolean> 是否已经加载全部
 * @param toggleSort<Function> 切换评论排序回调
 * */

import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Tool} from "../../tools/tools";

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props === nextProps || this.state === nextState
    }

    render() {
        let commentList;
        const commentHeader = (   //评论头部
            <div className="header">
                <div className="comments_num">全部{this.props.commentOptions.comments}条评论</div>
                <div className="sort_by">
                    <div onClick={this.props.toggleSort.bind(this, 0)}
                         className={`hot ${this.props.commentOptions.sort_by === 0 ? 'select' : ''}`}>最热
                    </div>
                    <div onClick={this.props.toggleSort.bind(this, 1)}
                         className={`new ${this.props.commentOptions.sort_by === 1 ? 'select' : ''}`}>最新
                    </div>
                </div>
            </div>
        );

        //内容
        if (this.props.commentOptions.commentList.length) {
            commentList = this.props.commentOptions.commentList.map((item, index) => {
                //子评论
                let sub_notes = [];
                if (item.sub_notes.length) {
                    sub_notes = item.sub_notes.map((item, index) => {
                        return (
                            <div className="sub_item" key={index}>
                                <Link className="site_name" to={'siteInfo'}>{item.author.name}：</Link>{item.content}
                            </div>
                        )
                    });
                    if (sub_notes.length > 3) {  //当子评论大于3时显示更多
                        sub_notes.splice(3, sub_notes.length - 3);
                        sub_notes.push(
                            <div className="more_comments"><Link className="site_name"
                                                                 to={'siteInfo'}>{sub_notes[0].author.name}</Link>等人
                                <span>共{sub_notes.length}条回复</span> >
                            </div>
                        )
                    }
                }
                return (
                    <div className="main" key={index}>
                        <div className="main_header">
                            <div className="site_info">
                                <img src={item.author.icon.replace('https','http')}/>
                                <Link className="site_name" to={'siteInfo'}>{item.author.name}</Link>
                            </div>
                            <div className="likes iconfont">&#xe693;<span>{item.likes}</span></div>
                        </div>
                        <div className="main_comment">
                            <div className="main_comment-content">{item.content}</div>
                            <div className="main_comment-time">{Tool.getTimeDiff(item.created_at)} 回复</div>
                            <div className="sub_comments">
                                <div className="sub_notes">
                                    {sub_notes}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        } else {
            commentList = (
                <div className="no_comment">暂无评论</div>
            )
        }

        return (
            <div id="comments">
                {commentHeader}
                {commentList}
                <div
                    style={{display: this.props.commentOptions.isLoadAll && this.props.commentOptions.commentList.length ? 'block' : 'none'}}
                    className="all_comments">
                    已显示全部评论
                </div>
            </div>
        )
    }
}