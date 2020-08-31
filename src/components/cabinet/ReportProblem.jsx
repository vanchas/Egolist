import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import s from "./verify.module.scss";

const styles = {
  center: {
    top: "40%",
    transform: "translateY(-50%)",
  },
  form: {
    borderRadius: "5px",
    backgroundImage: "linear-gradient(-37deg, #22262a 0%, #383b42 100%)",
    minHeight: "15em",
    display: "grid",
    alignItems: "center",
    alignContent: "center",
    gap: "1em",
    padding: "0 1em",
  },
  textarea: {
    background: "linear-gradient(-37deg, #22262a 0%, #383b42 100%)",
    color: "#fff",
  },
};

const ReportProblem = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    //
  };

  return (
    <>
      <span className={s.report} onClick={toggle}>
        <i className="fas fa-exclamation" />
        <span className="tooltiptext">Сообщить об ошибке</span>
      </span>

      <Modal isOpen={modal} toggle={toggle} style={styles.center}>
        <form style={styles.form} onSubmit={submitHandler}>
          <label className={`text-white`}>
            <span className={`d-flex justify-content-between`}>
              Опишите суть проблемы
              <span onClick={toggle}>
                <i className="fas fa-times text-secondary h5" />
              </span>
            </span>
            <textarea
              className={`form-control mt-2`}
              required
              style={styles.textarea}
            />
          </label>
          <div>
            <button type={`submit`} className={`btn btn-outline-light`}>
              Отправить
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblem);
