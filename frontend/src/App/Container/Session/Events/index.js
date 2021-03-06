import React from 'react';
import { Container } from 'react-bootstrap';

import Filter from './filter';
import JobCont from './events_cont';

class JobList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Filter />
        <JobCont />
      </Container>
    );
  }
}

export default JobList;
