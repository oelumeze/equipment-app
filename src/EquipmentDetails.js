import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import EquipmentList from './EquipmentList.js'


class EquipmentDetails extends Component {

    constructor(props) {
        super(props);
        //initialize the state of the Component values
        let detailState = {
            equipmentInfo : {
                category : null,
                Class : null,
                equipmentName : null,
                equipmentValue : null
            }
        }
        this.state = Object.assign({}, this.props._currentState, detailState)
        console.log("this.props", this.state)
            
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        this.setState({ isParam: null})
        
        // this.props.changeType
        
    }

    render() {

        if(this.state.isParam === null) {
            return(
                <div>
                    <EquipmentList state={this.state}/>
                </div>
            )
        }

        return (
            <div>
                <p>Equipment Category : {this.state.equipmentInfo.category}</p>
                <p>Equipment Name : { this.state.equipmentInfo.equipmentName }</p>
                <p>Equipment Class: { this.state.equipmentInfo.Class } </p>
                <p>Equipment Value: { this.state.equipmentInfo.equipmentValue } </p>
                <button  onClick={this.goBack}>RETURN TO LIST</button>
            </div>
        )
    }


   async componentDidMount() {
        console.log("props", this.props)
        try {
            // debugger
            let equipmentDetails = await Axios.get(`http://localhost:8080/equipment/list/${this.props._equipmentID}`)
            // debugger
            console.log("json", equipmentDetails.data)
            // debugger
            this.setState({ equipmentInfo: equipmentDetails.data })
            
        } catch (ex) {
            console.log("error", ex)
        }      
    }
}
export default EquipmentDetails;