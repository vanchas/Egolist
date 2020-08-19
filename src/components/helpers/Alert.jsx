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
    color: "#dc3545",
  },
};

const Alert = (props) => {
  const [modal, setModal] = useState(!!props.alert);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setModal(!!props.alert);
    setTimeout(() => toggle, 4000);
  }, [props.alert]);

  return (
    <Modal isOpen={modal} toggle={toggle} style={styles.center}>
      <ModalBody style={styles.body}>
        <svg
          style={styles.svg}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="exclamation-triangle"
          className="svg-inline--fa fa-exclamation-triangle fa-w-18"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
          />
        </svg>
        <div className="aalert text-white text-center h5 w-100" role="alert">
          {props.alert}
        </div>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
