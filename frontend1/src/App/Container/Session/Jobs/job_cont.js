/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import NewJob from './edit_det';

import Job from './job';
import JobDes from './job_des';

class JobCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeJob: '',
      activeComp: '',
      setShow: false,
      i: 0
    };
  }

  handleJob = (job_id, comp_id) => {
    this.setState({
      activeJob: job_id,
      activeComp: comp_id
    });
  };

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(
        'http://ec2-3-135-239-183.us-east-2.compute.amazonaws.com:8000/getAllJobs'
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            data: response.data
          });
          console.log(this.state.data);
          this.setState({
            activeJob: this.state.data[0].idjob,
            activeComp: this.state.data[0].idcompany
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

  componentDidUpdate(prevProps) {
    if (this.props.getJobFilterPartFull !== prevProps.getJobFilterPartFull)
      this.setState({ activeJob: '' });
  }

  render() {
    var add = '';
    if (this.props.getType == 'Company') {
      add = (
        <Button
          style={{
            float: 'right',
            borderRadius: 100 + '%',
            right: 40,
            bottom: 30,
            position: 'fixed',
            width: 60 + 'px',
            height: 60 + 'px',
            fontSize: 20 + 'px'
          }}
          onClick={this.handleShow}
        >
          +
        </Button>
      );
    }
    var printJobs = this.state.data.map(
      ({
        idjob,
        job_title,
        deadline,
        location,
        salary,
        job_des,
        job_cat,
        paid,
        company_name,
        email,
        idcompany
      }) => {
        let showJob;
        switch (this.props.getJobFilterPartFull) {
          case 'PartTime':
            if (paid == 'PartTime') showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'FullTime':
            if (paid == 'FullTime') showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'OnCampus':
            if (job_cat == 'OnCampus') showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'Internship':
            if (job_cat == 'Internship') showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'MyJobs':
            if (idcompany == cookie.load('cookie')) showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'None':
            showJob = 'ShowForm';
            break;
          default:
            showJob = 'ShowForm';
            break;
        }
        let regexJob = new RegExp(this.props.getJobFilter, 'gi');
        if (job_title.match(regexJob) == null) showJob = 'HideForm';
        let regexCity = new RegExp(this.props.getCityFilter, 'gi');
        if (location.match(regexCity) == null) showJob = 'HideForm';
        return (
          <a
            indexkey={idjob}
            onClick={() => this.handleJob(idjob, idcompany)}
            className="jobCont"
            key={idjob}
            href={'#'}
          >
            <Job
              data-key={idjob}
              job_title={job_title}
              deadline={deadline}
              location={location}
              salary={salary}
              job_des={job_des}
              job_cat={job_cat}
              paid={paid}
              company_name={company_name}
              email={email}
              show={showJob}
            />
          </a>
        );
      }
    );
    return (
      <Row className="background top-10">
        <Col xl={4} style={{ overflowY: 'scroll', height: 70 + 'vh' }}>
          <Row>
            <Container className="job-listing">
              <h6>Job Listing</h6>
            </Container>
          </Row>
          {printJobs}
        </Col>
        <Col xl={8} style={{ overflowY: 'scroll', height: 70 + 'vh' }}>
          <JobDes
            idjob={this.state.activeJob}
            idcompany={this.state.activeComp}
          />
        </Col>
        {add}
        <NewJob
          show={this.state.setShow}
          handleClose={this.handleClose}
          getInfo={this.getInfo}
        />
      </Row>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getJobFilterPartFull: state.getJobFilterPartFull,
    getJobFilter: state.getJobFilter,
    getCityFilter: state.getCityFilter,
    getType: state.getType
  };
};

export default connect(mapStateToProps)(JobCont);
