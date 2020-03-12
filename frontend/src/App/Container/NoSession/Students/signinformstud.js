import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { CompanyType } from '../../../../actions';
import { getMajor } from '../../../../actions';
import { getProfPic } from '../../../../actions';
import { getFName } from '../../../../actions';

class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authFlag: false,
      error: ''
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  submitLogin = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/loginStud', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data[0].prof_pic);
          this.props.dispatch(getProfPic(response.data[0].prof_pic));
          this.props.dispatch(getMajor(response.data[0].major));
          this.props.dispatch(getFName(response.data[0].First_Name));
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

  render() {
    let redirectVar = null;
    console.log(cookie.load('cookie'));
    if (cookie.load('cookie')) redirectVar = <Redirect to="/home" />;
    else redirectVar = <Redirect to="/login" />;
    return (
      <div>
        {redirectVar}
        <div className=" container signin-form-cont">
          <Form className="signup-form">
            <h2>Student Log In</h2>
            <p style={{ color: 'red' }}>{this.state.error}</p>
            <p>
              For companies please click the link{' '}
              <Link
                to="/companylogin"
                onClick={() => this.props.dispatch(CompanyType())}
              >
                here
              </Link>
            </p>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={this.usernameChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={this.passwordChangeHandler}
              />
            </Form.Group>

            <Button variant="primary" onClick={this.submitLogin}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getType: state.getType
  };
};

export default connect(mapStateToProps)(signupform);
