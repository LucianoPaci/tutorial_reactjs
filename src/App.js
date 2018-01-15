import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';


class App extends Component {

  state = {
    persons: [
      { id : 'q1', name : 'Max', age : '29'},
      { id : 'q2', name : 'Peter', age : '21'},
      { id : 'q3', name : 'John', age : '23'}
    ],
    otherState : 'other value',
    showPersons: false
  }

deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); //Slice -> makes a Shallow copy of the array. Without it, you will be working with a pointer to the original array
    const persons = [...this.state.persons] // Spread the elements from the old array into the new. Works like 'Slice'
    persons.splice(personIndex, 1); //Splice -> removes N elements of an array
    this.setState({persons: persons});
};

togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;

  this.setState({showPersons: !doesShow});

}; 

nameChangedHandler = (event, id) => { //Checks if given ID matches with Id from Array. Then assign it to personIndex
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
     });
  
    const person = { // Creates object 'person' as a new one, with the index previously obtained
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value; //Updates name of object with input from user

    const persons = [...this.state.persons]; //Shallow copy of persons
    persons[personIndex] = person; //adds the modified object ot the array
 
    this.setState ({persons : persons}) //Finally, changes the state element
}

////////////////////////////////////////////



render() {

    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '2px solid black',
      padding: '8px',
      cursor : 'pointer',
      color: 'white'
    };

    let persons = null;

    if (this.state.showPersons) { //conditional way to render somehthing. Set a variable with a value and assign something to it whether the condition is true or false
      persons = (
           <div>
             {this.state.persons.map((person, index) => {
               return <Person 
                      click = {() => this.deletePersonHandler(index)} 
                      name = {person.name} 
                      age = {person.age}
                      id = {person.id}
                      changed = {(event) => this.nameChangedHandler(event, person.id)}/>
             })}
            </div>
      );
      style.backgroundColor = 'red';
    }

    let classes = [];

    if (this.state.persons.length <=2) {
      classes.push('red');
    }

    if (this.state.persons.length <=1) {
      classes.push('bold');
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactJS</h1>
          <p className={classes.join(' ')}>Probando el subtitulo</p>
        </header>
        <button 
            style = {style}
            onClick = {this.togglePersonsHandler}>Toggle Persons</button>
            {persons}
      </div>
    );
  }
}

export default App;
// export default App;