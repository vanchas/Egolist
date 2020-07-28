import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux'

const styles = {
    center: {
        top: '50%',
        transform: 'translateY(-50%)'
    },
    body: {
        borderRadius: '5px'
    }
}

const Alert = (props) => {
  const [modal, setModal] = useState(props.alert ? true : false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setModal(props.alert ? true : false)
    setTimeout(() => toggle, 4000);
  }, [props.alert])

  return (
      <div>
        <Modal
            isOpen={modal}
            toggle={toggle}
            style={styles.center}
        >
          <ModalBody style={styles.body} >
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
