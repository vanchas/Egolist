import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

const ModalExample = (props) => {
  const [modal, setModal] = useState(props.success ? true : false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setModal(props.success ? true : false)
    setTimeout(() => toggle, 4000);
  }, [props.success])

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}></Button> */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <div className="alert alert-success" role="alert">
            {props.success}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  success: state.app.success
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);