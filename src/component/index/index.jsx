import React,{Component} from 'react'

export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                {
                    title: '推荐',
                    selected: true,
                    link: '/recommend'
                },
                {
                    title: '视频',
                    selected: false,
                    link: '/video'
                },
                {
                    title: '关注',
                    selected: false,
                    link: '/follow'
                },
                {
                    title: '热门',
                    selected: false,
                    link: '/hot'
                },
                {
                    title: '最新',
                    selected: false,
                    link: '/recent'
                }
            ],
            nowIndex: 0
        };
        this.selectNav = function(index) {
            this.setState({nowIndex:index})
            this.props.history.push(`/index${this.state.navList[index].link}`)
        }
    }
    render() {
        const liList = this.state.navList.map((item,index)=>{
            return <li className={index === this.state.nowIndex ? 'selected' : ''} onClick={this.selectNav.bind(this,index)} key={index}>{item.title}</li>
        });
        return (
            <div id="homeIndex">
                <div id="nav">
                    <ul>
                        {liList}
                    </ul>
                    <div className="slider" style={{transform: `translate3d(${this.state.nowIndex*1.5+0.6}rem,0,0)`}}/>
                </div>
            </div>

        );
    }
}