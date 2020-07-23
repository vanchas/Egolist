import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import s from '../components/admin/admin.module.scss';
import ComplaintsList from "../components/admin/ComplaintsList";
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";
import CategoriesEdit from "../components/admin/CategoriesEdit";
import Verification from "../components/admin/Verification";

const Admin = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [component, setComponent] = useState(<CategoriesEdit />);

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (!user || user && !user.user || user && user.user && !user.user.is_admin) {
      Router.push("/login")
    } else {
      setShowPage(true)
    }
  }, []);

  const changeComponent = (ref) => {
    switch (ref) {
      case 'categories':
        return setComponent(<CategoriesEdit />)
      case 'complaints':
        return setComponent(<ComplaintsList />)
      case 'verification':
        return setComponent(<Verification />)
    }
  }

  return (
      <div className={s.admin_page}>
        {showPage && (
            <div>
              <div className={s.admin_page_control}>
                <span className={`btn btn-secondary`}
                      onClick={() => changeComponent('categories')}>
                      Управление категориями</span>
                <span className={`btn btn-secondary`}
                      onClick={() => changeComponent('complaints')}>
                      Управление жалобами</span>
                <span className={`btn btn-secondary`}
                      onClick={() => changeComponent('verification')}>
                      Управление верификацией</span>
              </div>

              {component}
            </div>
        )}
      </div>
  );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
