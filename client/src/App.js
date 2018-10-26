import React, { Fragment, Component } from 'react';
import './App.css';
import {Row, Col, Input, Button, Icon} from 'react-materialize';
import API from "./utils/API";

class App extends Component {
  state =
  {
    location1: "",
    location2: "",
    location3: "",
    location4: "",
    locationsArray: [],
    center: ""
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

    this.setState({locationsArray: []});

    locations.push(this.state.location1, this.state.location2, this.state.location3, this.state.location4);

    this.getLatLong(locations);

    // Need to figure out replacement for setTimeout using promises

    setTimeout(() => 
    {
      console.log(this.state.locationsArray);
      this.getCenter(this.state.locationsArray);
    }, 750);
    
    // for(let i = 0; i < locations.length; i++)
    // {
    //   if(locations[i] !== "")
    //   {
    //     this.getLatLong(locations[i]);
    //   }
    // }
  };

  getLatLong = locations =>
  {
    for(let i =0; i < locations.length; i++)
    {
      if(locations[i] !== "")
      {
        API.search(locations[i])
        .then(res =>
          {
            const googleMapsResults = res.data.results[0];
            const lat = googleMapsResults.geometry.location.lat;
            const long = googleMapsResults.geometry.location.lng;

            let coords = [lat, long];

            this.setState(prevState => ({locationsArray: [...prevState.locationsArray, coords]}));

            console.log("Locations Array: ", this.state.locationsArray);
          })
          .catch(err => console.log(err));
      }
    }
  }

  // getLatLong = location =>
  // {
  //   API.search(location)
  //     .then(res => 
  //       {
  //         const googleMapsResults = res.data.results[0];
  //         const lat = googleMapsResults.geometry.location.lat;
  //         const long = googleMapsResults.geometry.location.lng;

  //         let coords = [lat, long];

  //         this.setState(prevState => ({locationsArray: [...prevState.locationsArray, coords]}));

  //         console.log("Locations Array: ", this.state.locationsArray);
  //       })
  //     .catch(err => console.log(err));
  // }

  getCenter = coordinates =>
  {
    if (!(coordinates.length > 0))
    {
      return false;
    } 

    var num_coords = coordinates.length;

    let X = 0.0;
    let Y = 0.0;
    let Z = 0.0;

    for(let i = 0; i < coordinates.length; i++)
    {
      let lat = coordinates[i][0] * Math.PI / 180;
      let lon = coordinates[i][1] * Math.PI / 180;

      let a = Math.cos(lat) * Math.cos(lon);
      let b = Math.cos(lat) * Math.sin(lon);
      let c = Math.sin(lat);

      X += a;
      Y += b;
      Z += c;
    }

    X /= num_coords;
    Y /= num_coords;
    Z /= num_coords;

    let lon = Math.atan2(Y, X);
    let hyp = Math.sqrt(X * X + Y * Y);
    let lat = Math.atan2(Z, hyp);

    let newX = (lat * 180 / Math.PI);
    let newY = (lon * 180 / Math.PI);

    console.log("Center Point: " + newX + ", " + newY);

    // return new Array(newX, newY);
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
