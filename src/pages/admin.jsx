import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import s from '../components/admin/admin.module.scss';
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";
import AdminControl from "../components/admin/AdminControl";
import Verification from "../components/admin/verification/Verification";

const Admin = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [component, setComponent] = useState(<Verification />);

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (!user || user && !user.user || user && user.user && !user.user.is_admin) {
      Router.push("/login")
    } else {
      setShowPage(true)
    }
  }, []);


  return (
      <div className={s.admin_page}>
        {showPage && (
            <>
              <AdminControl
                setComponent={setComponent}
              />

              {component}
            </>
        )}
      </div>
  );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
