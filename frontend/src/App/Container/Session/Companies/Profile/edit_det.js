import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setShow: false, tprof_pic: '', data: [] };
  }

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidMount() {
    this.setState({
      setShow: this.props.show,
      data: this.props.data
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
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Company Name" />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter Location" />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Company Type</Form.Label>
              <Form.Control type="text" placeholder="Enter Type" />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>No of Employees </Form.Label>
              <Form.Control type="text" placeholder="Enter Employee Count" />
            </Form.Group>
            <Form.Group controlId="formOwnership">
              <Form.Label>Ownership Type </Form.Label>
              <Form.Control type="text" placeholder="Enter Ownership Type" />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control type="text" placeholder="Enter Website" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="resume"
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.applyJob}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default edit;
