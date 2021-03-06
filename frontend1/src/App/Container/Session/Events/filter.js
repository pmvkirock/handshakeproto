import React from 'react';
import {
  Row,
  Form,
  Col,
  Container,
  Button,
  ButtonToolbar
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  Logout,
  updateEventsFilter,
  updateCityFilter,
  getMyJobs
} from '../../../../actions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobs: true,
      PartTime: false,
      FullTime: false,
      Internship: false,
      OnCampus: false,
      MyJobs: false
    };
  }

  jobChange = e => {
    this.props.dispatch(updateEventsFilter(e.target.value));
  };

  cityChange = e => {
    this.props.dispatch(updateCityFilter(e.target.value));
  };

  deactivateActive = () => {
    this.setState({
      allJobs: false,
      PartTime: false,
      FullTime: false,
      Internship: false,
      OnCampus: false,
      MyJobs: false
    });
  };

  render() {
    var myJobs = '';
    if (this.props.getType == 'Company') {
      myJobs = (
        <Button
          className="mleft-10"
          variant="outline-primary"
          onClick={() => {
            this.props.dispatch(getMyJobs());
            this.deactivateActive();
            this.setState({
              MyJobs: true
            });
          }}
          active={this.state.MyJobs}
        >
          My Events
        </Button>
      );
    }
    return (
      <Row>
        <Container className="background top-10 padding-all">
          <Form>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Search for Events"
                  onChange={this.jobChange}
                />
              </Col>
              <Col>
                <Form.Control placeholder="City" onChange={this.cityChange} />
              </Col>
            </Row>
            <Row className="top-10">
              <Col>
                <ButtonToolbar>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(Logout());
                      this.deactivateActive();
                      this.setState({
                        allJobs: true
                      });
                    }}
                    active={this.state.allJobs}
                  >
                    All Events
                  </Button>
                  {myJobs}
                </ButtonToolbar>
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getJobFilterPartFull: state.getJobFilterPartFull,
    updateEventsFilter: state.updateEventsFilter,
    getType: state.getType
  };
};

export default connect(mapStateToProps)(Filter);
