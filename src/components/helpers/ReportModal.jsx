import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import {
  addComplaint,
  getComplaintsInfo,
} from "../../redux/actions/userActions";
import s from "./report-modal.module.scss";

const styles = {
  center: {
    top: "40%",
    transform: "translateY(-50%)",
  },
  body: {
    backgroundImage: "linear-gradient(-37deg, #22262a 0%, #383b42 100%)",
  },
};

const ModalReport = (props) => {
  const [complaintText, setComplaintText] = useState(null);
  const [complaintType, setComplaintType] = useState(null);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    props.getComplaintsInfo();
    return () => {
      props.setShowToast(false);
    }
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const setNewComplaint = () => {
    if (complaintText && complaintText.trim().length && complaintType) {
      props.addComplaint(complaintText, complaintType, props.userId);
      toggle();
    } else {
      setWarning("Для отправки жалобы выберите тип и опишите проблему");
      setTimeout(() => setWarning(null), 5000);
    }
  };

  return (
    <div>
      <span className={`p-0 bg-none`} onClick={toggle}>
        Пожаловаться
      </span>
      <Modal isOpen={modal} toggle={toggle} style={styles.center}>
        <ModalBody className={s.body} style={styles.body}>
          <h5 onClick={toggle} className={s.header}>
            Заполните форму жалобы
          </h5>
          {warning && (
            <div className="alert alert-danger" role="alert">
              {warning}
            </div>
          )}
          {props.complaintsInfo &&
          props.complaintsInfo.types &&
          props.complaintsInfo.types.length ? (
            <select
              onChange={(e) => setComplaintType(e.target.value)}
              className={`form-control`}
            >
              <option value={`default`} hidden>
                Тип жалобы
              </option>
              {props.complaintsInfo.types.map((type, i) => (
                <option value={type.id} key={i}>
                  {type.value}
                </option>
              ))}
            </select>
          ) : null}
          <textarea
            className={`form-control`}
            onChange={(e) => setComplaintText(e.target.value)}
            required
          />
          <div className={s.footer}>
          <span className={`btn btn-info`} onClick={setNewComplaint}>
            Отправить
          </span>{" "}
            <span className={`btn btn-outline-secondary`} onClick={toggle}>
            Отменить
          </span>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  complaintsInfo: state.user.complaintsInfo,
});

const mapDispatchToProps = {
  addComplaint,
  getComplaintsInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalReport);
