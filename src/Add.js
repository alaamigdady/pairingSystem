import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

import './Add.css';
import $ from 'jquery';


class Add extends Component {


  constructor(){
    super();
    this.state={
      students:[],
      studentName :'',
      level : 0,
    }
    this.addStudent =this.addStudent.bind(this);
    this.editStudent =this.editStudent.bind(this);
    this.deleteStudent =this.deleteStudent.bind(this);
    this.getStudents =this.getStudents.bind(this);



  }

  componentDidMount() {
    this.getStudents()
    
  }

  getStudents = ()=>{
    const that=this
    $.ajax({
      type: 'GET',
      url: '/api/pairingSystem/student',
      success: function (res) {
        that.setState({students:res })
    }
  })

}


  addStudent = () =>{
    const that=this;
    $.ajax({
      type : 'POST',
      url : '/api/pairingSystem/student',
      data : {studentName:that.state.studentName,level:that.state.level},
      success:function(data){
        that.getStudents()
      },
      error:function(){
        alert('error')
      }
    })

  }

  deleteStudent=(name)=>{
      const that=this;
      $.ajax({
      type:'DELETE',
      url : '/api/pairingSystem/student?studentName='+name,
      success:function(data){
        that.getStudents()
      },
      error:function(){
        alert('error')
      }

    })
  }

   
editStudent=(name)=>{
  var result = prompt("Enter a new level");

      const that=this;
      $.ajax({
      type:'PUT',
      url : '/api/pairingSystem/student?studentName='+name,
      data:{level:result},
      success:function(data){
        that.getStudents()
      },
      error:function(){
        alert('error')
      }

    })
  }

  render() {
   if(this.state.students.length !== 0){
        
     return (
      <div className="Add">
        <header className="Add-header">

        <form >
        <input  className = "input" placeholder = "Full name" studentName={this.state.studentName}
         onChange={event => this.setState({ studentName: event.target.value })}/>
        <input  className = "input" placeholder = "Level (1-5)" level={this.state.level} 
        onChange={event => this.setState({ level: event.target.value })}/>
        <button className ="button1" type="button" onClick={this.addStudent} > ADD </button>
      </form>

      <table >
         <tr>
            <th>Name</th>
            <th>level</th> 
          </tr>

         
          {this.state.students.map((obj) => <tr> <th>{obj.studentName}  </th> <th> {obj.level}  </th>  
          <th><button className ="button1" type="button" onClick={() => {this.editStudent(obj.studentName)}} > EDIT </button></th>
         <th> <button className ="button1" type="button" onClick={() => {this.deleteStudent(obj.studentName)} }> DELETE </button></th></tr>)}
          

        
      
      </table>
            <br></br><br></br><br></br>

       <Link to= "/"><button className="button" type="button">BACK</button></Link>

        </header>
      </div>
    );
   }else{
    return (
      <div className="Add">
        <header className="Add-header">

        <form >
        <input  className = "input" placeholder = "Full name" studentName={this.state.studentName}
         onChange={event => this.setState({ studentName: event.target.value })}/>
        <input  className = "input" placeholder = "Level (1-5)" level={this.state.level} 
        onChange={event => this.setState({ level: event.target.value })}/>
        <button className ="button1" type="button" onClick={this.addStudent} > ADD </button>
      </form>
            <br></br><br></br><br></br>
        <Link to= "/"><button className="button" type="button">BACK</button></Link>

        </header>
      </div>
      )
   }
     
 
    
 
   }
}

export default Add;


