import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Desc from './description';
import Contact from './contact';
import axios from 'axios';
import cookie from 'react-cookies';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(
        'http://localhost:8000/getCompany?idcompany=' + cookie.load('cookie')
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            data: response.data
          });
          console.log(this.state.data[0]);
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
    var display = this.state.data.map(
      ({
        idcompany,
        company_name,
        company_location,
        company_description,
        company_type,
        noofemp,
        website,
        email,
        ownership,
        prof_pic
      }) => {
        var pic;
        if (prof_pic == '') {
          pic = '/profile.png';
        } else {
          pic =
            `http://localhost:8000/prof_pic/` +
            prof_pic.replace('prof_pic', 'file') +
            `.jpeg`;
        }
        return (
          <Container key={idcompany}>
            <Row className={'padding-bottom-15 background'}>
              <Col xl={1}>
                <img
                  src={pic}
                  alt="user pic"
                  style={{ width: 70 + 'px', marginTop: 20 + 'px' }}
                />
              </Col>
              <Col xl={11}>
                <Row className="top-10 mleft-10">
                  <h3>{company_name}</h3>
                </Row>
                <Row className="mleft-10">
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">{company_location}</h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">{noofemp} Employees</h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">{company_type}</h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">{ownership}</h6>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="top-10">
              <Col xl={8} style={{ paddingLeft: 0 + 'px' }}>
                <Desc des={company_description} />
              </Col>
              <Col xl={4} style={{ paddingRight: 0 + 'px' }}>
                <Contact
                  email={email}
                  website={website}
                  data={this.state.data}
                  getInfo={this.getInfo}
                />
              </Col>
            </Row>
          </Container>
        );
      }
    );
    return <div>{display}</div>;
  }
}

export default Primary;
