import React, { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";

const styles = {
  center: {
    top: "50%",
    transform: "translateY(-50%)",
  },
  body: {
    borderRadius: "5px",
  },
};

const ModalExample = (props) => {
  const [modal, setModal] = useState(!!props.success);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setModal(!!props.success);
    setTimeout(() => toggle, 4000);
  }, [props.success]);

  return (
    <Modal isOpen={modal} toggle={toggle} style={styles.center}>
      <ModalBody style={styles.body}>
        <div className="alert alert-success" role="alert">
          {props.success}
        </div>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  success: state.app.success,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);
