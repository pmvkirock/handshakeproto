import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      editSchoolForm: [],
      error: '',
      data: [],
      coll_name: [],
      degree: [],
      major: [],
      curr_CGPA: [],
      pass_year: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_edu: [],
      ncoll_name: '',
      ndegree: '',
      nmajor: '',
      ncurr_CGPA: '',
      npass_year: '',
      nfromMth: '',
      ntoMth: '',
      nfromYr: '',
      ntoYr: '',
      tcoll_name: '',
      tdegree: '',
      tmajor: '',
      tcurr_CGPA: '',
      tpass_year: '',
      tfromMth: '',
      ttoMth: '',
      tfromYr: '',
      ttoYr: '',
      i: null
    };
  }

  updatePers = e => {
    e.preventDefault();
    this.setState({
      data: [],
      coll_name: [],
      degree: [],
      major: [],
      curr_CGPA: [],
      pass_year: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_edu: []
    });
    const data = {
      coll_name: this.state.tcoll_name,
      degree: this.state.tdegree,
      major: this.state.tmajor,
      curr_CGPA: this.state.tcurr_CGPA,
      pass_year: this.state.tpass_year,
      fromMth: this.state.tfromMth,
      toMth: this.state.ttoMth,
      fromYr: this.state.tfromYr,
      toYr: this.state.ttoYr,
      id: e.target.getAttribute('name')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/updateEduInfo', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true
          });
          this.getInfo();
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

  deleteEdu = e => {
    e.preventDefault();
    const data = {
      id: e.target.getAttribute('name')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/deleteEduInfo', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
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

  insertEdu = e => {
    e.preventDefault();
    this.setState({
      data: [],
      coll_name: [],
      degree: [],
      major: [],
      curr_CGPA: [],
      pass_year: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_edu: []
    });
    const data = {
      coll_name: this.state.ncoll_name,
      degree: this.state.ndegree,
      major: this.state.nmajor,
      curr_CGPA: this.state.ncurr_CGPA,
      pass_year: this.state.npass_year,
      fromMth: this.state.nfromMth,
      toMth: this.state.ntoMth,
      fromYr: this.state.nfromYr,
      toYr: this.state.ntoYr,
      stud_id: cookie.load('cookie')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/insertEduInfo', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true
          });
          this.getInfo();
          this.addSchool();
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

  collChange = e => {
    this.setState({ tcoll_name: e.target.value });
  };

  degreeChange = e => {
    this.setState({ tdegree: e.target.value });
  };

  majorChange = e => {
    this.setState({ tmajor: e.target.value });
  };

  CGPAChange = e => {
    this.setState({ tcurr_CGPA: e.target.value });
  };

  passYearChange = e => {
    this.setState({ tpass_year: e.target.value });
  };

  countryChange = e => {
    this.setState({ tcountry: e.target.value });
  };

  fromMthChange = e => {
    this.setState({ tfromMth: e.target.value });
  };

  toMthChange = e => {
    this.setState({ ttoMth: e.target.value });
  };

  fromYrChange = e => {
    this.setState({ tfromYr: e.target.value });
  };

  toYrChange = e => {
    this.setState({ ttoYr: e.target.value });
  };

  ncollChange = e => {
    this.setState({ ncoll_name: e.target.value });
  };

  ndegreeChange = e => {
    this.setState({ ndegree: e.target.value });
  };

  nmajorChange = e => {
    this.setState({ nmajor: e.target.value });
  };

  nCGPAChange = e => {
    this.setState({ ncurr_CGPA: e.target.value });
  };

  npassYearChange = e => {
    this.setState({ npass_year: e.target.value });
  };

  ncountryChange = e => {
    this.setState({ ncountry: e.target.value });
  };

  nfromMthChange = e => {
    this.setState({ nfromMth: e.target.value });
  };

  ntoMthChange = e => {
    this.setState({ ntoMth: e.target.value });
  };

  nfromYrChange = e => {
    this.setState({ nfromYr: e.target.value });
  };

  ntoYrChange = e => {
    this.setState({ ntoYr: e.target.value });
  };

  getInfo = () => {
    const data = {
      stud_id: cookie.load('cookie')
    };
    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:8000/stud_edu', data)
      .then(response => {
        console.log('EDu Status Code : ' + response.status);
        console.log(response.data);
        if (response.status === 200) {
          response.data.map(
            ({
              coll_name,
              degree,
              major,
              curr_CGPA,
              pass_year,
              fromMth,
              toMth,
              fromYr,
              toYr,
              idstudent_edu
            }) => {
              console.log(idstudent_edu);
              this.setState(prevState => {
                return {
                  editSchoolForm: prevState.editSchoolForm.concat('HideForm'),
                  coll_name: prevState.coll_name.concat(coll_name),
                  degree: prevState.degree.concat(degree),
                  major: prevState.major.concat(major),
                  curr_CGPA: prevState.curr_CGPA.concat(curr_CGPA),
                  pass_year: prevState.pass_year.concat(pass_year),
                  fromMth: prevState.fromMth.concat(fromMth),
                  toMth: prevState.toMth.concat(toMth),
                  fromYr: prevState.fromYr.concat(fromYr),
                  toYr: prevState.toYr.concat(toYr),
                  idstudent_edu: prevState.idstudent_edu.concat(idstudent_edu)
                };
              });
            }
          );
          this.setState({
            data: response.data,
            i: response.data.length
          });
          console.log(this.state.coll_name[0]);
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

  addSchool = () => {
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

  editFormSchool = e => {
    if (this.state.editSchoolForm[e.target.value] == 'ShowForm') {
      var x = this.state.editSchoolForm;
      x[e.target.value] = 'HideForm';
      this.setState({
        i: e.target.value,
        editSchoolForm: x
      });
    } else {
      x = this.state.editSchoolForm;
      x[e.target.value] = 'ShowForm';
      this.setState({
        i: e.target.value,
        editSchoolForm: x,
        tcoll_name: this.state.coll_name[e.target.value],
        tdegree: this.state.degree[e.target.value],
        tmajor: this.state.major[e.target.value],
        tcurr_CGPA: this.state.curr_CGPA[e.target.value],
        tpass_year: this.state.pass_year[e.target.value],
        tfromMth: this.state.fromMth[e.target.value],
        ttoMth: this.state.toMth[e.target.value],
        tfromYr: this.state.fromYr[e.target.value],
        ttoYr: this.state.toYr[e.target.value]
      });
    }
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    var i = -1,
      renderer;

    renderer = this.state.data.map(() => {
      i++;
      return (
        <div key={this.state.idstudent_edu[i]}>
          <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
            <h6>{this.state.coll_name[i]}</h6>
            <p>
              {this.state.degree[i]} - <span>{this.state.major[i]}</span>
            </p>
            <p>
              {this.state.fromMth[i]}/{this.state.fromYr[i]}-
              {this.state.toMth[i]}/{this.state.toYr[i]}
            </p>
            <p>Year of passing: {this.state.pass_year[i]}</p>
            <p>Current CGPA: {this.state.curr_CGPA[i]}</p>
            <div className="button">
              <Button
                id={i + 'edit'}
                onClick={this.editFormSchool}
                value={i}
                name={this.state.idstudent_edu[i]}
              >
                Edit school
              </Button>
            </div>
            <div className={this.state.editSchoolForm[i] + ' edu-form'}>
              <Form>
                <Form.Group controlId="formSchoolName">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter School Name"
                    value={this.state.tcoll_name}
                    onChange={this.collChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formEducationLevel">
                  <Form.Label>Education Level</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Education Level"
                    value={this.state.tdegree}
                    onChange={this.degreeChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formMajor">
                  <Form.Label>Major</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Major"
                    value={this.state.tmajor}
                    onChange={this.majorChange}
                    name={i}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Year of Passing</Form.Label>
                    <Form.Control
                      placeholder="Year of Passing"
                      value={this.state.tpass_year}
                      onChange={this.passYearChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>CGPA</Form.Label>
                    <Form.Control
                      placeholder="CGPA"
                      value={this.state.tcurr_CGPA}
                      onChange={this.CGPAChange}
                      name={i}
                    />
                  </Col>
                </Row>
                <Row className="top-10">
                  <Col>
                    <Form.Label>Start Month</Form.Label>
                    <Form.Control
                      placeholder="Month"
                      value={this.state.tfromMth}
                      onChange={this.fromMthChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      placeholder="Year"
                      value={this.state.tfromYr}
                      onChange={this.fromYrChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>End Month</Form.Label>
                    <Form.Control
                      placeholder="Month"
                      value={this.state.ttoMth}
                      onChange={this.toMthChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>End Year</Form.Label>
                    <Form.Control
                      placeholder="Year"
                      value={this.state.ttoYr}
                      onChange={this.toYrChange}
                      name={i}
                    />
                  </Col>
                </Row>
                <Button
                  className="top-10"
                  value={i}
                  name={this.state.idstudent_edu[i]}
                  onClick={this.updatePers}
                >
                  Update school
                </Button>
                <Button
                  className="top-10"
                  value={i}
                  name={this.state.idstudent_edu[i]}
                  onClick={this.deleteEdu}
                >
                  Delete school
                </Button>
              </Form>
            </div>
          </div>
        </div>
      );
    });

    return (
      <Container className="background top-10 padding-all education">
        <div>
          <h5>Education</h5>
          {renderer}
        </div>
        <div className="school-button">
          <Button onClick={this.addSchool}>Add new school</Button>
        </div>
        <div className={this.state.hideForm + ' edu-form'}>
          <h6 style={{ paddingTop: 10 + 'px' }}>Add new school</h6>
          <Form>
            <Form.Group controlId="formSchoolName">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter School Name"
                value={this.state.ncoll_name}
                onChange={this.ncollChange}
                name={i}
              />
            </Form.Group>
            <Form.Group controlId="formEducationLevel">
              <Form.Label>Education Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Education Level"
                value={this.state.ndegree}
                onChange={this.ndegreeChange}
                name={i}
              />
            </Form.Group>
            <Form.Group controlId="formMajor">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Major"
                value={this.state.nmajor}
                onChange={this.nmajorChange}
                name={i}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Label>Year of Passing</Form.Label>
                <Form.Control
                  placeholder="Year of Passing"
                  value={this.state.npass_year}
                  onChange={this.npassYearChange}
                  name={i}
                />
              </Col>
              <Col>
                <Form.Label>CGPA</Form.Label>
                <Form.Control
                  placeholder="CGPA"
                  value={this.state.ncurr_CGPA}
                  onChange={this.nCGPAChange}
                  name={i}
                />
              </Col>
            </Row>
            <Row className="top-10">
              <Col>
                <Form.Label>Start Month</Form.Label>
                <Form.Control
                  placeholder="Month"
                  value={this.state.nfromMth}
                  onChange={this.nfromMthChange}
                  name={i}
                />
              </Col>
              <Col>
                <Form.Label>Start Year</Form.Label>
                <Form.Control
                  placeholder="Year"
                  value={this.state.nfromYr}
                  onChange={this.nfromYrChange}
                  name={i}
                />
              </Col>
              <Col>
                <Form.Label>End Month</Form.Label>
                <Form.Control
                  placeholder="Month"
                  value={this.state.ntoMth}
                  onChange={this.ntoMthChange}
                  name={i}
                />
              </Col>
              <Col>
                <Form.Label>End Year</Form.Label>
                <Form.Control
                  placeholder="Year"
                  value={this.state.ntoYr}
                  onChange={this.ntoYrChange}
                  name={i}
                />
              </Col>
            </Row>
            <Button
              className="Top-10"
              value={i}
              name={this.state.idstudent_edu[i]}
              onClick={this.insertEdu}
            >
              Add school
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default Education;
