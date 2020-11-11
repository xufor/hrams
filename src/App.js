import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import data from './default';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false,
      eid: '',
      psw: '',
      defLat: 28.4752093, 
      defLon: 77.5094986,
      result: '',
    }
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  onLogin = () => {
    const { eid, psw } = this.state;
    if(eid.length > 6) {
      alert('The employee id should be of length 6.')
    }
    else if(psw.length > 10 || psw.length < 5) {
      alert('The password should be of length between 5 and 10.')
    }
    else {
      if(data.login.eid === eid && data.login.psw === psw) {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
      }
      else {
        alert('The entered credentials are wrong! Try again.')
      }
    }
  }

  loginBox = () => {
    return(
      <Form className="w-50">
        <Form.Group controlId="eid">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control type="text" 
            onChange={this.onInputChange} 
            placeholder="Enter Employee ID"
          />
        </Form.Group>
        <Form.Group controlId="psw">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            onChange={this.onInputChange}
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button variant="success" onClick={this.onLogin}>Login</Button>
      </Form>
    );
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
    const { PI } = Math;
    let dLat = (lat2 - lat1) * 
					PI / 180.0; 
		let dLon = (lon2 - lon1) * 
					PI / 180.0; 

		lat1 = (lat1) * PI / 180.0; 
		lat2 = (lat2) * PI / 180.0; 

		let a = Math.pow(Math.sin(dLat / 2), 2) + 
				Math.pow(Math.sin(dLon / 2), 2) * 
				Math.cos(lat1) * Math.cos(lat2); 
		let rad = 6371; 
		let c = 2 * Math.asin(Math.sqrt(a)); 
		return rad * c; 
  }

  onMark = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onMarkContinued);
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  onMarkContinued = (position) => {
    const { latitude, longitude } = position.coords;
    const { defLat, defLon } = this.state;
    console.log(latitude);
    console.log(longitude);
    let dis = this.getDistance(latitude, longitude, defLat, defLon);
    if(dis <= 0.10) {
      this.setState({ result: 'Attendance Marked!'});
    }
    else {
      this.setState({ result: 'You are not inside the campus!'});
    }
    setTimeout(() => { 
      this.setState({ result: '' }); 
    }, 3000);
  }

  mainBox = () => {
    return (
      <React.Fragment>
        <img id="i1" className="mb-5" src="assets/art.png" alt="Attendance"/>
        <Button variant="success" className="mb-3" onClick={this.onMark} >Mark Attendance</Button>
        <div id="t1" >{this.state.result}</div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Container fluid="md" className="p-0 h-100">
        <Row id="s1">
          <Col className="bg-primary d-flex justify-content-center align-items-center">
            <div className="text-center h3 text-white mb-0 align-middle">
              Attendance Management System
            </div>
          </Col>
        </Row>
        <Row id="s2">
          <Col className="bg-light d-flex justify-content-center flex-column align-items-center">
            {this.state.isLoggedIn ? this.mainBox() : this.loginBox()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
