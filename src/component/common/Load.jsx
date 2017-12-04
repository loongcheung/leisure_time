import React,{Component} from 'react'

export default class Load extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="spinner">
                <div className="bounce1"/>
                <div className="bounce2"/>
                <div className="bounce3"/>
            </div>
        )
    }
}