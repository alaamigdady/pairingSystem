import React ,  { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


import './index.css';
import App from './App';
import Add from './Add';
import Pairs from './Pairs';
import History from './History';


class Main extends Component {
    

  render() {
      return (
        <Router>
          <HashRouter>
            <div>
            <Route exact path="/"   component={App}/> 
            <Route exact path="/pairs"   component={Pairs}/> 
            <Route exact path="/history"   component={History}/> 
            <Route path="/add"  component={Add}/> 
            </div>
          </HashRouter>
        </Router>
    );
  }
}






ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
