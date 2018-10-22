import React, { Component } from 'react';
import './App.css';
import Input from "./components/Form";

class App extends Component {
  state =
  {
    location1: "",
    location2: "",
    location3: "",
    location4: ""
  };

  handleInputChange = event =>
  {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event =>
  {
    event.preventDefault();

  }

  render() {
    return (
      <form>
        <Input
          type="text"
          placeholder="Location 1"
          name="location1"
          value={this.state.location1}
          onChange={this.handleInputChange}
        />
        <Input
          type="text"
          placeholder="Location 2"
          name="location2"
          value={this.state.location2}
          onChange={this.handleInputChange}
        />
        <Input
          type="text"
          placeholder="Location 3"
          name="location3"
          value={this.state.location3}
          onChange={this.handleInputChange}
        />
        <Input
          type="text"
          placeholder="Location 4"
          name="location4"
          value={this.state.location4}
          onChange={this.handleInputChange}
        />
        <Input
          value="Submit"
          type="submit"
          onClick={this.handleFormSubmit}
        />
      </form>
    );
  }
}

export default App;
