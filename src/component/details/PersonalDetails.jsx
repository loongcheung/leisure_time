import React,{Component} from "react";
import template from "../template"

class PersonalDetails extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div id="personalDetails">

            </div>
        )
    }
}

export default template({
    id: 'personalDetails',
    component: PersonalDetails
});