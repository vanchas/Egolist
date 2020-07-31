import React, { useState } from "react";
import s from "./admin.module.scss";
import CategoriesEdit from "./CategoriesEdit";
import ComplaintsList from "./complaints/ComplaintsList";
import Verification from "./verification/Verification";
import UsersList from "./users-list/UsersList";
import { connect } from "react-redux";

function AdminControl(props) {
  const changeComponent = (ref) => {
    switch (ref) {
      case "categories":
        return props.setComponent(<CategoriesEdit />);
      case "complaints":
        return props.setComponent(<ComplaintsList />);
      case "verification":
        return props.setComponent(<Verification />);
      case "users list":
        return props.setComponent(<UsersList />);
    }
  };

  return (
    <div className={s.admin_page_control}>
      <span
        className={`btn btn-secondary`}
        onClick={() => changeComponent("categories")}
      >
        Управление категориями
      </span>
      <span
        className={`btn btn-secondary`}
        onClick={() => changeComponent("complaints")}
      >
        Управление жалобами
        {props.complaints && props.complaints.length > 0 ? (
          <small className={`text-warning mx-1`}>{props.complaints.length}</small>
        ) : null}
      </span>
      <span
        className={`btn btn-secondary`}
        onClick={() => changeComponent("verification")}
      >
        Управление верификацией
        {props.verificationRequests && props.verificationRequests.length > 0 ? (
          <small className={`text-warning mx-1`}>{props.verificationRequests.length}</small>
        ) : null}
      </span>
      <span
        className={`btn btn-secondary`}
        onClick={() => changeComponent("users list")}
      >
        Список всех пользователей
        {props.users && props.users.length > 0 ? (
          <small className={`text-warning mx-1`}>{props.users.length}</small>
        ) : null}
      </span>
    </div>
  );
}

const mapStateToProps = (state) => ({
  complaints: state.admin.allComplaints,
  verificationRequests: state.admin.usersWhoSentFileForVerification,
  users: state.admin.allUsers
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AdminControl);
