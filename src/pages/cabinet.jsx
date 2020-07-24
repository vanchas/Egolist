import { getMyComplaints } from "../redux/actions/userActions";
import { getCities } from "../redux/actions/appActions";
import MyComplaints from "../components/cabinet/MyComplaints";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { authenticationService } from "../_services/authentication.service";
import UpdateProfile from "../components/cabinet/UpdateProfile";
import Success from "../components/helpers/Success";
import Alert from "../components/helpers/Alert";
import Router from "next/router";
import s from "../components/cabinet/cabinet.module.scss";
import CabinetControl from "../components/cabinet/CabinetControl";
import UserInfoBlock from "../components/cabinet/UserInfoBlock";
import Verification from "../components/cabinet/Verification";

function Cabinet(props) {
  const [showPage, setShowPage] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(<Verification />);
  const [activeBtn, setActiveBtn] = useState("verification");

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token && user.user) {
      setShowPage(true);
      props.getMyComplaints(user.user.id);
    } else Router.push("/login");
  }, []);

  return (
    <div className={s.cabinet_page}>
      {showPage && (
        <>
          {props.success && <Success />}
          {props.alert && <Alert />}
          <UserInfoBlock />
          <CabinetControl
              myComplaints={props.myComplaints}
              setVisibleComponent={setVisibleComponent}
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
          />

          {visibleComponent}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  myComplaints: state.user.myComplaints,
  success: state.app.success,
  alert: state.app.alert,
});

const mapDispatchToProps = {
  getMyComplaints,
  getCities,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
