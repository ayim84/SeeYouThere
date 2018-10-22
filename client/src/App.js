import React, { Fragment, Component } from 'react';
import './App.css';
import {Row, Col, Input, Button, Icon} from 'react-materialize';

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

    let locations = [];
    locations.push(this.state.location1, this.state.location2, this.state.location3, this.state.location4);
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Input 
            s={3} 
            label="Location 1"
            name="location1"
            value={this.state.location1}
            onChange={this.handleInputChange}
          />
          <Input
            s={3}
            label="Location 2"
            name="location2"
            value={this.state.location2}
            onChange={this.handleInputChange}
          />
          <Input
            s={3}
            label="Location 3"
            name="location3"
            value={this.state.location3}
            onChange={this.handleInputChange}
          />
          <Input
            s={3}
            label="Location 4"
            name="location4"
            value={this.state.location4}
            onChange={this.handleInputChange}
          />
        </Row>
        <Row>
          <Col>
            <Button
              waves="light"
              type="submit"
              onClick={this.handleFormSubmit}
            >
              Submit
              <Icon right>
                send
              </Icon>
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default App;
