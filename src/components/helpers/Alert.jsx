import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'

const Alert = (props) => {
  const [modal, setModal] = useState(props.alert ? true : false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setModal(props.alert ? true : false)
    setTimeout(() => toggle, 4000);
  }, [props.alert])

  return (
      <div>
        {/* <Button color="danger" onClick={toggle}></Button> */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>
            <div className="alert alert-danger" role="alert">
              {props.alert}
            </div>
          </ModalBody>
        </Modal>
      </div>
  );
}

const mapStateToProps = state => ({
  alert: state.app.alert
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
