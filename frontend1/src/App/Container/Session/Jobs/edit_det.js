import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      job_title: '',
      location: '',
      des: '',
      job_cat: 'Internship',
      paid: 'PartTime',
      post: '',
      salary: '',
      deadline: ''
    };
  }

  updatePers = e => {
    e.preventDefault();
    const data = {
      job_title: this.state.job_title,
      location: this.state.location,
      deadline: this.state.deadline,
      des: this.state.des,
      job_cat: this.state.job_cat,
      paid: this.state.paid,
      post: this.state.post,
      salary: this.state.salary,
      id: cookie.load('cookie')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        'http://ec2-3-135-239-183.us-east-2.compute.amazonaws.com:8000/insertJob',
        data
      )
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true,
            job_title: '',
            location: '',
            des: '',
            job_cat: 'Internship',
            paid: 'FullTime',
            post: '',
            salary: '',
            deadline: ''
          });
          this.handleClose();
          this.props.getInfo();
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
  job_title = e => {
    this.setState({
      job_title: e.target.value
    });
  };

  location = e => {
    this.setState({
      location: e.target.value
    });
  };

  desc = e => {
    this.setState({
      des: e.target.value
    });
  };

  job_cat = e => {
    this.setState({
      job_cat: e.target.value
    });
  };

  paid = e => {
    this.setState({
      paid: e.target.value
    });
  };

  post = e => {
    this.setState({
      post: e.target.value
    });
  };

  salary = e => {
    this.setState({
      salary: e.target.value
    });
  };

  deadline = e => {
    this.setState({
      deadline: e.target.value
    });
  };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidMount() {
    this.setState({
      setShow: this.props.show
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show
      });
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'scroll' }}>
          <Form classname="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job Title"
                value={this.state.job_title}
                onChange={this.job_title}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={this.state.location}
                onChange={this.location}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Application Deadline"
                value={this.state.deadline}
                onChange={this.deadline}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>PartTime/Full Time</Form.Label>
              <Form.Control as="select" onChange={this.paid}>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formOwnership">
              <Form.Label>Job Category</Form.Label>
              <Form.Control as="select" onChange={this.job_cat}>
                <option value="Internship">Intern</option>
                <option value="OnCampus">OnCampus</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Posting Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Posting Date"
                value={this.state.post}
                onChange={this.post}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Salary"
                value={this.state.salary}
                onChange={this.salary}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.des}
                onChange={this.desc}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.updatePers}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default edit;
