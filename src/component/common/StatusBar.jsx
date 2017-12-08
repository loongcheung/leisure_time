/*
 * Component StatusBar 标题栏组件
 * @param title<String>  标题名称
 * */

import React,{Component} from 'react'

export default class StatusBar extends Component {
    constructor(props) {
        super(props)
    }
    back() {
       window.history.back();
    }
    render() {
        return (
            <div id="StatusBar">
                <div className="back iconfont" onClick={this.back}>&#xe608;</div>
                <div className="title">{this.props.title ? this.props.title : ''}</div>
                <div className="moreOption iconfont">&#xe62b;</div>
            </div>
        )
    }
}