import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as action from '../redux/action/Action'

const Main = mySeting => {
    let setting = {
        id: '', //应用唯一id表示
        component: <div></div>, //数据回调给的组件
    };

    for (let key in mySeting) {
        setting[key] = mySeting[key];
    }

    class Index extends Component {
        static defaultProps = {setting};
        constructor(props,context) {
            super(props,context);
            this.state= {}
        }
        render() {
            return <this.props.setting.component {...this.props} state={this.props.state}/>;
        }
    }

    //mapStateToProps and mapDispatchToProps
    return connect(state => { //将顶层组件与模版绑定后return回去，配置路由的时候用的就是和redux绑定的组件，所以其实每个路由匹配的都是同一个组件，只不过这个组件的内容不同
        return {
            ...state
        }
    }, action)(Index); //连接redux
};

export default Main;