import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import EquipmentList from './EquipmentList';

class App extends Component {

  constructor(props) {
    super(props);
    console.log("app props", this.props)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Blue Line Rental - Equipment List        
        </header>
        <EquipmentList/>
      </div>
    );
  }
}

export default App;
