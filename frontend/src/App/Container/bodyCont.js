import React from 'react';
import Signin from './NoSession/Students/signinformstud';
import SigninC from './NoSession/Companies/signinformcomp';
import Signup from './NoSession/Students/signupformstud';
import SignupC from './NoSession/Companies/signupformcomp';
import Topnav from '../Navbar/topnav';
import Profile from './Session/Students/Profile/profile';
import Jobs from './Session/Jobs';
import Students from './Session/AllStudents/container';
import Stud_Prof from './Session/AllStudents/Profile/profile';
import Company_Prof from './Session/Companies/Profile/container';
import MyApp from './Session/Students/Jobs';
import Events from './Session/Events';
import MyEvents from './Session/Students/Events';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import cookie from 'react-cookies';

class bodyCont extends React.Component {
  render() {
    var jobs;
    var prof;
    if (this.props.getType == 'Student') {
      jobs = <Jobs />;
      prof = <Profile />;
    } else {
      jobs = <Jobs />;
      prof = <Company_Prof />;
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: 100 + '%'
        }}
      >
        <Route path="/" component={Topnav} />
        <div className="custom-body">
          <div className="container">
            <Route path="/login" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/companylogin" component={SigninC} />
            <Route path="/companysignup" component={SignupC} />
            <Route path="/home">{jobs}</Route>
            <Route path="/stud_prof">{prof}</Route>
            <Route path="/student_prof/:id" component={Stud_Prof} />
            <Route path="/all_students">
              <Students />
            </Route>
            <Route path="/events" component={Events} />
            <Route path="/myapp" component={MyApp} />
            <Route path="/myevents" component={MyEvents} />
          </div>
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

export default connect(mapStateToProps)(bodyCont);
