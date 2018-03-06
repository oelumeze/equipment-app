import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import EquipmentDetails from './EquipmentDetails.js'


class EquipmentList extends Component {
    constructor() {
        super();
        this.state = {
            _equipmentID: null,
            equipments: [],
            detailPageIsLoaded: false,
            isParam: null,
           
        }
        // 
        this.child = ({match}) => {
            this.detailPageLoaded = true;
            if (match.params.id) {
                this.setState({ isParam: match.params.id })
                return null
            }

        }

    }



    /**when view state is fully initialized */
    componentDidMount() {

        console.log("componentDidMount")
        Axios.get('http://localhost:8080/equipment/list')
            .then((response) => {
                console.log("equipment", response)
                // this.state.equipments.push(response.data);
                // console.log("this.state", this.state.equipments)
                let allEquipments = response.data.map((_equipment) => {

                    return (
                        <tr key={JSON.stringify(_equipment)}>
                            <td>
                                <Router>
                                    <div>
                                        <Link to={`/equipment/${_equipment.equipmentID}`}>
                                            {_equipment.equipmentID}
                                        </Link>
                                        <Route path="/equipment/:id" component={this.child} />
                                    </div>
                                </Router>
                            </td>
                            <td>{_equipment.equipmentName}</td>
                        </tr>
                    )
                })
                this.setState({ equipments: allEquipments })
                console.log("new state", this.state.equipments)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }



    render() {

        //if there is a matching URL id show information
        if (this.state.isParam != null) {
            return (
                <div>
                    <EquipmentDetails _currentState={this.state}  _equipmentID={this.state.isParam} />
                </div>
            )
        }
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Equipment ID</th>
                        <th>Equipment Name</th>
                    </tr>
                    {this.state.equipments}
                </tbody>
            </table>
        );
    }



}

export default EquipmentList;