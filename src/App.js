import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false
    }
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
          <Col className="bg-light">
            <div className="h5">Something </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
