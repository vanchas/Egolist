import React, {useEffect, useState} from "react";
import s from '../components/admin/admin.module.scss';
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";
import AdminControl from "../components/admin/AdminControl";
import Verification from "../components/admin/verification/Verification";

export default function Admin(props) {
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

