import React, { useEffect, useState } from "react";
import s from "./verification.module.scss";
import VerificationRequestItem from "./VerificationRequestItem";
import VerifyExamplePhotos from "./VerifyExamplePhotos";
import { connect } from "react-redux";

function VerificationList(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.users && props.users.length) {
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 5000);
  }, [props.users]);

  return (
    <div className={s.verification_block}>
      <VerifyExamplePhotos />
      <div className={`h3 py-3 ${s.heading}`}>Заявки на верификацию</div>
      {props.users && props.users.length ? (
        <ul className={s.users_list}>
          {props.users.map((user, ind) => (
            <VerificationRequestItem key={ind} user={user} />
          ))}
        </ul>
      ) : loading ? (
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>Активных заявок на верификацию нет</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.admin.usersWhoSentFileForVerification,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(VerificationList);
