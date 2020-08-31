import React, { useEffect, useState } from "react";
import s from "./mob-sidebar.module.scss";
import SidebarMessages from "./SidebarMessages";
import SidebarSettings from "./SidebarSettings";
import SidebarStatistics from "./SidebarStatistics";
import SidebarUserProfile from "./SidebarUserProfile";
import UserBar from "./UserBar";
import { authenticationService } from "../../_services/authentication.service";
import Link from "next/link";
import SidebarControl from "./SidebarControl";
import { showSidebar } from "../../redux/actions/appActions";
import { connect } from "react-redux";
import Logo from "../../assets/header/main-logo.png";
import ReportProblem from "../cabinet/ReportProblem";

function MobSidebar(props) {
  const [component, setComponent] = useState();
  const [activeLink, setActiveLink] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData && userData.user) setUser(userData.user);
  }, []);

  const changeComponent = (ref) => {
    setActiveLink(ref);
    if (ref === "profile") {
      setComponent(<SidebarUserProfile showSidebar={props.showSidebar} />);
    } else if (ref === "messages") {
      setComponent(<SidebarMessages />);
    } else if (ref === "statistics") {
      setComponent(<SidebarStatistics />);
    } else if (ref === "settings") {
      setComponent(<SidebarSettings />);
    }
  };

  return (
    <aside className={s.sidebar}>
      <div className={s.sidebar_logo}>
        <span
          className={s.switch_sidebar}
          onClick={() => props.showSidebar(false)}
        >
          <i className="fas fa-times" />
        </span>
        <Link href={`/`}>
          <a>
            <img src={Logo} alt={`EGOLIST`} />
          </a>
        </Link>
      </div>
      {user ? (
        <>
          <span className={s.report_btn}>
            <ReportProblem position={`right`} />
          </span>
          <UserBar />
          <SidebarControl changeComponent={changeComponent} />

          <div className={s.sidebar_component}>{component}</div>
        </>
      ) : (
        <span>
          <Link href={`/login`}>
            <a className={`btn btn-primary m-2 mr-auto`}>Вход</a>
          </Link>
        </span>
      )}
    </aside>
  );
}

const mapStateToProps = (state) => ({
  sidebar: state.app.sidebar,
});
const mapDispatchToProps = {
  showSidebar,
};
export default connect(mapStateToProps, mapDispatchToProps)(MobSidebar);
