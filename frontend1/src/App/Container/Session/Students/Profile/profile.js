import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import Education from './education_prof';
import Experience from './job_prof';
import Primary from './primary';
import Skills from './skills';

class Stud_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      hideProfileForm: 'HideForm',
      hideObj: 'HideForm',
      phone_num: '',
      email: '',
      career_obj: '',
      tphone_num: '',
      temail: '',
      tcareer_obj: ''
    };
  }

  career_objChange = e => {
    this.setState({ tcareer_obj: e.target.value });
  };

  phoneChange = e => {
    this.setState({ tphone_num: e.target.value });
  };

  emailChange = e => {
    this.setState({ temail: e.target.value });
  };

  editobj = () => {
    if (this.state.hideObj == 'ShowForm') {
      this.setState({
        hideObj: 'HideForm'
      });
    } else {
      this.setState({
        hideObj: 'ShowForm'
      });
    }
  };

  updatePers = e => {
    e.preventDefault();
    const data = {
      phone_num: this.state.tphone_num,
      email_ID: this.state.temail,
      career_obj: this.state.tcareer_obj,
      id: cookie.load('cookie')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        'http://ec2-3-135-239-183.us-east-2.compute.amazonaws.com:8000/updateContact',
        data
      )
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          if (this.state.tcareer_obj != this.state.career_obj) this.editobj();
          else this.editinfo();
          this.getInfo();
          this.setState({
            error: '',
            authFlag: true
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

  editinfo = () => {
    if (this.state.hideForm == 'ShowForm') {
      this.setState({
        hideForm: 'HideForm'
      });
    } else {
      this.setState({
        hideForm: 'ShowForm'
      });
    }
  };

  editpersonalinfo = () => {
    if (this.state.hideProfileForm == 'ShowForm') {
      this.setState({
        hideProfileForm: 'HideForm'
      });
    } else {
      this.setState({
        hideProfileForm: 'ShowForm'
      });
    }
  };

  getInfo = () => {
    const data = {
      stud_id: cookie.load('cookie')
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        'http://ec2-3-135-239-183.us-east-2.compute.amazonaws.com:8000/stud_profile',
        data
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            phone_num: response.data[0].phone_num,
            email: response.data[0].email_ID,
            career_obj: response.data[0].Career_obj,
            tphone_num: response.data[0].phone_num,
            temail: response.data[0].email_ID,
            tcareer_obj: response.data[0].Career_obj
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

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return (
      <Container style={{ width: 80 + '%' }}>
        <Row>
          <Col xl={4}>
            <Row
              className="all-row"
              style={{ textAlign: 'center', marginTop: 10 + 'px' }}
            >
              <Primary />
            </Row>
            <Row className="all-row">
              <Skills />
            </Row>
            <Row className="all-row">
              <Container className="background top-10 padding-all skills">
                <h5>Contact Info</h5>
                <p>
                  Mobile No: <span>{this.state.phone_num}</span>
                </p>
                <p>
                  Email: <span>{this.state.email}</span>
                </p>
                <div className="school-button">
                  <Button onClick={this.editinfo}>Edit Contact Info</Button>
                </div>
                <div
                  className={this.state.hideForm}
                  style={{ marginTop: 10 + 'px' }}
                >
                  <Form>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone No"
                        value={this.state.tphone_num}
                        onChange={this.phoneChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        value={this.state.temail}
                        onChange={this.emailChange}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={this.updatePers}>
                      Update
                    </Button>
                  </Form>
                </div>
              </Container>
            </Row>
          </Col>
          <Col
            xl={8}
            className="height-200 left-10"
            style={{ marginTop: 10 + 'px', width: 95 + '%' }}
          >
            <Row>
              <Container className="background padding-all">
                <h5>My Journey</h5>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <p>{this.state.career_obj}</p>
                    <Button
                      variant="primary"
                      onClick={this.editobj}
                      style={{ marginTop: 10 + 'px' }}
                    >
                      Update Journey
                    </Button>
                    <div className={this.state.hideObj + ' top-10'}>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={this.state.tcareer_obj}
                        onChange={this.career_objChange}
                      />
                      <Button
                        variant="primary"
                        onClick={this.updatePers}
                        style={{ marginTop: 10 + 'px' }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </Container>
            </Row>
            <Row>
              <Education />
            </Row>
            <Row>
              <Experience />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Stud_Profile;
