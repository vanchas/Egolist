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
    backgroundImage: "linear-gradient(-37deg, #22262a 0%, #383b42 100%)",
    minHeight: "15em",
    display: "grid",
    alignItems: "center",
    alignContent: "center",
    gap: "2em",
    justifyItems: "center",
  },
  svg: {
    fontSize: "3em",
    color: "teal",
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
        <svg
          style={styles.svg}
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="check-circle"
          className="svg-inline--fa fa-check-circle fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
          />
        </svg>
        <div className="alert text-white text-center h5 w-100" role="alert">
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
