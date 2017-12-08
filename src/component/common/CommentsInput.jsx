/*
 * Component CommentsInput 评论输入框组件
 * @param getComment<Function>  获取评论组件内容的回调
 * @param toComment<String> 当前评论是发送给谁
 * */

import React, {Component} from "react";
import template from '../template'

class CommentsInput extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            focus: false,
            commentValue: '',
            cacheValue:'',//缓存用户输入的评论
            canSend: false,
            liked: false
        }
    }

    inputFocused() {
        this.setState({
            focus: true,
            commentValue: this.state.cacheValue
        });
    }

    inputBlured() {
        setTimeout(()=>{
            this.setState({
                cacheValue: this.state.commentValue,  //将用户输入的评论缓存，当再次点击输入时显示
                focus: false,
                commentValue: ''
            });
        },300);
    }

    inputChanged(event) {
        this.setState({commentValue: event.target.value});
        if (event.target.value > 0) {
           this.setState({canSend: true})
        }else {
            this.setState({canSend: false})
        }
    }

    sendComment() {
        if (this.state.canSend) {
            //调评论接口
            this.props.getComment(this.state.commentValue);
        }
    }

    clickLike() {
        if (!this.state.liked) {
            //axios.get() 调用接口
            this.setState({liked: true});
        }else {
            //axios.get() 调用接口
            this.setState({liked: false});
        }
    }

    componentDidMount() {
    }

    render() {
        let commentOptions = '';
        if (!this.state.focus && !this.state.commentValue.length) {
            commentOptions = (
                <div className="options">
                    <div onClick={this.clickLike.bind(this)} className={this.state.liked ? 'likes iconfont liked' : 'likes iconfont'}>{this.state.liked ? '\ue938': '\ue61b'}</div>
                    <div className="share iconfont">&#xe610;</div>
                </div>
            )
        } else {
            commentOptions = (
                <div onClick={this.sendComment.bind(this)} className={this.state.canSend ? 'send canSend' : 'send'}>发送</div>
            )
        }
        return (
            <div id="commentsInput">
                <div className="input"><input value={this.state.commentValue} onInput={this.inputChanged.bind(this)} onBlur={this.inputBlured.bind(this)}
                                              onFocus={this.inputFocused.bind(this)} type="text" placeholder={this.state.focus ? '发评论...' : '写评论...'}/>
                </div>
                {commentOptions}
            </div>
        )
    }
}

export default template({
    id: 'commentsInput',
    component: CommentsInput
});