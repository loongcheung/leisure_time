import React, {Component} from "react";
import template from "../template"

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusBarList: [
                {
                    icon: '\ue6ba',
                    icon_selected: '\ue602',
                    text: '首页',
                    selected: true,
                    link: '/index/recommend'
                },
                {
                    icon: '\ue623',
                    icon_selected: '\ue8c0',
                    text: '发现',
                    selected: false,
                    link: '/find'
                },
                {
                    icon: '\ue62f',
                    icon_selected: '\ue71c',
                    text: '动态',
                    selected: false,
                    link: '/find'
                },
                {
                    icon: '\ue644',
                    icon_selected: '\ue603',
                    text: '我的',
                    selected: false,
                    link: '/find'
                }
            ]
        };
        this.selectIndexBar = function (index) {
            if (index === 0 && this.state.statusBarList[0].selected) {  //点击首页刷新
                this.props.refresh(true);
                if ( document.documentElement.scrollTop === 0) {
                    document.body.scrollTop = 0;
                }else {
                    document.documentElement.scrollTop = 0;
                }
            }
            this.state.statusBarList.forEach((item, inx) => {
                if (inx === index) {
                    item.selected = true
                } else {
                    item.selected = false
                }
            });
            this.setState({statusBarList: this.state.statusBarList});
            this.props.history.push(`/page${this.state.statusBarList[index]['link']}`)
        };
    }

    componentDidMount() {

    }

    render() {
        const liList = this.state.statusBarList.map((item, index) => {

                return <div className="statusBarLi" key={index} onClick={this.selectIndexBar.bind(this, index)}><p
                    className="iconfont">{item.selected ? item.icon_selected : item.icon}</p>
                    <span>{item.text}</span>
                </div>
            }
        )
        return (
            <div id="index">
                <div className="statusBar">
                    <div className="statusBarUl">
                        {liList}
                    </div>
                </div>
                <div className="upload">
                    <p
                        className="iconfont">&#xe605;</p>
                    <span>发布</span>
                    <input type="file" accept="image/*"/>
                </div>
            </div>
        )
    }
}

export default template({
    id: 'statusBar',
    component: Status
})