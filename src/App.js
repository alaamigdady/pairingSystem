import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

class App extends Component {
constructor(props) {
    super()

    

    }


  

  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <Link to="/add"><button className="button" type="button">ADD STUDENT</button></Link>
          <Link to= "/pairs"><button className="button" type="button">PAIRING</button></Link>
          <Link to= "/history"><button className="button" type="button">HISTORY</button></Link>

        </header>
      </div>
    
    );
  }
}

export default App;
