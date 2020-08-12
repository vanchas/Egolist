import React from "react";
import s from "./layout.module.scss";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import MobSidebar from "../sidebar/MobSidebar";
import { connect } from "react-redux";
import { showSidebar } from "../../redux/actions/appActions";
import Success from "../helpers/Success";
import Alert from "../helpers/Alert";

const Layout = (props) => {
  return (
    <div className={`layout ${s.layout}`}>
      {props.success && <Success />}
      {props.alert && <Alert />}

      <span
        className={s.sidebar_toggler}
        onClick={() => props.showSidebar(!props.sidebar)}
      >
        &gt;&gt;&gt;
      </span>

      <div className={s.sidebar_holder}>
        {props.sidebar && <MobSidebar showSidebar={props.showSidebar} />}
        <Sidebar />
      </div>

      <Header />

      <main>{props.children}</main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sidebar: state.app.sidebar,
  success: state.app.success,
  alert: state.app.alert,
});
const mapDispatchToProps = {
  showSidebar,
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
