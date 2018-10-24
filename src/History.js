import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

import './History.css';
import $ from 'jquery';


class History extends Component {


  constructor(){
    super();
    this.state={
      history:[],
      
    }

    this.getHistory =this.getHistory.bind(this);


  }


 componentDidMount() {
    this.getHistory()
  }
  

  getHistory = () =>{
    const that=this;
    $.ajax({
      type : 'GET',
      url : '/api/pairingSystem/history',
      success: function (res) {
        console.log(res)
        that.setState({history:res })
    }
    })

  }



  
   


  render() {
   if(this.state.history.length === 0){
        
     return (
      <div className="History">
        <header className="History-header">

        <h2> NO PAIRS CREATED YET</h2>

        <br></br><br></br><br></br>

       <Link to= "/"><button className="button" type="button">BACK</button></Link>
        </header>
      </div>
    )
   }else{
    return (
      <div className="History">
        <header className="History-header">

        {this.state.history.map((obj) =>
          <div>
         <table className="table"> 
          <tr>
            <th>Student1</th>
            <th>Studen2</th> 
          </tr>

          {obj.pairs.map((obj1) => <tr> <th>{obj1.student1}  </th> <th> {obj1.student2}  </th> </tr>)}
          </table> <br></br><br></br><br></br></div>
          )}
          <br></br><br></br><br></br>

       <Link to= "/"><button className="button" type="button">BACK</button></Link>
        </header>
      </div>
    )

   }
    
 
   }
}

export default History;


