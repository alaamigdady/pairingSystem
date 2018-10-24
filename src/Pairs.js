import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

import './Pairs.css';
import $ from 'jquery';


class Pairs extends Component {


  constructor(){
    super();
    this.state={
      pairs:[],
      
    }

    this.createPairs =this.createPairs.bind(this);
    this.savePairs =this.savePairs.bind(this);


  }

  

  createPairs = () =>{
    const that=this;
    $.ajax({
      type : 'GET',
      url : '/api/pairingSystem/pairing',
      success: function (res) {
        if(res === 'there is no students added yet , start adding one'){
          alert(res)
        }else{
          that.setState({pairs:res })

        }
    }
  })


  }

savePairs = () =>{
    const that=this;
    $.ajax({
      type : 'POST',
      url : '/api/pairingSystem/pairing',
      data : {pairs:that.state.pairs},
      success:function(data){
        console.log('success')
      },
      error:function(){
        alert('error')
      }
    })

  }
   


  render() {
   if(this.state.pairs.length === 0){
        
     return (
      <div className="Pairs">
        <header className="Pairs-header">

        <form >
        
        <button className ="button" type="button"  onClick={this.createPairs}> PAIRING </button>
        <button className ="button" type="button"  onClick={this.savePairs}> SAVE </button>

      </form>
      <br></br><br></br><br></br>

       <Link to= "/"><button className="button" type="button">BACK</button></Link>

        </header>
      </div>
    )
   }else{

return (
      <div className="Pairs">
        <header className="Pairs-header">

        <form >
        
        <button className ="button" type="button"  onClick={this.createPairs}> PAIRING </button>
        <button className ="button" type="button"  onClick={this.savePairs} > SAVE </button>

      </form>
      <table className="table">
         <tr>
            <th>Student1</th>
            <th>Studen2</th> 
          </tr>

          {this.state.pairs.map((obj) => <tr> <th>{obj.student1} </th> <th> {obj.student2}  </th> </tr>)}

      </table>

      <br></br><br></br><br></br>

       <Link to= "/"><button className="button" type="button">BACK</button></Link>

        </header>
      </div>
    )
   }
 
    
 
   }
}

export default Pairs;


