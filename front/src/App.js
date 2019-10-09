import React from 'react';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toys: {},
      nameInput: '',
      toyInput: '',
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/toys')
      .then(res => res.json())
      .then(data => this.setState({ toys: data }));
  }

  handleDelete = (e, _id) => {
    e.preventDefault();
    fetch(`http://localhost:4000/toys/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    }).then(res => res.json())
      .then(data => this.setState({ toys: data }));
  }

  handleAdd = (e) => {
    e.preventDefault();
    console.log(this.state);
    fetch('http://localhost:4000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.nameInput, toy: this.state.toyInput }),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        this.setState({ toys: data })
      });
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h1>Favorite Toys</h1>
        <ul>
          {Object.entries(this.state.toys).map(([key, value]) => {
            return (
                <li
                  key={key}
                  
                >
                  <p>{value.name} - {value.toy}</p>

                  <button onClick={(e) => this.handleDelete(e, key)}>
                    Delete
                  </button>            
                </li>
            )
          }
          )}
        </ul>
        <form onSubmit={this.handleAdd}>
          <label>Name 
            <input
              name="nameInput"
              value={this.state.nameInput}
              onChange={this.handleChange}
            />
          </label>
          <label>Favorite Toy
          <input
            name="toyInput"
            value={this.state.toyInput}
            onChange={this.handleChange}
          />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default App;
