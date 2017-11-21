import React, {Component} from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusBarList: [
                {
                    icon: '\ue6ba',
                    icon_selected: '\ue602',
                    text: '首页',
                    selected: true
                },
                {
                    icon: '\ue619',
                    icon_selected: '\ue601',
                    text: '发现',
                    selected: false
                },
                {
                    icon: '\ue605',
                    text: '发布',
                    selected: false
                },
                {
                    icon: '\ue6ad',
                    icon_selected: '\ue71c',
                    text: '动态',
                    selected: false
                },
                {
                    icon: '\ue644',
                    icon_selected: '\ue603',
                    text: '我的',
                    selected: false
                }
            ]
        };
        this.selectIndexBar = function (index) {
            if (index === 2) {
                return
            }
            this.state.statusBarList.forEach((item,inx)=>{
                if (inx === index) {
                    item.selected = true
                }else {
                    item.selected = false
                }
            });
            this.setState({statusBarList:this.state.statusBarList});
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state !== nextState
    }

    componentDidMount() {

    }

    render() {
        const liList = this.state.statusBarList.map((item, index) => {
                return <li key={index} onClick={this.selectIndexBar.bind(this, index)}><p
                    className="iconfont">{ item.selected ? item.icon_selected : item.icon }</p>
                    <span>{item.text}</span>
                </li>
            }
        )
        return (
            <div id="index">
                <div className="routerView">
                    {this.props.children}
                </div>
                <div className="statusBar">
                    <ul>
                        {liList}
                    </ul>
                </div>
            </div>
        )
    }
}