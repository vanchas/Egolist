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
import MyComplaints from "../components/cabinet/MyComplaints";
import UpdateProfile from "../components/cabinet/UpdateProfile";

function Cabinet(props) {
  const [showPage, setShowPage] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(null);
  const [activeBtn, setActiveBtn] = useState("verification");

  useEffect(() => {
    setVisibleComponent(<Verification changeVisibleComponent={changeVisibleComponent} />)
    const user = authenticationService.currentUserValue;
    if (user.token && user.user) {
      setShowPage(true);
      props.getMyComplaints(user.user.id);
    } else Router.push("/login");
  }, []);

  const changeVisibleComponent = (ref) => {
    if (ref === "complaints") {
      setActiveBtn("complaints");
      setVisibleComponent(<MyComplaints myComplaints={props.myComplaints} />);
    } else if (ref === "update info") {
      setActiveBtn("update info");
      setVisibleComponent(<UpdateProfile />);
    } else if (ref === "verification") {
      setActiveBtn("verification");
      setVisibleComponent(<Verification changeVisibleComponent={changeVisibleComponent} />);
    }
  };

  return (
    <div className={s.cabinet_page}>
      {showPage && (
        <>
          <UserInfoBlock />
          <CabinetControl
              myComplaints={props.myComplaints}
              changeVisibleComponent={changeVisibleComponent}
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
