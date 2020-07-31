import React, { useEffect, useState } from "react";
import { updateComplaint } from "../../../redux/actions/adminActions";
import { getComplaintsInfo } from "../../../redux/actions/userActions";
import { connect } from "react-redux";

function UpdateComplaintForm(props) {
  const [complaintStatus, setComplaintStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.getComplaintsInfo();
  }, []);

  const updateComplaint = (e) => {
    e.preventDefault();
    setLoading(true);
    props.updateComplaint(
      props.complaint.id,
      complaintStatus ? parseInt(complaintStatus) : props.complaint.status_id
    );
    setTimeout(() => setLoading(false), 3000)
  };

  return (
    <form onSubmit={updateComplaint}>
      <span className={`h6`}>Редактировать жалобу</span>
      <div className={`d-flex`}>
        {props.complaintsInfo &&
        props.complaintsInfo.statuses &&
        props.complaintsInfo.statuses.length ? (
          <select
            onChange={(e) => setComplaintStatus(e.target.value)}
            className={`form-control mr-2`}
          >
            {props.complaintsInfo.statuses.map((type, i) => {
              if (type.id === props.complaint.status_id) {
                return (
                  <option value={type.id} key={i} hidden>
                    {type.value}
                  </option>
                );
              }
            })}
            {props.complaintsInfo.statuses.map((type, i) => (
              <option value={type.id} key={i}>
                {type.value}
              </option>
            ))}
          </select>
        ) : (
          <span className={`d-block`}>загрузка...</span>
        )}
        <div className={`text-center`}>
          {!loading ? (
            <button type={`submit`} className={`btn btn-success`}>
              Сохранить
            </button>
          ) : (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  complaintsInfo: state.user.complaintsInfo,
});
const mapDispatchToProps = {
  getComplaintsInfo,
  updateComplaint,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateComplaintForm);
