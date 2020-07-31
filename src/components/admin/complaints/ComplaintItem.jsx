import React from "react";
import UpdateComplaint from "./UpdateComplaint";
import { connect } from "react-redux";
import { deleteComplaint } from "../../../redux/actions/adminActions";

function ComplaintsItem(props) {
  return (
    <li className={`shadow px-2 py-3 list-item mb-3`}>
      <div className={`d-flex justify-content-between`}>
        <span className={`h5`}>{props.complaint.complaint}</span>
        <button
          className={`btn btn-danger`}
          onClick={() => props.deleteComplaint(props.complaint.id)}
        >
          X
        </button>
      </div>
      <div className={`small text-muted`}>Создано:
        &nbsp;
        {new Date(props.complaint.created_at).getDate()}.
        {new Date(props.complaint.created_at).getMonth()+1}.
        {new Date(props.complaint.created_at).getFullYear()}
        &nbsp;
        {new Date(props.complaint.created_at).getHours()}:
        {new Date(props.complaint.created_at).getMinutes()};
        Обновлено:
        &nbsp;
        {new Date(props.complaint.updated_at).getDate()}.
        {new Date(props.complaint.updated_at).getMonth()+1}.
        {new Date(props.complaint.updated_at).getFullYear()}
        &nbsp;
        {new Date(props.complaint.updated_at).getHours()}:
        {new Date(props.complaint.updated_at).getMinutes()};
      </div>
      <UpdateComplaint
        complaint={props.complaint}
      />
    </li>
  );
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  deleteComplaint
}
export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsItem)
