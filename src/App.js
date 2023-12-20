import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
class App extends Component{

constructor(props){
  super(props);
  this.state = {
    notes: []
  }
}

API_URL = "http://localhost:5038/";

componentDidMount(){
  this.refreshNotes();
  document.title = 'Todo App'; // Set the title to "Todo App"
}

async refreshNotes(){
  fetch(this.API_URL + "api/todoapp/GetNotes").then(response=>response.json())
  .then(data=>{
    this.setState({notes:data});
  })
}

async addClick(){
  var newNotes = document.getElementById("newNotes").value;
  const data = new FormData();
  data.append("newNotes", newNotes);
  fetch(this.API_URL + "api/todoapp/AddNotes",{
    method: "POST",
    body: data
  }).then(res=>res.json())
  .then(()=>{
    this.refreshNotes();

  })
}


async deleteClick(id){
  fetch(this.API_URL + "api/todoapp/DeleteNotes?id=" + id,{
    method: "DELETE",
  }).then(res=>res.json())
  .then(()=>{
    this.refreshNotes();
    
  })
}

  render() {
    const{notes} = this.state;
    return (
      <div className="App">
        <h1>Todo list</h1>
        <div className="input-container">
          <input id="newNotes" />
          <button onClick={() => this.addClick()}>Add Notes</button>
        </div>
        {notes.map((note) => (
          <div key={note.id} className="note-container">
            <p>
              <b>* {note.description}</b>&nbsp;
              <button className="delete" onClick={() => this.deleteClick(note.id)}>
                Delete Notes
              </button>
            </p>
          </div>
        ))}
      </div>
    );
  }
  
}

export default App;
