import { getMyComplaints } from "../redux/actions/userActions";
import { getCities } from "../redux/actions/appActions";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { authenticationService } from "../_services/authentication.service";
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
});

const mapDispatchToProps = {
  getMyComplaints,
  getCities,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
