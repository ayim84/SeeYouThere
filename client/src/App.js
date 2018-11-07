import React, { Fragment, Component } from 'react';
import './App.css';
import {Row, Col, Input, Button, Icon} from 'react-materialize';
import API from "./utils/API";
import Nav from "./components/Nav/Nav.js";

class App extends Component {
  state =
  {
    location1: "",
    location2: "",
    location3: "",
    location4: "",
    locationsArray: [],
    centerLat: "",
    centerLong: "",
    category: ""
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
  };


 getLatLong = locations =>
  {
    const completeLocations = [];

    for(let i = 0; i < locations.length; i++)
    {
      if(locations[i] !== "")
      {
        completeLocations.push(locations[i]);
      }
    }

    Promise.all(completeLocations.map((location) =>
    {
      return new Promise((resolve, reject) =>
      {
        if(location !== "")
        {
          API.googleLocation(location)
          .then(res =>
            {
              resolve(res);
            })
          .catch(err => console.log(err));
        }
      });
    }))
    .then(res =>
      {
        for(let i = 0; i < res.length; i++)
        {
          const googleMapsResults = res[i].data.results[0];
          const lat = googleMapsResults.geometry.location.lat;
          const long = googleMapsResults.geometry.location.lng;

          let coords = [lat, long];
          this.setState(prevState => ({locationsArray: [...prevState.locationsArray, coords]}));
        }

        this.getCenter(this.state.locationsArray);
        
        API.yelp(this.state.centerLat, this.state.centerLong)
        .then(res => console.log("yelp res: ", res));

      });
  }

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

    this.setState({centerLat: newX, centerLong: newY});

    console.log("Center Point: " + this.state.centerLat + ", " + this.state.centerLong);

    // return new Array(newX, newY);
  }

  
  render() {
    return (
      <Fragment>
        <Nav />
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
            <Input 
              type='select' 
              label="Category"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              <option value='Restaurants'>Restaurants</option>
              <option value='Bars'>Bars</option>
            </Input>
          </Col>
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
