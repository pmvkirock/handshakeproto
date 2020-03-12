import React from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import axios from 'axios';

class skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      addSkill: ''
    };
  }

  addSkill = e => {
    this.setState({
      addSkill: e.target.value
    });
  };

  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/skills?stud_id=' + cookie.load('cookie'))
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            skills: response.data
          });
        } else {
          this.setState({
            error:
              '<p style={{color: red}}>Please enter correct credentials</p>',
            authFlag: false
          });
        }
      })
      .catch(e => {
        this.setState({
          error: 'Please enter correct credentials' + e
        });
      });
  };

  render() {
    return (
      <Container className="background top-10 padding-all skills">
        <h5>Skills</h5>
        <p></p>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                value={this.state.skill}
                placeholder="Skills"
                onChange={this.changeSkill}
              />
            </Col>
            <Col>
              <Button variant="primary" onClick={this.addSkill}>
                Add
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default skills;
